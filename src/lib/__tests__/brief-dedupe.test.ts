import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { findExistingBriefSchedule } from "@/lib/sendfable-client";
import { briefIssueSlotKey } from "@/lib/brief/schedule";

describe("findExistingBriefSchedule", () => {
  const target = new Date("2026-10-15T20:00:00.000Z");
  const slot = briefIssueSlotKey(target);

  it("matches COMPLETED campaigns on the same Chicago Thursday", () => {
    const hit = findExistingBriefSchedule(
      [
        {
          id: "c1",
          name: "Chicago Boating Brief — 2026-10-15",
          status: "COMPLETED",
          subject: "x",
          scheduledAt: "2026-10-15T20:00:00.000Z",
          sentAt: "2026-10-15T20:00:10.000Z",
          recipientCount: 1,
          sentCount: 1,
          issueSlotKey: slot,
        },
      ],
      target
    );
    assert.equal(hit?.id, "c1");
  });

  it("ignores SCHEDULED-only limitation and catches SENDING", () => {
    const hit = findExistingBriefSchedule(
      [
        {
          id: "c2",
          name: "Chicago Boating Brief — 2026-10-15",
          status: "SENDING",
          subject: "x",
          scheduledAt: "2026-10-15T20:00:00.000Z",
          sentAt: null,
          recipientCount: 1,
          sentCount: 0,
        },
      ],
      target
    );
    assert.equal(hit?.id, "c2");
  });

  it("skips TEST drafts and FAILED slots", () => {
    const hit = findExistingBriefSchedule(
      [
        {
          id: "t1",
          name: "[TEST] Chicago Boating Brief — 2026-10-15",
          status: "SCHEDULED",
          subject: "x",
          scheduledAt: "2026-10-15T20:00:00.000Z",
          sentAt: null,
          recipientCount: 0,
          sentCount: 0,
        },
        {
          id: "f1",
          name: "Chicago Boating Brief — 2026-10-15",
          status: "FAILED",
          subject: "x",
          scheduledAt: "2026-10-15T20:00:00.000Z",
          sentAt: null,
          recipientCount: 5,
          sentCount: 5,
          issueSlotKey: slot,
        },
      ],
      target
    );
    assert.equal(hit, null);
  });
});
