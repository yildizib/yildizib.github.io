const page = document.querySelector("[data-search-page]");

if (page) {
  const input = page.querySelector("[data-search-input]");
  const results = page.querySelector("[data-search-results]");
  const language = page.dataset.language;
  const emptyText = language === "tr" ? "Eslesen yazi bulunamadi." : "No matching posts found.";

  fetch("/search.json")
    .then((response) => response.json())
    .then((posts) => {
      input.addEventListener("input", () => {
        const query = input.value.trim().toLocaleLowerCase(language);
        if (!query) { results.replaceChildren(); return; }
        const matches = posts.filter((post) => post.language === language && [post.title, post.description, post.tags.join(" ")].join(" ").toLocaleLowerCase(language).includes(query));
        results.innerHTML = matches.length ? matches.map((post) => `<article class="search-result"><a href="${post.url}"><strong>${post.title}</strong></a><p>${post.description}</p></article>`).join("") : `<p>${emptyText}</p>`;
      });
    });
}
