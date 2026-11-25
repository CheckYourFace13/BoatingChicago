/**
 * Compatibility entry — delegates to the growth pipeline (propose mode, no link probes).
 * Prefer: npm run growth-pipeline -- --mode=propose --probe
 */
import { runPipeline } from "./growth/pipeline";

await runPipeline(["--mode=propose"]);
