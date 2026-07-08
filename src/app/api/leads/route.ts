import { NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";
import { sendLeadNotification } from "@/lib/email";
import type { Lead } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const required = ["name", "email", "phone", "date", "groupSize", "eventType"];
    for (const field of required) {
      if (!body[field]?.toString().trim()) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const leadData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      date: body.date,
      groupSize: body.groupSize,
      budget: body.budget || "",
      eventType: body.eventType,
      preferredArea: body.preferredArea || "",
      needCaptain: body.needCaptain || "",
      notes: body.notes || "",
      source: body.source || "unknown",
    };

    let lead: Lead | null = null;

    try {
      lead = await saveLead(leadData);
    } catch (err) {
      console.error("[leads] Local storage failed:", err);
    }

    const leadForEmail: Lead = lead ?? {
      ...leadData,
      id: `ephemeral-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };

    await sendLeadNotification(leadForEmail).catch((err) => {
      console.error("[leads] Email notification failed:", err);
    });

    if (!lead) {
      console.log("[leads] Lead captured (email/log only):", leadForEmail.id, leadForEmail.email);
    }

    return NextResponse.json({ success: true, id: leadForEmail.id });
  } catch (err) {
    console.error("[leads] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to process lead" },
      { status: 500 }
    );
  }
}
