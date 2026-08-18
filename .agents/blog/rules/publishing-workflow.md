# External publishing workflow

External publication is always manual. Review a generated draft, then set its front matter to `status: approved` before merging the review pull request into `master`.

After the approved file is present on `master`, run the `Publish approved content` workflow manually. Enter the generated file path and the exact confirmation value `PUBLISH`. The workflow checks out `master`; it never publishes an unmerged branch.

Dev.to and X can be published automatically when their repository secrets are configured. Dev.to requires `DEVTO_API_KEY`. X requires an OAuth 2.0 user access token with `tweet.write`, stored as `X_USER_ACCESS_TOKEN`.

LinkedIn and Medium publication remains manual because their account-level publishing access is not reliably available through a general repository workflow. Their generated packages are still reviewable and retain canonical and provenance metadata.

Protect the `content-publishing` GitHub Actions environment with required reviewers before adding publishing secrets. Never write access tokens, API keys, or published credentials to issues, pull requests, Markdown files, or workflow logs.
