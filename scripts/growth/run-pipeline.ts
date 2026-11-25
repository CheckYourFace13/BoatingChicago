import { runPipeline } from "./pipeline";

runPipeline().catch((err) => {
  console.error(err);
  process.exit(1);
});
