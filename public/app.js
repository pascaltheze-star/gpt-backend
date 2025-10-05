const spaces = [
  {
    id: "story-crafter",
    name: "Story Crafter",
    author: "Studio Narrativa",
    description:
      "Génère des pitchs narratifs complets avec arcs scénaristiques, personnages et inspirations visuelles.",
    tags: ["génération", "creative", "marketing"],
    status: "running",
    runs: 4872,
    lastUpdate: "Il y a 2 h",
    accent: "linear-gradient(135deg, #c084fc, #8b5cf6)",
    avatar: "linear-gradient(135deg, rgba(255,255,255,.35), rgba(192,132,252,.25))"
  },
  {
    id: "sales-pilot",
    name: "Sales Pilot Coach",
    author: "Ops Squad",
    description:
      "Assistant de coaching commercial avec scripts, relances automatiques et scoring prédictif des prospects.",
    tags: ["analyse", "outils"],
    status: "running",
    runs: 3561,
    lastUpdate: "Il y a 6 h",
    accent: "linear-gradient(135deg, #34d399, #10b981)",
    avatar: "linear-gradient(135deg, rgba(16,185,129,.35), rgba(5,150,105,.25))"
  },
  {
    id: "data-scout",
    name: "Data Scout",
    author: "DataForge",
    description:
      "Analyse exploratoire automatisée des datasets avec génération de graphiques et fiches insights.",
    tags: ["analyse", "automation"],
    status: "running",
    runs: 942,
    lastUpdate: "Il y a 1 j",
    accent: "linear-gradient(135deg, #60a5fa, #1d4ed8)",
    avatar: "linear-gradient(135deg, rgba(96,165,250,.35), rgba(37,99,235,.3))"
  },
  {
    id: "ux-lab",
    name: "UX Lab Companion",
    author: "Product Guild",
    description:
      "Synthétise les retours utilisateurs, détecte les irritants majeurs et suggère des expériences alternatives.",
    tags: ["analyse", "génération"],
    status: "paused",
    runs: 1220,
    lastUpdate: "Il y a 3 j",
    accent: "linear-gradient(135deg, #f472b6, #ec4899)",
    avatar: "linear-gradient(135deg, rgba(244,114,182,.35), rgba(236,72,153,.3))"
  },
  {
    id: "legal-desk",
    name: "Legal Desk",
    author: "Cabinet Atlas",
    description:
      "Génère des contrats standards, vérifie la conformité RGPD et explique les clauses sensibles.",
    tags: ["outils", "génération"],
    status: "running",
    runs: 1811,
    lastUpdate: "Il y a 5 h",
    accent: "linear-gradient(135deg, #fbbf24, #f97316)",
    avatar: "linear-gradient(135deg, rgba(251,191,36,.35), rgba(249,115,22,.3))"
  },
  {
    id: "growth-hacker",
    name: "Growth Hacker",
    author: "LaunchLab",
    description:
      "Crée des plans de lancement, des campagnes multi-canal et des tableaux de bord KPI en un clic.",
    tags: ["génération", "automation"],
    status: "running",
    runs: 5190,
    lastUpdate: "Il y a 30 min",
    accent: "linear-gradient(135deg, #2dd4bf, #0ea5e9)",
    avatar: "linear-gradient(135deg, rgba(45,212,191,.35), rgba(14,165,233,.28))"
  },
  {
    id: "atelier-video",
    name: "Atelier Vidéo",
    author: "Motion Craft",
    description:
      "Transforme un script en storyboard, propose des plans caméra et exporte un brief pour l'équipe vidéo.",
    tags: ["génération", "creative"],
    status: "running",
    runs: 2286,
    lastUpdate: "Il y a 4 h",
    accent: "linear-gradient(135deg, #f97316, #fb7185)",
    avatar: "linear-gradient(135deg, rgba(249,115,22,.35), rgba(251,113,133,.3))"
  },
  {
    id: "insight-reporter",
    name: "Insight Reporter",
    author: "Pulse Analytics",
    description:
      "Agrège les signaux du marché, surveille les concurrents et rédige un rapport actionnable chaque matin.",
    tags: ["analyse", "automation"],
    status: "paused",
    runs: 764,
    lastUpdate: "Il y a 5 j",
    accent: "linear-gradient(135deg, #a855f7, #6366f1)",
    avatar: "linear-gradient(135deg, rgba(168,85,247,.35), rgba(99,102,241,.3))"
  },
  {
    id: "omnicanal",
    name: "Omnicanal Studio",
    author: "CX Factory",
    description:
      "Planifie les campagnes emailing, SMS et push notifications avec segmentation dynamique des audiences.",
    tags: ["automation", "outils"],
    status: "running",
    runs: 3187,
    lastUpdate: "Il y a 8 h",
    accent: "linear-gradient(135deg, #facc15, #f59e0b)",
    avatar: "linear-gradient(135deg, rgba(250,204,21,.35), rgba(245,158,11,.3))"
  },
  {
    id: "lab-ia",
    name: "Lab IA Interne",
    author: "R&D Collective",
    description:
      "Workbench interne pour orchestrer, versionner et tester les prompts maison avec un suivi qualité.",
    tags: ["outils"],
    status: "running",
    runs: 158,
    lastUpdate: "Il y a 2 j",
    accent: "linear-gradient(135deg, #38bdf8, #6366f1)",
    avatar: "linear-gradient(135deg, rgba(59,130,246,.35), rgba(99,102,241,.3))"
  }
];

const grid = document.getElementById("spaceGrid");
const template = document.getElementById("spaceCardTemplate");
const searchInput = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const sortSelect = document.getElementById("sortSelect");
const statusFilters = document.querySelectorAll("#statusFilters .toggle");
const countLabel = document.getElementById("spaceCount");

let selectedCategory = "all";
let selectedStatus = "all";
let searchTerm = "";

function formatRuns(value) {
  return value.toLocaleString("fr-FR");
}

function renderSpaces(list) {
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<p class="empty">Aucun assistant ne correspond à votre recherche pour le moment.</p>`;
    countLabel.textContent = "0 assistant";
    return;
  }

  const fragment = document.createDocumentFragment();

  list.forEach((space) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".card");
    card.style.backgroundImage = space.accent;

    const status = node.querySelector(".card__status");
    if (space.status === "paused") {
      status.classList.add("paused");
      status.querySelector(".status-label").textContent = "En pause";
    } else {
      status.querySelector(".status-label").textContent = "En ligne";
    }

    node.querySelector(".avatar").style.backgroundImage = space.avatar;
    node.querySelector(".card__title").textContent = space.name;
    node.querySelector(".card__author").textContent = `par ${space.author}`;
    node.querySelector(".card__description").textContent = space.description;

    const tagsContainer = node.querySelector(".card__tags");
    space.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      tagsContainer.appendChild(span);
    });

    node.querySelector(".card__stat-value").textContent = formatRuns(space.runs);
    const stats = node.querySelectorAll(".card__stat-value");
    stats[0].textContent = space.lastUpdate;
    stats[1].textContent = formatRuns(space.runs);

    fragment.appendChild(node);
  });

  countLabel.textContent =
    list.length > 1 ? `${list.length} assistants` : "1 assistant";
  grid.appendChild(fragment);
}

function filterSpaces() {
  const filtered = spaces
    .filter((space) => {
      const matchesCategory =
        selectedCategory === "all" || space.tags.includes(selectedCategory);

      const matchesStatus =
        selectedStatus === "all" || space.status === selectedStatus;

      const matchesSearch =
        !searchTerm ||
        [space.name, space.description, space.author, space.tags.join(" ")]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortSelect.value) {
        case "recent":
          return spaces.indexOf(a) - spaces.indexOf(b);
        case "alphabetical":
          return a.name.localeCompare(b.name);
        default:
          return b.runs - a.runs;
      }
    });

  renderSpaces(filtered);
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    selectedCategory = chip.dataset.filter;
    filterSpaces();
  });
});

statusFilters.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    statusFilters.forEach((t) => t.classList.remove("active"));
    toggle.classList.add("active");
    selectedStatus = toggle.dataset.status;
    filterSpaces();
  });
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  filterSpaces();
});

sortSelect.addEventListener("change", filterSpaces);

// Initial render
chips[0].classList.add("active");
filterSpaces();
