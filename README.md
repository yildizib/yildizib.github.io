# yildizib.github.io

This repository is the source of truth for Ibrahim Yildiz's personal blog. It is a bilingual notebook for ideas about software, systems, writing, and the details worth keeping. Posts begin as Markdown notes in Bear, are deliberately selected for this repository, and are published as a static site at [yildizib.github.io](https://yildizib.github.io).

The project is designed to keep authorship and provenance close to the writing. A primary post remains a readable Markdown file in Git. A short LinkedIn or X adaptation, or a full Dev.to or Medium syndication package, records the exact source post and revision it came from. Automation can prepare drafts, but it never replaces editorial review.

## Principles

- Markdown is the durable source format.
- `master` contains reviewed, publishable material only.
- The primary blog owns the canonical version of every post.
- Generated platform content is a reviewable derivative, never a second source of truth.
- Published posts may be Turkish or English; operational GitHub text is English.

## Content Structure

Primary posts are grouped by language and date:

```text
posts/
  tr/2026/08/post-slug.md
  en/2026/08/post-slug.md
```

Generated drafts are kept separate from the public site:

```text
generated/
  linkedin/tr/2026/08/post-slug-short.md
  x/en/2026/08/post-slug-mid.md
  devto/tr/2026/08/post-slug-full.md
  medium/en/2026/08/post-slug-full.md
```

Each primary post must include `title`, `slug`, `date`, `language`, `description`, and `tags`. Translations share a `translation_key`; unrelated posts do not use one.

```md
---
title: "Thinking with sources"
slug: "thinking-with-sources"
date: 2026-08-18
language: en
translation_key: "thinking-with-sources"
description: "Keeping the origin of a note intact while making it useful again."
tags: ["notes", "writing", "systems"]
permalink: /en/thinking-with-sources/
---
```

## Local Development

The site requires Node.js 20 or newer.

```sh
npm ci
npm run serve
```

Eleventy starts a local development server and watches for changes. The production build can be checked with:

```sh
npm run build
```

Generated static files are written to `_site/`. This directory is ignored by Git and is the only artifact deployed to GitHub Pages.

## Publishing

GitHub Pages is deployed by `.github/workflows/static.yml`. Every reviewed pull request merged into `master` installs dependencies, builds the site, and publishes `_site/` automatically.

GitHub Pages must be configured to use **GitHub Actions** as its publishing source. A custom domain can be added later through a dedicated change that adds the `CNAME` build asset and configures the corresponding DNS records.
