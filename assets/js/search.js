const page = document.querySelector("[data-search-page]");

if (page) {
  const input = page.querySelector("[data-search-input]");
  const results = page.querySelector("[data-search-results]");
  const button = page.querySelector("[data-search-more]");
  const language = page.dataset.language;
  const emptyText = language === "tr" ? "Eşleşen yazı bulunamadı." : "No matching posts found.";
  const pageSize = 10;
  let matches = [];
  let visibleCount = pageSize;

  const render = () => {
    if (!matches.length) {
      results.innerHTML = `<p>${emptyText}</p>`;
      button.hidden = true;
      return;
    }

    results.innerHTML = matches.slice(0, visibleCount).map((post) => `<article class="search-result"><a href="${post.url}"><strong>${post.title}</strong></a><p>${post.description}</p></article>`).join("");
    button.hidden = visibleCount >= matches.length;
  };

  fetch("/search.json")
    .then((response) => response.json())
    .then((posts) => {
      input.addEventListener("input", () => {
        const query = input.value.trim().toLocaleLowerCase(language);
        visibleCount = pageSize;
        if (!query) {
          matches = [];
          results.replaceChildren();
          button.hidden = true;
          return;
        }
        matches = posts.filter((post) => post.language === language && [post.title, post.description, post.tags.join(" ")].join(" ").toLocaleLowerCase(language).includes(query));
        render();
      });

      button.addEventListener("click", () => {
        visibleCount += pageSize;
        render();
        results.querySelectorAll(".search-result")[visibleCount - pageSize]?.querySelector("a")?.focus({ preventScroll: true });
      });
    });
}
