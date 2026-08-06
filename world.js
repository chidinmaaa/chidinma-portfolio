function findWorld(slug) {
  if (typeof PROJECT_CATEGORIES === "undefined") return null;
  return PROJECT_CATEGORIES.find(c => c.slug === slug) || null;
}

function renderWorldDetail() {
  const container = document.getElementById("world-detail");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("w");
  const world = findWorld(slug);

  if (!world) {
    container.innerHTML = `
      <div class="not-found">
        <h1 class="glitch" data-text="404: WORLD NOT FOUND">404: WORLD NOT FOUND</h1>
        <p>That world doesn't exist yet. <a href="index.html#projects">Head back to the world select screen.</a></p>
      </div>
    `;
    document.title = "404 // CHIDINMA.EXE";
    return;
  }

  document.title = `${world.name} // CHIDINMA.EXE`;

  if (typeof trackWorldVisit === "function") trackWorldVisit(world.slug);

  container.innerHTML = `
    <div class="world-detail-head">
      <div class="world-icon-frame world-icon-frame-large">
        <img src="${world.icon}" alt="" class="world-icon-img">
      </div>
      <div>
        <h1 class="project-title">${world.name}</h1>
        <p class="world-detail-blurb">${world.blurb}</p>
      </div>
    </div>
    ${
      world.items.length
        ? `<div class="level-grid">${world.items.map(p => renderCard(p)).join("")}</div>`
        : `<p class="category-empty">${world.comingSoon ? "COMING SOON..." : "MORE ON THE WAY."}</p>`
    }
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderWorldDetail();
});
