# Contribution workflow

Apply this workflow to every repository change, including generated content drafts.

1. Start from an up-to-date local copy of `master`.
2. Create a GitHub issue in English. Explain the goal, scope, and acceptance criteria in English.
3. Assign the issue to `yildizib`.
4. Create one branch from `master` named `content/<meaningful-kebab-case-topic>-<issue-number>`.
5. Make only the changes needed for that issue. Use English for commit messages and any GitHub-facing text.
6. Open a pull request to `master` in English. The title and body must reference the issue and include `Closes #<issue-number>`.
7. Wait for human review. Do not merge, publish, or push directly to `master`.
8. After the PR is merged, the Pages deployment workflow runs from `master` and publishes the static blog automatically.

Generated content workflows may validate a request before opening an issue, but must create and assign the issue before creating the issue-linked branch, committing output, or opening the review PR. All generated output remains `status: draft` until the PR is reviewed and merged.
