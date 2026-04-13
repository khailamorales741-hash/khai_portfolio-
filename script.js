function getPreferredTheme() {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
}

function wireThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = document.documentElement.dataset.theme || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  });
}

function setYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

function wireAvatarFallback() {
  const img = document.getElementById("profilePhoto");
  if (!img) return;
  const avatar = img.closest(".avatar");
  if (!avatar) return;

  const initialSrc = img.currentSrc || img.getAttribute("src") || "";
  const originalSrc = img.getAttribute("src") || "";
  const placeholderSrc = "./assets/profile.svg";

  img.addEventListener("error", () => {
    avatar.classList.add("avatar--fallback");
    const currentSrc = img.getAttribute("src") || "";
    if (currentSrc === originalSrc || currentSrc === initialSrc) {
      img.setAttribute("src", placeholderSrc);
    }
  });

  img.addEventListener("load", () => {
    avatar.classList.remove("avatar--fallback");
  });
}

applyTheme(getPreferredTheme());
wireThemeToggle();
setYear();
wireAvatarFallback();

