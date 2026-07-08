import { promises as fs } from "fs";
import path from "path";
import type { Lead, NewsletterSignup } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    await ensureDataDir();
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T[];
  } catch {
    return [];
  }
}

async function writeJsonFile<T>(filename: string, data: T[]): Promise<void> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export async function saveLead(
  lead: Omit<Lead, "id" | "createdAt">
): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  try {
    const leads = await readJsonFile<Lead>("leads.json");
    leads.push(newLead);
    await writeJsonFile("leads.json", leads);
  } catch (err) {
    console.error("[leads] Local file storage failed (non-fatal):", err);
  }

  return newLead;
}

export async function getLeads(): Promise<Lead[]> {
  return readJsonFile<Lead>("leads.json");
}

export async function saveNewsletterSignup(
  signup: Omit<NewsletterSignup, "id" | "createdAt">
): Promise<NewsletterSignup> {
  const newSignup: NewsletterSignup = {
    ...signup,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  try {
    const signups = await readJsonFile<NewsletterSignup>("newsletter.json");
    signups.push(newSignup);
    await writeJsonFile("newsletter.json", signups);
  } catch (err) {
    console.error("[newsletter] Local file storage failed (non-fatal):", err);
  }

  return newSignup;
}

export async function getNewsletterSignups(): Promise<NewsletterSignup[]> {
  return readJsonFile<NewsletterSignup>("newsletter.json");
}
