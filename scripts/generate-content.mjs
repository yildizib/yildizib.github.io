import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import OpenAI from "openai";

const args = Object.fromEntries(process.argv.slice(2).reduce((all, value, index, values) => {
  if (value.startsWith("--")) all.push([value.slice(2), values[index + 1]]);
  return all;
}, []));
const required = ["source", "platform", "format", "language"];
for (const key of required) if (!args[key]) throw new Error(`Missing --${key}`);

const root = process.cwd();
const sourcePath = path.normalize(args.source);
if (!sourcePath.startsWith(`posts${path.sep}`) || sourcePath.includes("..")) throw new Error("Source must be a Markdown file under posts/");
if (!["linkedin", "x", "devto", "medium"].includes(args.platform)) throw new Error("Unsupported platform");
if (!["tr", "en"].includes(args.language)) throw new Error("Unsupported language");
const supportedFormat = (["linkedin", "x"].includes(args.platform) && ["short", "mid"].includes(args.format)) || (["devto", "medium"].includes(args.platform) && args.format === "full");
if (!supportedFormat) throw new Error("Use short/mid for LinkedIn or X, and full for Dev.to or Medium");

const source = await readFile(path.join(root, sourcePath), "utf8");
const match = source.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if (!match) throw new Error("Source must begin with YAML front matter");
if (args.validate === "true") {
  console.log("Content request is valid");
  process.exit(0);
}
const sourceFrontMatter = match[1];
const sourceBody = match[2];
const field = (name) => sourceFrontMatter.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, "m"))?.[1];
const title = field("title") || path.basename(sourcePath, ".md");
const slug = field("slug") || path.basename(sourcePath, ".md");
const sourceLanguage = field("language") || args.language;
const sourceCommit = process.env.SOURCE_COMMIT || "local";
const siteUrl = (process.env.SITE_URL || "https://yildizib.github.io").replace(/\/$/, "");
const canonicalUrl = `${siteUrl}/${sourceLanguage}/${slug}/`;
const now = new Date();
const year = String(now.getUTCFullYear());
const month = String(now.getUTCMonth() + 1).padStart(2, "0");
const outputPath = path.posix.join("generated", args.platform, args.language, year, month, `${slug}-${args.format}.md`);

const references = `references:\n  - path: "${path.relative(path.dirname(outputPath), sourcePath)}"\n    role: source\n    source_language: ${sourceLanguage}\n    source_commit: ${sourceCommit}`;
const generation = `generation:\n  prompt_version: ".agents/platforms/${args.platform}/${args.format}.md"\n  target_language: ${args.language}\n  generated_at: "${now.toISOString()}"`;
let output;

if (["devto", "medium"].includes(args.platform) && args.format === "full") {
  output = `---\ntitle: "${title.replaceAll('"', '\\"')}"\nplatform: ${args.platform}\nformat: full\nlanguage: ${sourceLanguage}\nstatus: draft\ncanonical_url: "${canonicalUrl}"\n${references}\ncontent_hash: "sha256:${createHash("sha256").update(sourceBody).digest("hex")}"\n${generation}\n---\n${sourceBody}`;
} else {
  if (!process.env.OLLAMA_API_KEY) throw new Error("OLLAMA_API_KEY is required for social drafts");
  const files = [
    ".agents/blog/rules/content-integrity.md",
    ".agents/blog/rules/editorial-voice.md",
    ".agents/blog/rules/markdown-frontmatter.md",
    ".agents/blog/rules/provenance.md",
    `.agents/blog/rules/language-${args.language}.md`,
    `.agents/blog/skills/derive-${args.platform}.md`,
    `.agents/platforms/${args.platform}/${args.format}.md`
  ];
  const instructions = await Promise.all(files.map(async (file) => `## ${file}\n${await readFile(path.join(root, file), "utf8")}`));
  const client = new OpenAI({
    apiKey: process.env.OLLAMA_API_KEY,
    baseURL: process.env.OLLAMA_BASE_URL || "https://api.ollama.com/v1/"
  });
  const response = await client.responses.create({
    model: process.env.OLLAMA_MODEL || "gpt-oss:20b-cloud",
    input: `${instructions.join("\n\n")}\n\n## Generation context\nTarget language: ${args.language}\nSource path: ${sourcePath}\nSource language: ${sourceLanguage}\nSource commit: ${sourceCommit}\n\n## Source Markdown\n${source}`
  });
  output = response.output_text.trim();
  if (!output.startsWith("---\n") || !output.includes("references:")) throw new Error("Model returned invalid Markdown front matter");
}

await mkdir(path.dirname(path.join(root, outputPath)), { recursive: true });
await writeFile(path.join(root, outputPath), output.endsWith("\n") ? output : `${output}\n`);
if (process.env.GITHUB_OUTPUT) await writeFile(process.env.GITHUB_OUTPUT, `output_path=${outputPath}\n`, { flag: "a" });
console.log(outputPath);
