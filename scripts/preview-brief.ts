import { generateBriefIssue } from "../src/lib/brief/generator";
import { qaBriefIssue } from "../src/lib/brief/qa";

async function main() {
  const issue = await generateBriefIssue();
  const qa = await qaBriefIssue(issue);
  console.log(
    JSON.stringify(
      {
        subject: issue.subject,
        previewText: issue.previewText,
        sections: issue.sections.map((s) => s.id),
        meta: issue.meta,
        qa: {
          ok: qa.ok,
          errors: qa.errors,
          warnings: qa.warnings.slice(0, 8),
        },
        htmlLen: issue.htmlBody.length,
      },
      null,
      2
    )
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
