import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  allowsAdvertising,
  allowsAnalytics,
  parseConsent,
  UNDECIDED_CONSENT,
} from "../consent";

describe("consent store", () => {
  it("treats missing or invalid storage as denied and undecided", () => {
    assert.deepEqual(parseConsent(null), UNDECIDED_CONSENT);
    assert.deepEqual(parseConsent("{"), UNDECIDED_CONSENT);
    assert.deepEqual(parseConsent('{"version":2,"decided":true,"analytics":true}'), UNDECIDED_CONSENT);
    assert.equal(allowsAnalytics(UNDECIDED_CONSENT), false);
    assert.equal(allowsAdvertising(UNDECIDED_CONSENT), false);
  });

  it("does not grant analytics or ads unless decided and true", () => {
    assert.equal(
      allowsAnalytics(parseConsent('{"version":1,"decided":false,"analytics":true,"advertising":true}')),
      false,
    );
    assert.equal(
      allowsAdvertising(parseConsent('{"version":1,"decided":true,"analytics":true,"advertising":false}')),
      false,
    );
    assert.equal(
      allowsAnalytics(parseConsent('{"version":1,"decided":true,"analytics":true,"advertising":false}')),
      true,
    );
    assert.equal(
      allowsAdvertising(parseConsent('{"version":1,"decided":true,"analytics":false,"advertising":true}')),
      true,
    );
  });
});
