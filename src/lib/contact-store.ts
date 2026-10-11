/**
 * Durable contact-form message store (MySQL on Hostinger).
 * Used for provider retry when owner-notify delivery fails.
 */

import type { RowDataPacket } from "mysql2";
import { getDbPool, hasDatabaseConfig } from "@/lib/db";

export type ContactDeliveryStatus =
  | "pending"
  | "accepted"
  | "failed"
  | "dead";

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  briefOptIn: boolean;
  deliveryStatus: ContactDeliveryStatus;
  provider: string | null;
  providerMessageId: string | null;
  lastError: string | null;
  attemptCount: number;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string | null;
}

interface ContactRow extends RowDataPacket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  brief_opt_in: number;
  delivery_status: string;
  provider: string | null;
  provider_message_id: string | null;
  last_error: string | null;
  attempt_count: number;
  created_at: Date | string;
  updated_at: Date | string;
  delivered_at: Date | string | null;
}

function generateId(): string {
  return `cm-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function toIso(value: Date | string | null | undefined): string | null {
  if (value == null) return null;
  return value instanceof Date ? value.toISOString() : new Date(value).toISOString();
}

function rowToRecord(r: ContactRow): ContactMessageRecord {
  const status = (r.delivery_status || "pending") as ContactDeliveryStatus;
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    subject: r.subject,
    message: r.message,
    briefOptIn: Boolean(r.brief_opt_in),
    deliveryStatus: status,
    provider: r.provider,
    providerMessageId: r.provider_message_id,
    lastError: r.last_error,
    attemptCount: Number(r.attempt_count || 0),
    createdAt: toIso(r.created_at) || new Date().toISOString(),
    updatedAt: toIso(r.updated_at) || new Date().toISOString(),
    deliveredAt: toIso(r.delivered_at),
  };
}

let schemaReady: Promise<void> | null = null;

async function ensureMysqlSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const pool = getDbPool();
      await pool.execute(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id VARCHAR(64) NOT NULL,
          name VARCHAR(120) NOT NULL,
          email VARCHAR(200) NOT NULL,
          subject VARCHAR(120) NOT NULL,
          message TEXT NOT NULL,
          brief_opt_in TINYINT(1) NOT NULL DEFAULT 0,
          delivery_status VARCHAR(32) NOT NULL DEFAULT 'pending',
          provider VARCHAR(64) NULL,
          provider_message_id VARCHAR(200) NULL,
          last_error VARCHAR(500) NULL,
          attempt_count INT NOT NULL DEFAULT 0,
          created_at DATETIME(3) NOT NULL,
          updated_at DATETIME(3) NOT NULL,
          delivered_at DATETIME(3) NULL,
          PRIMARY KEY (id),
          KEY idx_contact_delivery_status (delivery_status, updated_at),
          KEY idx_contact_created (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
      `);
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
}

export function isContactStoreConfigured(): boolean {
  return hasDatabaseConfig();
}

export async function createContactMessage(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  briefOptIn: boolean;
}): Promise<ContactMessageRecord | null> {
  if (!hasDatabaseConfig()) return null;
  await ensureMysqlSchema();
  const pool = getDbPool();
  const id = generateId();
  const now = new Date();
  await pool.execute(
    `INSERT INTO contact_messages
      (id, name, email, subject, message, brief_opt_in, delivery_status,
       attempt_count, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', 0, ?, ?)`,
    [
      id,
      input.name,
      input.email,
      input.subject,
      input.message,
      input.briefOptIn ? 1 : 0,
      now,
      now,
    ]
  );
  return {
    id,
    name: input.name,
    email: input.email,
    subject: input.subject,
    message: input.message,
    briefOptIn: input.briefOptIn,
    deliveryStatus: "pending",
    provider: null,
    providerMessageId: null,
    lastError: null,
    attemptCount: 0,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    deliveredAt: null,
  };
}

export async function markContactAccepted(input: {
  id: string;
  provider: string;
  providerMessageId?: string | null;
}): Promise<void> {
  if (!hasDatabaseConfig()) return;
  await ensureMysqlSchema();
  const pool = getDbPool();
  const now = new Date();
  await pool.execute(
    `UPDATE contact_messages
     SET delivery_status = 'accepted',
         provider = ?,
         provider_message_id = ?,
         last_error = NULL,
         attempt_count = attempt_count + 1,
         updated_at = ?,
         delivered_at = ?
     WHERE id = ?`,
    [input.provider, input.providerMessageId || null, now, now, input.id]
  );
}

export async function markContactFailed(input: {
  id: string;
  error: string;
  dead?: boolean;
}): Promise<void> {
  if (!hasDatabaseConfig()) return;
  await ensureMysqlSchema();
  const pool = getDbPool();
  const now = new Date();
  const status = input.dead ? "dead" : "failed";
  await pool.execute(
    `UPDATE contact_messages
     SET delivery_status = ?,
         last_error = ?,
         attempt_count = attempt_count + 1,
         updated_at = ?
     WHERE id = ?`,
    [status, input.error.slice(0, 500), now, input.id]
  );
}

/** Pending/failed rows eligible for retry (not already accepted, not dead). */
export async function listContactMessagesForRetry(
  limit = 25
): Promise<ContactMessageRecord[]> {
  if (!hasDatabaseConfig()) return [];
  await ensureMysqlSchema();
  const pool = getDbPool();
  const [rows] = await pool.query<ContactRow[]>(
    `SELECT * FROM contact_messages
     WHERE delivery_status IN ('pending', 'failed')
       AND attempt_count < 8
     ORDER BY updated_at ASC
     LIMIT ?`,
    [limit]
  );
  return rows.map(rowToRecord);
}

/**
 * Dedup helper: skip re-send when the same visitor email + subject + message
 * was already accepted recently (recovery / double-submit protection).
 */
export async function findRecentAcceptedDuplicate(input: {
  email: string;
  subject: string;
  message: string;
  withinHours?: number;
}): Promise<ContactMessageRecord | null> {
  if (!hasDatabaseConfig()) return null;
  await ensureMysqlSchema();
  const pool = getDbPool();
  const hours = input.withinHours ?? 72;
  const [rows] = await pool.query<ContactRow[]>(
    `SELECT * FROM contact_messages
     WHERE delivery_status = 'accepted'
       AND email = ?
       AND subject = ?
       AND message = ?
       AND delivered_at >= (UTC_TIMESTAMP(3) - INTERVAL ? HOUR)
     ORDER BY delivered_at DESC
     LIMIT 1`,
    [input.email, input.subject, input.message, hours]
  );
  return rows[0] ? rowToRecord(rows[0]) : null;
}

export async function countContactDeliveryStats(): Promise<{
  pending: number;
  failed: number;
  accepted: number;
  dead: number;
}> {
  if (!hasDatabaseConfig()) {
    return { pending: 0, failed: 0, accepted: 0, dead: 0 };
  }
  await ensureMysqlSchema();
  const pool = getDbPool();
  const [rows] = await pool.query<(RowDataPacket & { delivery_status: string; n: number })[]>(
    `SELECT delivery_status, COUNT(*) AS n FROM contact_messages GROUP BY delivery_status`
  );
  const out = { pending: 0, failed: 0, accepted: 0, dead: 0 };
  for (const r of rows) {
    if (r.delivery_status === "pending") out.pending = Number(r.n);
    else if (r.delivery_status === "failed") out.failed = Number(r.n);
    else if (r.delivery_status === "accepted") out.accepted = Number(r.n);
    else if (r.delivery_status === "dead") out.dead = Number(r.n);
  }
  return out;
}
