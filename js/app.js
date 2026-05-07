(function () {
  const hiddenTitle = "order:hot - e621";
  const hiddenFavicon = "/b.svg";

  const originalTitle = document.title;
  const faviconEl = document.getElementById("dynamic-favicon");
  const originalFavicon = faviconEl ? faviconEl.getAttribute("href") : null;

  function updateTabState() {
    const isHidden = document.visibilityState === "hidden";

    document.title = isHidden ? hiddenTitle : originalTitle;

    if (faviconEl && originalFavicon) {
      faviconEl.setAttribute("href", isHidden ? hiddenFavicon : originalFavicon);
    }
  }

  if (typeof document.visibilityState === "string") {
    document.addEventListener("visibilitychange", updateTabState);
    updateTabState();
  }
})();

