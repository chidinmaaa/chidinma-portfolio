const STATUS_LABEL_P = {
  cleared: "CLEARED",
  "in-progress": "IN PROGRESS"
};

function findProject(slug) {
  if (typeof PROJECT_CATEGORIES === "undefined") return null;
  for (const cat of PROJECT_CATEGORIES) {
    const found = cat.items.find(p => p.slug === slug);
    if (found) return { project: found, worldSlug: cat.slug, worldName: cat.name };
  }
  return null;
}

function renderProjectDetail() {
  const container = document.getElementById("project-detail");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("p");
  const found = findProject(slug);

  if (!found) {
    container.innerHTML = `
      <div class="not-found">
        <h1 class="glitch" data-text="404: LEVEL NOT FOUND">404: LEVEL NOT FOUND</h1>
        <p>That project doesn't exist yet. <a href="index.html#projects">Head back to the project select screen.</a></p>
      </div>
    `;
    document.title = "404 // CHIDINMA.EXE";
    return;
  }

  const { project, worldSlug, worldName } = found;
  document.title = `${project.title} // CHIDINMA.EXE`;

  if (typeof trackLevelVisit === "function") trackLevelVisit(project.slug);

  const backLink = document.querySelector(".back-link");
  if (backLink) {
    backLink.href = `world.html?w=${encodeURIComponent(worldSlug)}`;
    backLink.textContent = `‹ BACK TO ${worldName.toUpperCase()}`;
  }

  container.innerHTML = `
    <p class="level-num">${worldName}</p>
    <h1 class="project-title">${project.title}</h1>
    <span class="level-status status-${project.status}">${STATUS_LABEL_P[project.status]}</span>
    <div class="level-tags project-detail-tags">
      ${project.tags.map(t => `<span class="level-chip">${t}</span>`).join("")}
    </div>
    <div class="project-detail-body">${project.details}</div>
    <div class="project-detail-links">
      ${project.source
        ? `<a class="btn btn-primary" href="${project.source}" target="_blank" rel="noopener">VIEW SOURCE &#8599;</a>`
        : `<span class="btn btn-ghost btn-disabled">PRIVATE REPO</span>`}
      ${(project.links || []).map(l => `<a class="btn btn-ghost" href="${l.url}" target="_blank" rel="noopener">${l.label} &#8599;</a>`).join("")}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProjectDetail();
});
