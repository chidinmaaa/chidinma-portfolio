const STATUS_LABEL_P = {
  cleared: "CLEARED",
  "in-progress": "IN PROGRESS",
  archived: "ARCHIVED"
};

function renderProjectDetail() {
  const container = document.getElementById("project-detail");
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("p");
  const project = typeof PROJECTS !== "undefined" ? PROJECTS.find(p => p.slug === slug) : null;

  if (!project) {
    container.innerHTML = `
      <div class="not-found">
        <h1 class="glitch" data-text="404: LEVEL NOT FOUND">404: LEVEL NOT FOUND</h1>
        <p>That project doesn't exist yet. <a href="index.html#projects">Head back to the project select screen.</a></p>
      </div>
    `;
    document.title = "404 // CHIDINMA.EXE";
    return;
  }

  document.title = `${project.title} // CHIDINMA.EXE`;

  container.innerHTML = `
    <p class="level-num">LEVEL ${project.level}</p>
    <h1 class="project-title">${project.title}</h1>
    <span class="level-status status-${project.status}">${STATUS_LABEL_P[project.status]}</span>
    <div class="level-tags project-detail-tags">
      ${project.tags.map(t => `<span class="level-chip">${t}</span>`).join("")}
    </div>
    <div class="project-detail-body">${project.details}</div>
    <div class="project-detail-links">
      <a class="btn btn-primary" href="${project.source}" target="_blank" rel="noopener">VIEW SOURCE &#8599;</a>
      ${(project.links || []).map(l => `<a class="btn btn-ghost" href="${l.url}" target="_blank" rel="noopener">${l.label} &#8599;</a>`).join("")}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProjectDetail();
});
