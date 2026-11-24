import pluginRss from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItKatex from "@traptitech/markdown-it-katex";

const postFiles = "./posts/**/*.md";
const ignoredTags = new Set(["all", "posts"]);
const postStatuses = new Set(["draft", "published"]);

function allPosts(collectionApi) {
  return collectionApi.getFilteredByGlob(postFiles).map((item) => {
    if (!postStatuses.has(item.data.status)) {
      throw new Error(`Post must have status draft or published: ${item.inputPath}`);
    }
    return item;
  });
}

function postsForLanguage(collectionApi, language) {
  const includeDrafts = process.env.BLOG_INCLUDE_DRAFTS === "true";
  return allPosts(collectionApi)
    .filter((item) => item.data.language === language && (includeDrafts || item.data.status === "published"))
    .sort((left, right) => right.date - left.date);
}

function translatedPosts(collectionApi) {
  const seen = new Map();
  const includeDrafts = process.env.BLOG_INCLUDE_DRAFTS === "true";
  return allPosts(collectionApi).filter((item) => {
    const key = item.data.translation_key;
    if (!key) return false;

    const identity = `${key}:${item.data.language}`;
    if (seen.has(identity)) {
      throw new Error(`Duplicate translation_key and language: ${identity}`);
    }
    seen.set(identity, item.inputPath);
    return includeDrafts || item.data.status === "published";
  });
}

function tagsFor(posts) {
  return [...new Set(posts.flatMap((post) => post.data.tags || []).filter((tag) => !ignoredTags.has(tag)))].sort();
}

export default function (eleventyConfig) {
  const includeDrafts = process.env.BLOG_INCLUDE_DRAFTS === "true";

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.setLibrary("md", markdownIt({ html: true }).use(markdownItKatex));
  eleventyConfig.addPreprocessor("draft-posts", "md", function (data) {
    if (this.inputPath.startsWith("./posts/") && data.status === "draft" && !includeDrafts) {
      return false;
    }
  });
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.ignores.add("./node_modules/**");
  eleventyConfig.ignores.add("./_site/**");
  eleventyConfig.ignores.add("./.git/**");
  eleventyConfig.ignores.add("./.github/**");
  eleventyConfig.ignores.add("./.agents/**");
  eleventyConfig.ignores.add("./generated/**");
  eleventyConfig.ignores.add("./scripts/**");
  eleventyConfig.ignores.add("./README.md");
  eleventyConfig.ignores.add("./AGENTS.md");
  eleventyConfig.ignores.add("./LICENSE.md");

  eleventyConfig.addCollection("posts_tr", (collectionApi) => postsForLanguage(collectionApi, "tr"));
  eleventyConfig.addCollection("posts_en", (collectionApi) => postsForLanguage(collectionApi, "en"));
  eleventyConfig.addCollection("latestPosts_tr", (collectionApi) => postsForLanguage(collectionApi, "tr").slice(0, 5));
  eleventyConfig.addCollection("latestPosts_en", (collectionApi) => postsForLanguage(collectionApi, "en").slice(0, 5));
  eleventyConfig.addCollection("translatedPosts", translatedPosts);
  eleventyConfig.addCollection("postTags_tr", (collectionApi) => tagsFor(postsForLanguage(collectionApi, "tr")));
  eleventyConfig.addCollection("postTags_en", (collectionApi) => tagsFor(postsForLanguage(collectionApi, "en")));
  eleventyConfig.addCollection("sitemapPages", (collectionApi) =>
    collectionApi
      .getAll()
      .filter((item) => item.url && item.outputPath?.endsWith(".html") && !item.data.excludeFromSitemap)
      .sort((left, right) => left.url.localeCompare(right.url))
  );

  eleventyConfig.addFilter("readableDate", (date, language = "tr") =>
    new Intl.DateTimeFormat(language === "tr" ? "tr-TR" : "en-US", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(date)
  );
  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString().slice(0, 10));
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value));
  eleventyConfig.addFilter("postsWithTag", (posts, tag) => posts.filter((post) => (post.data.tags || []).includes(tag)));
  eleventyConfig.addFilter("translationFor", (posts, key, language) =>
    key ? posts.find((post) => post.data.translation_key === key && post.data.language !== language) : undefined
  );
  eleventyConfig.addFilter("yearGroups", (posts) => {
    const groups = new Map();
    for (const post of posts) {
      const year = post.date.getFullYear();
      groups.set(year, [...(groups.get(year) || []), post]);
    }
    return [...groups].map(([year, entries]) => ({ year, entries }));
  });
  eleventyConfig.addFilter("excerpt", (content) => content.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().slice(0, 180));

  return {
    dir: {
      input: ".",
      includes: "site/_includes",
      data: "site/_data",
      output: "_site"
    },
    templateFormats: ["md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    pathPrefix: "/"
  };
}
