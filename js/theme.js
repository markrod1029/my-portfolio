function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", nextTheme);

  const toggle = document.querySelector(".theme-toggle");
  if (!(toggle instanceof HTMLButtonElement)) {
    return;
  }

  const isDark = nextTheme === "dark";
  toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");

  const icon = toggle.querySelector("i");
  if (icon) {
    icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
  }

  const label = toggle.querySelector(".theme-toggle-label");
  if (label) {
    label.textContent = isDark ? "Light" : "Dark";
  }

  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) {
    themeColor.setAttribute("content", isDark ? "#10141c" : "#f6f3ec");
  }
}

function initThemeToggle() {
  const toggle = document.querySelector(".theme-toggle");
  const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  applyTheme(current);

  if (!(toggle instanceof HTMLButtonElement)) {
    return;
  }

  toggle.addEventListener("click", function () {
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

initThemeToggle();
