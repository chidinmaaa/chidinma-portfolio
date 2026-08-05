// Add a new project by adding an object to this array.
// status: "cleared" | "in-progress" | "archived"
// slug is used for the detail page URL: project.html?p=<slug>
// links: optional extras (demo videos, write-ups, live sites) shown on the detail page.
const PROJECTS = [
  {
    slug: "jax-mppi",
    level: "01",
    title: "jax-mppi",
    status: "cleared",
    blurb: "Model Predictive Path Integral control implemented in JAX, with a standard MPPI and an adaptive cross-entropy variant (CEMPPI), tested on the classic pendulum swing-up task.",
    details: `
      <p>Two implementations of Model Predictive Path Integral (MPPI) control, built on JAX so the
      model rollout and sampling steps can be vectorized and JIT-compiled for speed. The
      <a href="https://www.gymlibrary.dev/environments/classic_control/pendulum/" target="_blank" rel="noopener">pendulum swing-up</a>
      environment from OpenAI Gym is used as the test task.</p>
      <p>The first is a standard MPPI following Williams et al. 2017. The second is a cross-entropy
      variant (CEMPPI) based on the MPOPIS paper by Asmar et al. 2022, which uses adaptive importance
      sampling to iteratively update the control sampling distribution — often hitting higher
      performance with fewer samples than standard MPPI.</p>
      <p>JAX's <code>lax.scan</code> replaces the usual for-loop over system dynamics, which is what
      makes sampling-based MPC fast enough to run interactively here.</p>
    `,
    tags: ["JAX", "MPC", "Control"],
    source: "https://github.com/chidinmaaa/ml-robotics",
    links: []
  },
  {
    slug: "concurrent-mppi",
    level: "02",
    title: "concurrent-mppi",
    status: "in-progress",
    blurb: "Concurrent MPPI implementation running system identification and control simultaneously across different robot platforms.",
    details: `
      <p>An MPPI-based controller that runs system identification and control concurrently, rather
      than treating them as separate offline/online stages. The goal is a controller that adapts its
      internal dynamics model on the fly as it interacts with different robot platforms.</p>
      <p>Currently mid-run — active work is on warp dynamics and correcting seed/warm-start behavior
      for the sampling distribution.</p>
    `,
    tags: ["MPPI", "Sys-ID", "Robotics"],
    source: "https://github.com/chidinmaaa/ml-robotics",
    links: []
  },
  {
    slug: "easylink-amara",
    level: "03",
    title: "EasyLink / Amara",
    status: "archived",
    blurb: "R&D testbed for an AI health companion for Nigeria — hybrid digital assistant + physical clinic flow. Retired after laying the groundwork for later products.",
    details: `
      <p>EasyLink (trading as Reasoning Cloud Limited) paired a digital AI health assistant with a
      physical clinic presence in Nigeria, so a user could go from "I don't feel well" to a triaged,
      bookable, in-person visit in one flow.</p>
      <p>Status: archived. It served as the R&amp;D testbed that laid the groundwork for
      <a href="https://livesinmotion.co.uk" target="_blank" rel="noopener">Lives In Motion</a>'s AI
      companion products and is preserved as a record of the system design, integrations, and product
      iteration that went into it.</p>
    `,
    tags: ["FastAPI", "AI", "Voice"],
    source: "https://github.com/chidinmaaa",
    links: []
  }
];
