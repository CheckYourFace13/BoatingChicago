/**
 * MySQL connection for durable Hostinger storage.
 * Prefer 127.0.0.1 over localhost (IPv6 ::1 grant gaps on Hostinger).
 */

import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function hasDatabaseConfig(): boolean {
  return Boolean(
    process.env.DATABASE_URL?.trim() ||
      (process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME)
  );
}

function forceIpv4Loopback(host: string): string {
  if (host === "localhost" || host === "::1") return "127.0.0.1";
  return host;
}

function resolveConfig(): mysql.PoolOptions {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    const u = new URL(databaseUrl);
    return {
      host: forceIpv4Loopback(u.hostname),
      port: Number(u.port || 3306),
      user: decodeURIComponent(u.username),
      password: decodeURIComponent(u.password),
      database: u.pathname.replace(/^\//, ""),
      connectionLimit: 5,
      connectTimeout: 8_000,
      waitForConnections: true,
      enableKeepAlive: true,
    };
  }

  const user = process.env.DB_USER?.trim();
  const database = process.env.DB_NAME?.trim();
  if (!user || !database) {
    throw new Error("Database configuration missing");
  }

  return {
    host: forceIpv4Loopback(process.env.DB_HOST?.trim() || "127.0.0.1"),
    port: Number(process.env.DB_PORT || 3306),
    user,
    password: process.env.DB_PASSWORD ?? "",
    database,
    connectionLimit: 5,
    connectTimeout: 8_000,
    waitForConnections: true,
    enableKeepAlive: true,
  };
}

function buildPool(): mysql.Pool {
  return mysql.createPool(resolveConfig());
}

export function getDbPool(): mysql.Pool {
  if (!pool) {
    pool = buildPool();
  }
  return pool;
}
