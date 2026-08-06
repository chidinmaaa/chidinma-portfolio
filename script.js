// ---------- Boot sequence ----------

const BOOT_LINES = [
  "CHIDINMA-OS v1.0.0",
  "COPYRIGHT 2026 CHIDINMA SYSTEMS",
  "",
  "RUNNING POST... OK",
  "LOADING PROJECTS.DB... OK",
  "LOADING STATS.SYS... OK",
  "CALIBRATING MPPI CONTROLLERS... OK",
  "",
  "PRESS ANY KEY TO CONTINUE_"
];

function runBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const bootText = document.getElementById("boot-text");
  const app = document.getElementById("app");

  // Respect users who'd rather skip the animation.
  const skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function reveal() {
    bootScreen.classList.add("hidden");
    app.classList.remove("hidden");
    window.removeEventListener("keydown", reveal);
    window.removeEventListener("click", reveal);
  }

  if (skip) {
    reveal();
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;
  let display = "";

  function typeNext() {
    if (lineIndex >= BOOT_LINES.length) {
      window.addEventListener("keydown", reveal);
      window.addEventListener("click", reveal);
      setTimeout(reveal, 4000); // auto-continue if no input
      return;
    }
    const line = BOOT_LINES[lineIndex];
    if (charIndex <= line.length) {
      display = BOOT_LINES.slice(0, lineIndex).join("\n") +
        (lineIndex > 0 ? "\n" : "") + line.slice(0, charIndex);
      bootText.textContent = display;
      charIndex++;
      setTimeout(typeNext, line === "" ? 40 : 18);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, 120);
    }
  }

  typeNext();
}

// ---------- Project category rendering ----------

const STATUS_LABEL = {
  cleared: "CLEARED",
  "in-progress": "IN PROGRESS",
  archived: "ARCHIVED"
};

function renderCard(p, world) {
  return `
    <article class="level-card">
      <div class="level-card-head">
        <span class="level-num">LEVEL ${world}-${p.level}</span>
        <span class="level-status status-${p.status}">${STATUS_LABEL[p.status]}</span>
      </div>
      <h3 class="level-title">${p.title}</h3>
      <p class="level-blurb">${p.blurb}</p>
      <div class="level-tags">
        ${p.tags.map(t => `<span class="level-chip">${t}</span>`).join("")}
      </div>
      <div class="level-card-actions">
        <a class="level-link" href="project.html?p=${encodeURIComponent(p.slug)}">VIEW DETAILS &#8250;</a>
        ${p.source ? `<a class="level-source" href="${p.source}" target="_blank" rel="noopener">SOURCE &#8599;</a>` : ""}
      </div>
    </article>
  `;
}

function renderCategories() {
  const container = document.getElementById("project-categories");
  if (!container || typeof PROJECT_CATEGORIES === "undefined") return;

  container.innerHTML = PROJECT_CATEGORIES.map((cat, i) => {
    const world = i + 1;
    return `
    <div class="category-block">
      <h3 class="category-title">&#9656; WORLD ${world}: ${cat.name}</h3>
      ${
        cat.items.length
          ? `<div class="level-grid">${cat.items.map(p => renderCard(p, world)).join("")}</div>`
          : `<p class="category-empty">${cat.comingSoon ? "COMING SOON..." : "MORE ON THE WAY."}</p>`
      }
    </div>
  `;
  }).join("");
}

// ---------- Coin counter (session visit count, just for flavor) ----------

function initCoinCounter() {
  const el = document.getElementById("coin-count");
  if (!el) return;
  const key = "chidinma-site-visits";
  const count = Number(sessionStorage.getItem(key) || "0") + 1;
  sessionStorage.setItem(key, String(count));
  el.textContent = String(count).padStart(2, "0");
}

// ---------- Konami code easter egg ----------

function initKonami() {
  const code = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  let pos = 0;
  window.addEventListener("keydown", (e) => {
    pos = e.key === code[pos] ? pos + 1 : 0;
    if (pos === code.length) {
      pos = 0;
      document.body.style.filter = "invert(1) hue-rotate(180deg)";
      setTimeout(() => { document.body.style.filter = ""; }, 1200);
    }
  });
}

// ---------- Init ----------

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderCategories();
  initCoinCounter();
  initKonami();
  runBootSequence();
});
