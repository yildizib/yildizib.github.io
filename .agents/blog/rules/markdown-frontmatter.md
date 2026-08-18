# Markdown output

Return only valid Markdown. Start with YAML front matter and do not wrap the response in a code fence. Do not explain your process.

For generated derivatives, front matter must include `title`, `platform`, `format`, `language`, `status: draft`, and a `references` list containing the source path, `role: source`, source language, and source commit. Include a `generation` object with the prompt path and target language.
