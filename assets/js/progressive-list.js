document.querySelectorAll("[data-progressive-list]").forEach((list) => {
  const items = [...list.querySelectorAll("[data-progressive-item]")];
  const button = list.querySelector("[data-load-more]");
  const pageSize = Number.parseInt(list.dataset.pageSize, 10) || 10;
  let visibleCount = pageSize;

  if (!button || items.length <= pageSize) return;

  const update = () => {
    items.forEach((item, index) => {
      item.hidden = index >= visibleCount;
    });

    button.hidden = visibleCount >= items.length;
  };

  button.addEventListener("click", () => {
    const firstNewItem = items[visibleCount];
    visibleCount += pageSize;
    update();
    firstNewItem?.querySelector("a")?.focus({ preventScroll: true });
  });

  update();
});
