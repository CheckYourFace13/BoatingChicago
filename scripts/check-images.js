const fs = require("fs");
const text = fs.readFileSync("src/data/images.ts", "utf8");
const srcs = [...text.matchAll(/src:\s*"([^"]+)"/g)].map((m) => m[1]);
const counts = {};
for (const s of srcs) counts[s] = (counts[s] || 0) + 1;
const dups = Object.entries(counts).filter(([, c]) => c > 1);
console.log("total src entries", srcs.length);
console.log("unique files", Object.keys(counts).length);
if (dups.length) {
  console.log("DUPLICATE KEYS IN siteImages", dups);
  process.exit(1);
}
const missing = srcs.filter((s) => !fs.existsSync("public" + s));
if (missing.length) {
  console.log("MISSING", missing);
  process.exit(1);
}
console.log("All image files exist and each src path is defined once");
