// ---------- Boot sequence ----------

function runBootSequence() {
  const bootScreen = document.getElementById("boot-screen");
  const app = document.getElementById("app");

  // Only index.html has the boot screen — no-op elsewhere.
  if (!bootScreen || !app) return;

  function reveal() {
    bootScreen.classList.add("hidden");
    app.classList.remove("hidden");
    window.removeEventListener("keydown", reveal);
    window.removeEventListener("click", reveal);
  }

  // Respect users who'd rather skip the animation, and only show it once per visit.
  const skip = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const alreadyBooted = sessionStorage.getItem("chidinma-booted") === "1";

  if (skip || alreadyBooted) {
    reveal();
    return;
  }
  sessionStorage.setItem("chidinma-booted", "1");

  window.addEventListener("keydown", reveal);
  window.addEventListener("click", reveal);
  setTimeout(reveal, 6000); // auto-continue if no input
}

// ---------- Project category rendering ----------

const STATUS_LABEL = {
  cleared: "CLEARED",
  "in-progress": "IN PROGRESS"
};

function renderCard(p) {
  return `
    <article class="level-card">
      <div class="level-card-head">
        <span class="level-status status-${p.status}">${STATUS_LABEL[p.status]}</span>
      </div>
      <h3 class="level-title">${p.title}</h3>
      <p class="level-blurb">${p.blurb}</p>
      <div class="level-tags">
        ${p.tags.map(t => `<span class="level-chip">${t}</span>`).join("")}
      </div>
      <div class="level-card-actions">
        <a class="level-link" href="project.html?p=${encodeURIComponent(p.slug)}">VIEW DETAILS &#8250;</a>
        ${p.source
          ? `<a class="level-source" href="${p.source}" target="_blank" rel="noopener">SOURCE &#8599;</a>`
          : `<span class="level-source level-source-private">PRIVATE REPO</span>`}
      </div>
    </article>
  `;
}

function worldStatusSummary(cat) {
  if (cat.comingSoon || !cat.items.length) return "COMING SOON";
  const n = cat.items.length;
  return `${n} LEVEL${n === 1 ? "" : "S"}`;
}

function renderWorldGrid() {
  const container = document.getElementById("world-grid");
  if (!container || typeof PROJECT_CATEGORIES === "undefined") return;

  container.innerHTML = PROJECT_CATEGORIES.map(cat => `
    <a class="world-card${cat.items.length ? "" : " world-card-empty"}" href="${cat.items.length ? `world.html?w=${encodeURIComponent(cat.slug)}` : "#"}">
      <div class="world-icon-frame">
        <img src="${cat.icon}" alt="" class="world-icon-img">
      </div>
      <h3 class="world-card-title">${cat.name}</h3>
      <p class="world-card-blurb">${cat.blurb}</p>
      <span class="world-card-meta">${worldStatusSummary(cat)}</span>
    </a>
  `).join("");
}

// ---------- Coin counter (worlds + levels explored, persisted across visits) ----------

function getVisitedSet(key) {
  try {
    return new Set(JSON.parse(localStorage.getItem(key) || "[]"));
  } catch (e) {
    return new Set();
  }
}

function saveVisitedSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

function updateCoinDisplay() {
  const el = document.getElementById("coin-count");
  if (!el) return;
  const worlds = getVisitedSet("chidinma-worlds-visited");
  const levels = getVisitedSet("chidinma-levels-visited");
  el.textContent = String(worlds.size + levels.size).padStart(2, "0");
}

function popCoinCounter() {
  const el = document.getElementById("coin-count");
  if (!el) return;
  el.classList.remove("coin-pop");
  // Force reflow so the animation can retrigger on rapid navigations.
  void el.offsetWidth;
  el.classList.add("coin-pop");
  playCoinSound();
}

// Call when a world page is visited; only pops for a genuinely new discovery.
function trackWorldVisit(slug) {
  const worlds = getVisitedSet("chidinma-worlds-visited");
  const isNew = !worlds.has(slug);
  worlds.add(slug);
  saveVisitedSet("chidinma-worlds-visited", worlds);
  updateCoinDisplay();
  if (isNew) popCoinCounter();
}

// Call when a level (project) page is visited; only pops for a new discovery.
function trackLevelVisit(slug) {
  const levels = getVisitedSet("chidinma-levels-visited");
  const isNew = !levels.has(slug);
  levels.add(slug);
  saveVisitedSet("chidinma-levels-visited", levels);
  updateCoinDisplay();
  if (isNew) popCoinCounter();
}

// ---------- Sound effects (generated with the Web Audio API, no audio files) ----------

let audioCtx = null;

function getAudioCtx() {
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return null;
  if (!audioCtx) audioCtx = new Ctx();
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function playTone(freq, duration, delay, gainValue) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const start = ctx.currentTime + (delay || 0);
  gain.gain.setValueAtTime(gainValue, start);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.start(start);
  osc.stop(start + duration);
}

function playClickSound() {
  playTone(720, 0.06, 0, 0.05);
}

function playCoinSound() {
  playTone(988, 0.09, 0, 0.07);    // B5
  playTone(1319, 0.14, 0.08, 0.07); // E6 — classic coin "bling"
}

const SFX_CLICK_SELECTOR =
  "a.btn, a.level-link, a.level-source, a.world-card, .footer-links a, .main-nav a, .logo, .back-link";

function initClickSounds() {
  document.addEventListener("click", (e) => {
    if (e.target.closest(SFX_CLICK_SELECTOR)) playClickSound();
  });
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
  renderWorldGrid();
  updateCoinDisplay();
  initKonami();
  initClickSounds();
  runBootSequence();
});
