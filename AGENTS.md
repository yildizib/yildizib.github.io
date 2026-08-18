# Repository Guide

This repository is the source of truth for a multilingual personal blog. Posts are authored as Markdown, built with Eleventy, and published as static files to GitHub Pages.

## Where to look

- Read `README.md` for local development and content placement.
- Read `posts/posts.json` and a nearby post before creating or editing a blog post.
- Read `site/_data/site.js`, `site/_includes/`, and `assets/` before changing presentation or routing.
- Read `.agents/blog/rules/` before generating, editing, or reviewing AI-assisted content.
- Read `.agents/blog/rules/publishing-workflow.md` before changing or running external publishing automation.
- Read `.agents/platforms/<platform>/` and `.agents/blog/skills/` for a selected distribution target.
- Read `.github/workflows/` before changing publishing or content-generation automation.

## Content rules

- Primary posts belong in `posts/<language>/<year>/<month>/`.
- Keep a post's metadata accurate. Use `translation_key` only for real translations.
- Generated drafts belong in `generated/` and never become a substitute for the primary post.
- GitHub operational text, issue bodies, PR titles, PR bodies, commit messages, and agent rules are written in English. Published post language is determined by its `language` metadata.

## Delivery rules

- Never push directly to `master`.
- Follow `.agents/blog/rules/contribution-workflow.md` for every change, including generated content.
- GitHub Pages publishes only after a reviewed PR is merged into `master`.
