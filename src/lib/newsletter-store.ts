/**
 * Durable newsletter subscriber store (MySQL on Hostinger).
 * Falls back to local JSON only in development when DATABASE_URL is absent.
 */

import { promises as fs } from "fs";
import path from "path";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { getDbPool, hasDatabaseConfig } from "@/lib/db";
import type { NewsletterSignup } from "@/types";

export type SendfableSyncStatus = "pending" | "synced" | "failed" | "skipped";
export type SubscriberStatus = "subscribed" | "unsubscribed";

export interface NewsletterUpsertResult {
  signup: NewsletterSignup;
  created: boolean;
  storage: "mysql" | "file";
}

export interface NewsletterSubscriberRecord extends NewsletterSignup {
  status: SubscriberStatus;
  sendfableSyncStatus: SendfableSyncStatus;
  sendfableSyncedAt: string | null;
  sendfableContactId: string | null;
  sendfableLastError: string | null;
  unsubscribedAt: string | null;
  updatedAt: string;
}

interface SubscriberRow extends RowDataPacket {
  id: string;
  email: string;
  source: string;
  created_at: Date | string;
  updated_at?: Date | string;
  status?: string;
  sendfable_sync_status?: string;
  sendfable_synced_at?: Date | string | null;
  sendfable_contact_id?: string | null;
  sendfable_last_error?: string | null;
  unsubscribed_at?: Date | string | null;
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

      // Idempotent column migrations for SendFable sync + local status
      const alters = [
        `ALTER TABLE newsletter_subscribers ADD COLUMN status VARCHAR(32) NOT NULL DEFAULT 'subscribed'`,
        `ALTER TABLE newsletter_subscribers ADD COLUMN sendfable_sync_status VARCHAR(32) NOT NULL DEFAULT 'pending'`,
        `ALTER TABLE newsletter_subscribers ADD COLUMN sendfable_synced_at DATETIME(3) NULL`,
        `ALTER TABLE newsletter_subscribers ADD COLUMN sendfable_contact_id VARCHAR(64) NULL`,
        `ALTER TABLE newsletter_subscribers ADD COLUMN sendfable_last_error VARCHAR(500) NULL`,
        `ALTER TABLE newsletter_subscribers ADD COLUMN unsubscribed_at DATETIME(3) NULL`,
      ];
      for (const sql of alters) {
        try {
          await pool.execute(sql);
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          if (!/Duplicate column/i.test(msg)) throw err;
        }
      }
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

function toIso(value: Date | string | null | undefined): string | null {
  if (value == null) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function rowToRecord(r: SubscriberRow): NewsletterSubscriberRecord {
  return {
    id: r.id,
    email: r.email,
    source: r.source,
    createdAt: toIso(r.created_at) || new Date().toISOString(),
    updatedAt: toIso(r.updated_at) || toIso(r.created_at) || new Date().toISOString(),
    status: (r.status === "unsubscribed" ? "unsubscribed" : "subscribed") as SubscriberStatus,
    sendfableSyncStatus: (r.sendfable_sync_status || "pending") as SendfableSyncStatus,
    sendfableSyncedAt: toIso(r.sendfable_synced_at),
    sendfableContactId: r.sendfable_contact_id || null,
    sendfableLastError: r.sendfable_last_error || null,
    unsubscribedAt: toIso(r.unsubscribed_at),
  };
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
    `SELECT id, email, source, created_at, updated_at, status,
            sendfable_sync_status, sendfable_synced_at, sendfable_contact_id,
            sendfable_last_error, unsubscribed_at
     FROM newsletter_subscribers
     WHERE email_normalized = ?
     LIMIT 1`,
    [normalized]
  );

  const existing = existingRows[0];

  if (existing) {
    // Resubscribe locally if they were unsubscribed (SendFable may still suppress)
    await pool.execute(
      `UPDATE newsletter_subscribers
       SET source = ?,
           updated_at = ?,
           status = 'subscribed',
           unsubscribed_at = NULL,
           sendfable_sync_status = CASE
             WHEN sendfable_sync_status = 'synced' THEN 'pending'
             ELSE 'pending'
           END
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
        createdAt: toIso(existing.created_at) || now.toISOString(),
      },
    };
  }

  await pool.execute(
    `INSERT INTO newsletter_subscribers
      (id, email, email_normalized, source, created_at, updated_at,
       status, sendfable_sync_status)
     VALUES (?, ?, ?, ?, ?, ?, 'subscribed', 'pending')`,
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

interface FileStoreRow extends NewsletterSignup {
  status?: SubscriberStatus;
  sendfableSyncStatus?: SendfableSyncStatus;
  sendfableSyncedAt?: string | null;
  sendfableContactId?: string | null;
  sendfableLastError?: string | null;
  unsubscribedAt?: string | null;
  updatedAt?: string;
}

async function readFileStore(): Promise<FileStoreRow[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, FILE_NAME), "utf-8");
    const parsed = JSON.parse(raw) as FileStoreRow[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeFileStore(rows: FileStoreRow[]): Promise<void> {
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
    existing.status = "subscribed";
    existing.unsubscribedAt = null;
    existing.sendfableSyncStatus = "pending";
    existing.updatedAt = new Date().toISOString();
    await writeFileStore(rows);
    return { created: false, storage: "file", signup: existing };
  }
  const signup: FileStoreRow = {
    id: generateId(),
    email,
    source: sourceSafe,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: "subscribed",
    sendfableSyncStatus: "pending",
    sendfableSyncedAt: null,
    sendfableContactId: null,
    sendfableLastError: null,
    unsubscribedAt: null,
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

export async function markSendfableSync(
  email: string,
  update: {
    status: SendfableSyncStatus;
    contactId?: string | null;
    error?: string | null;
  }
): Promise<void> {
  const normalized = normalizeEmail(email);
  const now = new Date();
  const errSafe = update.error ? update.error.slice(0, 500) : null;

  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    await pool.execute(
      `UPDATE newsletter_subscribers
       SET sendfable_sync_status = ?,
           sendfable_synced_at = ?,
           sendfable_contact_id = COALESCE(?, sendfable_contact_id),
           sendfable_last_error = ?,
           updated_at = ?
       WHERE email_normalized = ?`,
      [
        update.status,
        update.status === "synced" ? now : null,
        update.contactId ?? null,
        errSafe,
        now,
        normalized,
      ]
    );
    return;
  }

  const rows = await readFileStore();
  const row = rows.find((r) => normalizeEmail(r.email) === normalized);
  if (!row) return;
  row.sendfableSyncStatus = update.status;
  row.sendfableSyncedAt = update.status === "synced" ? now.toISOString() : null;
  if (update.contactId) row.sendfableContactId = update.contactId;
  row.sendfableLastError = errSafe;
  row.updatedAt = now.toISOString();
  await writeFileStore(rows);
}

export async function markLocalUnsubscribed(email: string): Promise<boolean> {
  const normalized = normalizeEmail(email);
  const now = new Date();

  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE newsletter_subscribers
       SET status = 'unsubscribed',
           unsubscribed_at = ?,
           updated_at = ?
       WHERE email_normalized = ?`,
      [now, now, normalized]
    );
    return result.affectedRows > 0;
  }

  const rows = await readFileStore();
  const row = rows.find((r) => normalizeEmail(r.email) === normalized);
  if (!row) return false;
  row.status = "unsubscribed";
  row.unsubscribedAt = now.toISOString();
  row.updatedAt = now.toISOString();
  await writeFileStore(rows);
  return true;
}

export async function listPendingSendfableSync(
  limit = 50
): Promise<NewsletterSubscriberRecord[]> {
  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [rows] = await pool.execute<SubscriberRow[]>(
      `SELECT id, email, source, created_at, updated_at, status,
              sendfable_sync_status, sendfable_synced_at, sendfable_contact_id,
              sendfable_last_error, unsubscribed_at
       FROM newsletter_subscribers
       WHERE status = 'subscribed'
         AND sendfable_sync_status IN ('pending', 'failed')
       ORDER BY updated_at ASC
       LIMIT ${Math.min(Math.max(limit, 1), 200)}`
    );
    return rows.map(rowToRecord);
  }

  const rows = await readFileStore();
  return rows
    .filter(
      (r) =>
        (r.status || "subscribed") === "subscribed" &&
        ["pending", "failed"].includes(r.sendfableSyncStatus || "pending")
    )
    .slice(0, limit)
    .map((r) => ({
      id: r.id,
      email: r.email,
      source: r.source,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt || r.createdAt,
      status: (r.status || "subscribed") as SubscriberStatus,
      sendfableSyncStatus: (r.sendfableSyncStatus || "pending") as SendfableSyncStatus,
      sendfableSyncedAt: r.sendfableSyncedAt || null,
      sendfableContactId: r.sendfableContactId || null,
      sendfableLastError: r.sendfableLastError || null,
      unsubscribedAt: r.unsubscribedAt || null,
    }));
}

export async function listNewsletterSignups(): Promise<NewsletterSignup[]> {
  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [rows] = await pool.execute<SubscriberRow[]>(
      `SELECT id, email, source, created_at
       FROM newsletter_subscribers
       WHERE COALESCE(status, 'subscribed') = 'subscribed'
       ORDER BY created_at ASC`
    );
    return rows.map((r) => ({
      id: r.id,
      email: r.email,
      source: r.source,
      createdAt: toIso(r.created_at) || new Date().toISOString(),
    }));
  }
  const rows = await readFileStore();
  return rows
    .filter((r) => (r.status || "subscribed") === "subscribed")
    .map(({ id, email, source, createdAt }) => ({ id, email, source, createdAt }));
}

export async function getSubscriberSyncStats(): Promise<{
  total: number;
  subscribed: number;
  unsubscribed: number;
  syncPending: number;
  syncFailed: number;
  syncSynced: number;
}> {
  if (hasDatabaseConfig()) {
    await ensureMysqlSchema();
    const pool = getDbPool();
    const [rows] = await pool.execute<
      (RowDataPacket & {
        total: number;
        subscribed: number;
        unsubscribed: number;
        sync_pending: number;
        sync_failed: number;
        sync_synced: number;
      })[]
    >(
      `SELECT
         COUNT(*) AS total,
         SUM(CASE WHEN COALESCE(status,'subscribed')='subscribed' THEN 1 ELSE 0 END) AS subscribed,
         SUM(CASE WHEN status='unsubscribed' THEN 1 ELSE 0 END) AS unsubscribed,
         SUM(CASE WHEN sendfable_sync_status='pending' THEN 1 ELSE 0 END) AS sync_pending,
         SUM(CASE WHEN sendfable_sync_status='failed' THEN 1 ELSE 0 END) AS sync_failed,
         SUM(CASE WHEN sendfable_sync_status='synced' THEN 1 ELSE 0 END) AS sync_synced
       FROM newsletter_subscribers`
    );
    const r = rows[0];
    return {
      total: Number(r?.total ?? 0),
      subscribed: Number(r?.subscribed ?? 0),
      unsubscribed: Number(r?.unsubscribed ?? 0),
      syncPending: Number(r?.sync_pending ?? 0),
      syncFailed: Number(r?.sync_failed ?? 0),
      syncSynced: Number(r?.sync_synced ?? 0),
    };
  }

  const rows = await readFileStore();
  return {
    total: rows.length,
    subscribed: rows.filter((r) => (r.status || "subscribed") === "subscribed").length,
    unsubscribed: rows.filter((r) => r.status === "unsubscribed").length,
    syncPending: rows.filter((r) => (r.sendfableSyncStatus || "pending") === "pending").length,
    syncFailed: rows.filter((r) => r.sendfableSyncStatus === "failed").length,
    syncSynced: rows.filter((r) => r.sendfableSyncStatus === "synced").length,
  };
}

export async function countNewsletterSignups(): Promise<number> {
  const stats = await getSubscriberSyncStats();
  return stats.subscribed;
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
