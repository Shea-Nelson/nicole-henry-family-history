(function () {
  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#site-nav");

  function syncStickyTop() {
    if (!header) return;
    document.documentElement.style.setProperty("--sticky-top", header.offsetHeight + "px");
  }

  syncStickyTop();
  window.addEventListener("resize", syncStickyTop);
  if (typeof ResizeObserver === "function" && header) {
    new ResizeObserver(syncStickyTop).observe(header);
  }

  function closeMenu() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function focusSectionHeading(link) {
    var id = (link.getAttribute("href") || "").slice(1);
    var target = document.getElementById(id);
    if (!target) return;
    var heading = target.matches("h1, h2") ? target : target.querySelector("h1, h2");
    if (!heading) return;
    if (!heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
    // The address bar hash already scrolled the section into view.
    window.requestAnimationFrame(function () {
      heading.focus({ preventScroll: true });
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !nav.classList.contains("is-open")) return;
      closeMenu();
      navToggle.focus();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || navToggle.contains(event.target)) return;
      closeMenu();
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href^='#']");
    if (!link || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    closeMenu();
    focusSectionHeading(link);
  });
})();
