import { appendFile, readFile } from "node:fs/promises";
import path from "node:path";

const args = Object.fromEntries(process.argv.slice(2).reduce((all, value, index, values) => {
  if (value.startsWith("--")) all.push([value.slice(2), values[index + 1]]);
  return all;
}, []));
if (!args.file) throw new Error("Missing --file");

const generatedPath = path.normalize(args.file);
if (!generatedPath.startsWith(`generated${path.sep}`) || generatedPath.includes("..")) throw new Error("File must be a Markdown file under generated/");
const content = await readFile(path.join(process.cwd(), generatedPath), "utf8");
const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if (!match) throw new Error("Generated file must begin with YAML front matter");

const frontMatter = match[1];
const body = match[2].trim();
const field = (name) => frontMatter.match(new RegExp(`^${name}:\\s*["']?(.+?)["']?\\s*$`, "m"))?.[1];
const platform = field("platform");
const status = field("status");
const title = field("title");
const canonicalUrl = field("canonical_url");

if (status !== "approved") throw new Error("Only generated files with status: approved can be published");
if (!platform || !title) throw new Error("Generated file must define platform and title");

async function publishDevto() {
  if (!process.env.DEVTO_API_KEY) throw new Error("DEVTO_API_KEY is required to publish to Dev.to");
  const response = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: { "api-key": process.env.DEVTO_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({ article: { title, body_markdown: body, published: true, canonical_url: canonicalUrl } })
  });
  if (!response.ok) throw new Error(`Dev.to publishing failed: ${response.status} ${await response.text()}`);
  const article = await response.json();
  return article.url;
}

async function publishX() {
  if (!process.env.X_USER_ACCESS_TOKEN) throw new Error("X_USER_ACCESS_TOKEN is required to publish to X");
  const posts = body.split(/\n\n---\n\n/).map((post) => post.trim()).filter(Boolean);
  if (!posts.length || posts.some((post) => post.length > 280)) throw new Error("Each X post must contain 1 to 280 characters");

  let replyTo;
  let firstUrl;
  for (const post of posts) {
    const payload = replyTo ? { text: post, reply: { in_reply_to_tweet_id: replyTo } } : { text: post };
    const response = await fetch("https://api.x.com/2/tweets", {
      method: "POST",
      headers: { authorization: `Bearer ${process.env.X_USER_ACCESS_TOKEN}`, "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`X publishing failed: ${response.status} ${await response.text()}`);
    const result = await response.json();
    replyTo = result.data.id;
    firstUrl ||= `https://x.com/i/web/status/${replyTo}`;
  }
  return firstUrl;
}

let url;
if (platform === "devto") url = await publishDevto();
else if (platform === "x") url = await publishX();
else throw new Error(`${platform} publishing is not automated. LinkedIn and Medium require account-specific publishing access and remain manual.`);

const summary = `Published [${title}](${url}) from \`${generatedPath}\` to ${platform}.`;
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
console.log(summary);
