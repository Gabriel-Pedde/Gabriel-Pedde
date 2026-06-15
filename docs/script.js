document.getElementById("year").textContent = new Date().getFullYear();

// Typewriter cycling through field labels
(function () {
  const phrases = [
    "High-energy physics",
    "High performance computing",
    "Machine learning & AI",
  ];
  const textEl   = document.querySelector(".tagline-text");
  if (!textEl) return;

  let phraseIdx = 0;
  let charIdx   = 0;
  let deleting  = false;

  function tick() {
    const current = phrases[phraseIdx];
    if (!deleting) {
      textEl.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 1800);  // pause before erasing
        return;
      }
      setTimeout(tick, 65);
    } else {
      textEl.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting  = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 380);
        return;
      }
      setTimeout(tick, 32);
    }
  }

  setTimeout(tick, 900);
})();

// Dark mode toggle
(function () {
  const root   = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  function isDark() {
    if (root.dataset.theme === "dark")  return true;
    if (root.dataset.theme === "light") return false;
    return matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyIcon() {
    toggle.textContent = isDark() ? "☀" : "☽"; // ☀ / ☽
  }

  applyIcon();

  toggle.addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.dataset.theme = next;
    localStorage.setItem("theme", next);
    applyIcon();
  });
})();

// Page navigation
(function () {
  const links   = document.querySelectorAll(".nav-link");
  const pages   = document.querySelectorAll(".page");
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const burger  = document.getElementById("sidebar-toggle");

  function showPage(id) {
    pages.forEach(p => p.classList.remove("active"));
    links.forEach(l => l.classList.remove("active"));

    const page = document.getElementById(id);
    const link = document.querySelector(`.nav-link[data-page="${id}"]`);

    if (page) { page.classList.add("active"); window.scrollTo(0, 0); }
    if (link) link.classList.add("active");

    history.replaceState(null, "", "#" + id);
  }

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      showPage(link.dataset.page);
      sidebar.classList.remove("open");
      overlay.classList.remove("visible");
    });
  });

  burger.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("visible");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
  });

  const hash = location.hash.slice(1);
  if (hash && document.getElementById(hash)) showPage(hash);
})();
