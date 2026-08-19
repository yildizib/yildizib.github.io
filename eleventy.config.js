import pluginRss from "@11ty/eleventy-plugin-rss";
import markdownIt from "markdown-it";
import markdownItKatex from "@traptitech/markdown-it-katex";

const postFiles = "./posts/**/*.md";
const ignoredTags = new Set(["all", "posts"]);

function postsForLanguage(collectionApi, language) {
  return collectionApi
    .getFilteredByGlob(postFiles)
    .filter((item) => item.data.language === language && !item.data.draft)
    .sort((left, right) => right.date - left.date);
}

function tagsFor(posts) {
  return [...new Set(posts.flatMap((post) => post.data.tags || []).filter((tag) => !ignoredTags.has(tag)))].sort();
}

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.setLibrary("md", markdownIt({ html: true }).use(markdownItKatex));
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
  eleventyConfig.addCollection("postTags_tr", (collectionApi) => tagsFor(postsForLanguage(collectionApi, "tr")));
  eleventyConfig.addCollection("postTags_en", (collectionApi) => tagsFor(postsForLanguage(collectionApi, "en")));

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
