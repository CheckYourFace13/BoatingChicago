import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  AWIN_PUBLISHER_ID,
  BLUETTI_AWIN,
  buildBluettiAwinUrl,
  isBluettiAwinUrl,
} from "../partner-programs";

describe("BLUETTI Awin helpers", () => {
  it("builds awclick URLs with verified mid/gid/linkid and publisher id", () => {
    const url = buildBluettiAwinUrl("elite-100-mini", "Winterizing BLUETTI!");
    const u = new URL(url);
    assert.equal(u.hostname, "www.awin1.com");
    assert.equal(u.pathname, "/awclick.php");
    assert.equal(u.searchParams.get("mid"), BLUETTI_AWIN.mid);
    assert.equal(u.searchParams.get("gid"), "568164");
    assert.equal(u.searchParams.get("linkid"), "4885014");
    assert.equal(u.searchParams.get("awinaffid"), AWIN_PUBLISHER_ID);
    assert.equal(u.searchParams.get("clickref"), "winterizing-bluetti");
    assert.equal(isBluettiAwinUrl(url, "elite-100-mini"), true);
  });

  it("rejects non-BLUETTI merchant ids", () => {
    assert.equal(
      isBluettiAwinUrl(
        "https://www.awin1.com/awclick.php?gid=568164&mid=89509&awinaffid=3112962&linkid=4885014"
      ),
      false
    );
  });
});
