/**
 * Durable newsletter subscriber store (MySQL on Hostinger).
 * Falls back to local JSON only in development when DATABASE_URL is absent.
 */

import { promises as fs } from "fs";
import path from "path";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getDbPool, hasDatabaseConfig } from "@/lib/db";
import type { NewsletterSignup } from "@/types";

export interface NewsletterUpsertResult {
  signup: NewsletterSignup;
  created: boolean;
  storage: "mysql" | "file";
}

interface SubscriberRow extends RowDataPacket {
  id: string;
  email: string;
  source: string;
  created_at: Date | string;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  if (email.length > 200) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

let schemaReady: Promise<void> | null = null;

async function ensureMysqlSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const pool = getDbPool();
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id VARCHAR(64) NOT NULL,
          email VARCHAR(255) NOT NULL,
          email_normalized VARCHAR(255) NOT NULL,
          source VARCHAR(255) NOT NULL DEFAULT 'unknown',
          created_at DATETIME(3) NOT NULL,
          updated_at DATETIME(3) NOT NULL,
          PRIMARY KEY (id),
          UNIQUE KEY uq_newsletter_email_normalized (email_normalized)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

function toIso(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

async function upsertMysql(
  emailRaw: string,
  source: string
): Promise<NewsletterUpsertResult> {
  await ensureMysqlSchema();
  const pool = getDbPool();
  const email = emailRaw.trim();
  const normalized = normalizeEmail(email);
  const sourceSafe = (source || "unknown").trim().slice(0, 255) || "unknown";
  const now = new Date();
  const id = generateId();

  const [existingRows] = await pool.execute<SubscriberRow[]>(
    `SELECT id, email, source, created_at
     FROM newsletter_subscribers
     WHERE email_normalized = ?
     LIMIT 1`,
    [normalized]
  );

  const existing = existingRows[0];

  if (existing) {
    await pool.execute(
      `UPDATE newsletter_subscribers
       SET source = ?, updated_at = ?
       WHERE email_normalized = ?`,
      [sourceSafe, now, normalized]
    );
    return {
      created: false,
      storage: "mysql",
      signup: {
        id: existing.id,
        email: existing.email,
        source: sourceSafe,
        createdAt: toIso(existing.created_at),
      },
    };
  }

  await pool.execute(
    `INSERT INTO newsletter_subscribers
      (id, email, email_normalized, source, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, email, normalized, sourceSafe, now, now]
  );

  return {
    created: true,
    storage: "mysql",
    signup: {
      id,
      email,
      source: sourceSafe,
      createdAt: now.toISOString(),
    },
  };
}

const DATA_DIR = path.join(process.cwd(), "data");
const FILE_NAME = "newsletter.json";

async function readFileStore(): Promise<NewsletterSignup[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, FILE_NAME), "utf-8");
    const parsed = JSON.parse(raw) as NewsletterSignup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(rows: NewsletterSignup[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(
    path.join(DATA_DIR, FILE_NAME),
    JSON.stringify(rows, null, 2),
    "utf-8"
  );
}

async function upsertFile(
  emailRaw: string,
  source: string
): Promise<NewsletterUpsertResult> {
  const email = emailRaw.trim();
  const normalized = normalizeEmail(email);
  const sourceSafe = (source || "unknown").trim().slice(0, 255) || "unknown";
  const rows = await readFileStore();
  const existing = rows.find((r) => normalizeEmail(r.email) === normalized);
  if (existing) {
    existing.source = sourceSafe;
    await writeFileStore(rows);
    return { created: false, storage: "file", signup: existing };
  }
  const signup: NewsletterSignup = {
    id: generateId(),
    email,
    source: sourceSafe,
    createdAt: new Date().toISOString(),
  };
  rows.push(signup);
  await writeFileStore(rows);
  return { created: true, storage: "file", signup };
}

/**
 * Idempotent upsert. Production requires MySQL (DATABASE_URL / DB_*).
 * Local/dev may use file storage when DB is not configured.
 */
export async function upsertNewsletterSignup(
  email: string,
  source: string
): Promise<NewsletterUpsertResult> {
  if (hasDatabaseConfig()) {
    return upsertMysql(email, source);
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "Durable newsletter storage is not configured (missing DATABASE_URL/DB_*)"
    );
  }
  return upsertFile(email, source);
}

export async function listNewsletterSignups(): Promise<NewsletterSignup[]> {
  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [rows] = await pool.execute<SubscriberRow[]>(
      `SELECT id, email, source, created_at
       FROM newsletter_subscribers
       ORDER BY created_at ASC`
    );
    return rows.map((r) => ({
      id: r.id,
      email: r.email,
      source: r.source,
      createdAt: toIso(r.created_at),
    }));
  }
  return readFileStore();
}

export async function countNewsletterSignups(): Promise<number> {
  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [rows] = await pool.execute<(RowDataPacket & { c: number })[]>(
      `SELECT COUNT(*) AS c FROM newsletter_subscribers`
    );
    return Number(rows[0]?.c ?? 0);
  }
  return (await readFileStore()).length;
}

export async function deleteNewsletterSignupByEmail(
  email: string
): Promise<boolean> {
  const normalized = normalizeEmail(email);
  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [result] = await pool.execute<ResultSetHeader>(
      `DELETE FROM newsletter_subscribers WHERE email_normalized = ?`,
      [normalized]
    );
    return result.affectedRows > 0;
  }
  const rows = await readFileStore();
  const next = rows.filter((r) => normalizeEmail(r.email) !== normalized);
  if (next.length === rows.length) return false;
  await writeFileStore(next);
  return true;
}
