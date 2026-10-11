/**
 * Minimal SMTP client for Hostinger / generic submission (ports 465 or 587).
 * No third-party mail dependency.
 */

import net from "net";
import tls from "tls";

export type SmtpSendInput = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

function extractEmail(addr: string): string {
  const m = addr.match(/<([^>]+)>/);
  return (m ? m[1] : addr).trim();
}

function encodeSubject(subject: string): string {
  if (/^[\x20-\x7E]*$/.test(subject)) return subject;
  return `=?UTF-8?B?${Buffer.from(subject, "utf8").toString("base64")}?=`;
}

function buildMime(input: SmtpSendInput): string {
  const boundary = `bc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const fromEmail = extractEmail(input.from);
  const lines = [
    `From: ${input.from}`,
    `To: ${input.to}`,
    input.replyTo ? `Reply-To: ${input.replyTo}` : null,
    `Subject: ${encodeSubject(input.subject)}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/plain; charset=utf-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    input.text,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=utf-8`,
    `Content-Transfer-Encoding: 8bit`,
    ``,
    input.html,
    ``,
    `--${boundary}--`,
    ``,
  ].filter((l): l is string => l !== null);
  // Ensure SMTP DATA uses CRLF and dot-stuffing
  return lines
    .join("\r\n")
    .replace(/^\./gm, "..")
    .replace(/\r?\n/g, "\r\n");
}

class SmtpSession {
  private buf = "";
  private socket: net.Socket | tls.TLSSocket;
  private closed = false;

  constructor(socket: net.Socket | tls.TLSSocket) {
    this.socket = socket;
    this.socket.setEncoding("utf8");
    this.socket.on("data", (chunk: string) => {
      this.buf += chunk;
    });
    this.socket.on("close", () => {
      this.closed = true;
    });
  }

  private readLine(): Promise<string> {
    return new Promise((resolve, reject) => {
      const started = Date.now();
      const tick = () => {
        if (this.closed) {
          reject(new Error("SMTP connection closed"));
          return;
        }
        const idx = this.buf.indexOf("\n");
        if (idx >= 0) {
          const line = this.buf.slice(0, idx + 1).replace(/\r?\n$/, "");
          this.buf = this.buf.slice(idx + 1);
          resolve(line);
          return;
        }
        if (Date.now() - started > 15_000) {
          reject(new Error("SMTP read timeout"));
          return;
        }
        setTimeout(tick, 20);
      };
      tick();
    });
  }

  async expect(code: number): Promise<string> {
    let last = "";
    // Multi-line replies: "250-..." then "250 ..."
    for (;;) {
      const line = await this.readLine();
      last = line;
      const m = line.match(/^(\d{3})([ -])/);
      if (!m) continue;
      const c = Number(m[1]);
      const cont = m[2] === "-";
      if (!cont) {
        if (c !== code) throw new Error(`SMTP expected ${code}, got: ${line}`);
        return last;
      }
    }
  }

  write(cmd: string) {
    this.socket.write(`${cmd}\r\n`);
  }

  writeData(data: string) {
    this.socket.write(data);
    if (!data.endsWith("\r\n")) this.socket.write("\r\n");
    this.socket.write(".\r\n");
  }

  end() {
    try {
      this.socket.end();
    } catch {
      /* ignore */
    }
  }
}

function connectTls(host: string, port: number): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host, port, servername: host, rejectUnauthorized: true },
      () => resolve(socket)
    );
    socket.setTimeout(15_000);
    socket.once("error", reject);
    socket.once("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP TLS timeout"));
    });
  });
}

function connectPlain(host: string, port: number): Promise<net.Socket> {
  return new Promise((resolve, reject) => {
    const socket = net.connect({ host, port }, () => resolve(socket));
    socket.setTimeout(15_000);
    socket.once("error", reject);
    socket.once("timeout", () => {
      socket.destroy();
      reject(new Error("SMTP connect timeout"));
    });
  });
}

function upgradeToTls(socket: net.Socket, host: string): Promise<tls.TLSSocket> {
  return new Promise((resolve, reject) => {
    const secure = tls.connect(
      { socket, servername: host, rejectUnauthorized: true },
      () => resolve(secure)
    );
    secure.once("error", reject);
  });
}

export async function sendSmtpMail(
  input: SmtpSendInput
): Promise<{ ok: true; messageId: string } | { ok: false; error: string }> {
  const fromEmail = extractEmail(input.from);
  const messageId = `<bc-${Date.now()}-${Math.random().toString(36).slice(2, 10)}@boatingchicago.com>`;
  let session: SmtpSession | null = null;

  try {
    if (input.port === 465) {
      const sock = await connectTls(input.host, input.port);
      session = new SmtpSession(sock);
    } else {
      const plain = await connectPlain(input.host, input.port);
      const boot = new SmtpSession(plain);
      await boot.expect(220);
      boot.write(`EHLO boatingchicago.com`);
      // Drain EHLO multi-line
      await boot.expect(250);
      boot.write("STARTTLS");
      await boot.expect(220);
      const secure = await upgradeToTls(plain, input.host);
      session = new SmtpSession(secure);
    }

    if (input.port === 465) {
      await session.expect(220);
    }

    session.write("EHLO boatingchicago.com");
    await session.expect(250);

    session.write("AUTH LOGIN");
    await session.expect(334);
    session.write(Buffer.from(input.user, "utf8").toString("base64"));
    await session.expect(334);
    session.write(Buffer.from(input.pass, "utf8").toString("base64"));
    await session.expect(235);

    session.write(`MAIL FROM:<${fromEmail}>`);
    await session.expect(250);
    session.write(`RCPT TO:<${extractEmail(input.to)}>`);
    await session.expect(250);
    session.write("DATA");
    await session.expect(354);

    const mime = buildMime(input);
    // Prepend Message-ID
    const withId = `Message-ID: ${messageId}\r\n${mime}`;
    session.writeData(withId);
    await session.expect(250);

    session.write("QUIT");
    try {
      await session.expect(221);
    } catch {
      /* some servers drop after QUIT */
    }
    session.end();
    return { ok: true, messageId };
  } catch (err) {
    session?.end();
    return {
      ok: false,
      error: err instanceof Error ? err.message : "SMTP failed",
    };
  }
}
