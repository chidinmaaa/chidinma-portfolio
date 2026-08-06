// Add a new project by adding an object to the relevant category's `items` array.
// status: "cleared" | "in-progress" | "archived"
// slug is used for the detail page URL: project.html?p=<slug>
// source is optional — omit it (or leave "") for private repos; the SOURCE link is hidden.
// links: optional extras (demos, papers, videos) shown on the detail page.
const PROJECT_CATEGORIES = [
  {
    name: "AI & ML",
    items: [
      {
        slug: "healthcare-ai-assistant",
        level: "1",
        title: "Healthcare AI Assistant",
        status: "archived",
        blurb: "Generative AI health companion for West Africa — regional datasets and custom tools delivering localised medical insights. Retired R&D testbed.",
        details: `
          <p>A generative AI healthcare assistant leveraging regional datasets and custom
          tools to deliver localised medical insights and improve healthcare accessibility
          in West Africa — paired with a physical clinic flow so a user could go from
          "I don't feel well" to a triaged, bookable, in-person visit in one flow.</p>
          <p>Built the full frontend experience — an intuitive, accessible web interface —
          using JavaScript and HTML, integrated with a FastAPI backend and the OpenAI API.</p>
          <p>Status: archived. It served as the R&amp;D testbed that laid the groundwork for
          <a href="https://livesinmotion.co.uk" target="_blank" rel="noopener">Lives In Motion</a>'s
          AI companion products.</p>
        `,
        tags: ["Python", "JavaScript", "FastAPI", "OpenAI API"],
        source: "",
        links: []
      },
      {
        slug: "clearcarat",
        level: "2",
        title: "ClearCarat",
        status: "in-progress",
        blurb: "AI-powered diamond pricing — ML models trained on diamond characteristics (the 4Cs) to predict fair market prices, backed by original pricing research.",
        details: `
          <p>ClearCarat uses machine learning — trained on diamond characteristics like
          carat, cut, clarity and colour — to predict fair market prices, aiming to bring
          more transparency to diamond pricing.</p>
          <p>Includes original research into predictive pricing models for diamonds, and a
          documented, reproducible data pipeline from raw pricing data to a trained model.</p>
        `,
        tags: ["Python", "Machine Learning", "CatBoost"],
        source: "",
        links: [
          { label: "LAB NOTES BLOG", url: "https://chidinmaaa.github.io/" }
        ]
      },
      {
        slug: "sign-bridge",
        level: "3",
        title: "Sign Bridge",
        status: "cleared",
        blurb: "Multi-modal British Sign Language converter — 1st place at UCL's Minerva's Hack, the inaugural all-female group hackathon.",
        details: `
          <p>A multimodal British Sign Language (BSL) converter prototype, built in 24 hours
          and taking 1st place at UCL's Minerva's Hack — the university's inaugural
          all-female group hackathon.</p>
          <p>Designed and implemented a custom speech-to-animation module to support
          real-time translation between speech and BSL.</p>
        `,
        tags: ["Python", "NumPy", "OpenCV", "Hugging Face"],
        source: "https://github.com/chidinmaaa/Minerva-s-Hack",
        links: []
      },
      {
        slug: "newspod",
        level: "4",
        title: "NewsPod",
        status: "cleared",
        blurb: "Personalised text-to-speech news podcast generator — 3rd place at a Neuphonic x Google hackathon.",
        details: `
          <p>A personalised, TTS-based news podcast generator that took 3rd place at a
          Neuphonic x Google hackathon, turning a user's news preferences into a
          ready-to-listen audio briefing.</p>
        `,
        tags: ["Python", "HTML", "Neuphonic API"],
        source: "https://github.com/chidinmaaa/neuphonic-hack",
        links: []
      }
    ]
  },
  {
    name: "ML & Robotics",
    items: [
      {
        slug: "stylized-trajectory-planning-mppi",
        level: "1",
        title: "Stylized Trajectory Planning with MPPI",
        status: "cleared",
        blurb: "MEng dissertation on Model Predictive Path Integral control — a novel probabilistic method for stylized trajectory planning with obstacle avoidance.",
        details: `
          <p>MEng dissertation in Machine Learning and Robotics, focused on Model Predictive
          Path Integral (MPPI) control. Standard MPPI struggles to reliably enforce
          constraints because it's a sampling-based method — this project proposes a novel
          probabilistic approach for stylized trajectory planning with obstacle avoidance
          instead.</p>
          <p>Combines Gaussian Process and Bayesian Neural Network surrogates to model
          probabilistic constraints, improving MPPI's compatibility with safety-critical
          applications.</p>
        `,
        tags: ["Python", "JAX", "GPJAX", "MuJoCo"],
        source: "https://github.com/tombelv/sbmpc/tree/chidinma",
        links: []
      },
      {
        slug: "bc-mppi",
        level: "2",
        title: "BC-MPPI",
        status: "cleared",
        blurb: "Published version of the dissertation work — a probabilistic constraint layer for safe MPPI, presented at ECAI 2025 in Bologna.",
        details: `
          <p>Ezeji, O., Ziegltrum, M., Turrisi, G., Belvedere, T. and Modugno, V. (2025).
          <em>"BC-MPPI: A Probabilistic Constraint Layer for Safe Model-Predictive
          Path-Integral Control."</em> In Workshop on Agents and Robots for reliable
          Engineered Autonomy (pp. 131-143). Cham: Springer Nature Switzerland.</p>
          <p>Presented at the 25th European Conference on Artificial Intelligence (ECAI) in
          Bologna, 2025.</p>
        `,
        tags: ["Python", "JAX", "Research"],
        source: "https://github.com/tombelv/sbmpc/tree/chidinma",
        links: []
      },
      {
        slug: "sample-based-estimation",
        level: "3",
        title: "Sample Based Estimation",
        status: "in-progress",
        blurb: "Ongoing lab research extending the MPPI work — concurrent system identification and control running simultaneously across different robot platforms.",
        details: `
          <p>Follow-on research from the BC-MPPI dissertation: an MPPI-based controller that
          performs system identification and control concurrently, rather than treating them
          as separate offline/online stages, so the controller adapts its internal dynamics
          model on the fly as it interacts with different robot platforms.</p>
          <p>Currently mid-run — active work is on warp dynamics and correcting
          seed/warm-start behavior for the sampling distribution.</p>
        `,
        tags: ["Python", "MPPI", "Sys-ID", "Robotics"],
        source: "",
        links: []
      }
    ]
  },
  {
    name: "Front-End Projects",
    items: []
  },
  {
    name: "VR Projects & Research",
    items: [
      {
        slug: "rocketbox",
        level: "1",
        title: "MoveBox for Microsoft Rocketbox",
        status: "archived",
        blurb: "UCL research internship — a C# interface integrating Microsoft's Rocketbox avatar library with the VECG group's social VR platform, Ubiq.",
        details: `
          <p>Research internship with UCL's Virtual Environments &amp; Computer Graphics
          (VECG) group. Developed a C# interface integrating Microsoft's
          <a href="https://github.com/microsoft/Microsoft-Rocketbox" target="_blank" rel="noopener">Rocketbox</a>
          avatar library with the group's social VR platform, Ubiq — enhancing the realism
          and functionality of the platform.</p>
          <p>Addressed complex networking and animation challenges as part of MoveBox, the
          group's motion-capture toolbox for animating Rocketbox avatars, presented at
          IEEE AIVR.</p>
        `,
        tags: ["C#", "Unity", "Ubiq"],
        source: "",
        links: [
          { label: "IEEE AIVR PRESENTATION", url: "https://www.youtube.com/watch?v=7CEYObKjsEI" },
          { label: "RESEARCH PAPER", url: "https://www.microsoft.com/en-us/research/publication/movebox-democratizing-mocap-for-the-microsoft-rocketbox-avatar-library/" }
        ]
      },
      {
        slug: "virtual-maze",
        level: "2",
        title: "Virtual Maze",
        status: "cleared",
        blurb: "COMP0031 group research comparing haptic feedback and spatial audio in collaborative mixed reality, built in Unity with Ubiq.",
        details: `
          <p>Third-year UCL group research project (COMP0031, Group 9) comparing haptic
          feedback and spatial audio in collaborative mixed reality, built as a Unity
          project using Ubiq for networking and ROVR Wizdish hardware for haptics.</p>
          <p>Ran user studies with internal data logging and statistical analysis of
          participant traversal data to compare the two feedback conditions.</p>
        `,
        tags: ["Unity", "C#", "Ubiq", "Research"],
        source: "https://github.com/Tchowds/Group_Research_Methods_Maze",
        links: []
      },
      {
        slug: "avatar-factory",
        level: "3",
        title: "Avatar Factory",
        status: "cleared",
        blurb: "'Fusion Foundry' — a collaborative VR avatar creation platform built for COMP0113, requiring two players to design a shared avatar together.",
        details: `
          <p>COMP0113 coursework (Group 13): a collaborative avatar creation platform for
          VR called "Fusion Foundry" — a factory-like setting where players progress
          through five rooms (HQ, Body Lab, Style Station, Accessory Studio, Voting
          Station), completing tasks together to design and then inhabit a shared avatar.</p>
          <p>Implemented a forced-collaboration model throughout, so the experience can only
          be completed by two or more players working together.</p>
        `,
        tags: ["Unity", "C#", "VR"],
        source: "https://github.com/chidinmaaa/COMP0113-CW1",
        links: []
      }
    ]
  },
  {
    name: "Video Games",
    comingSoon: true,
    items: []
  }
];
