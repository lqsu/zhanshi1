const projects = [
  { id: "project01", title: "惠普28A", url: "https://znjc025.com", images: ["1.png", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] },
  { id: "project02", title: "网站02", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp", "4.webp"] },
  { id: "project03", title: "网站03", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project04", title: "网站04", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project05", title: "网站05", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project06", title: "网站06", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
];

const container = document.getElementById("projectList");

function createFixedSideNav() {
  const sideNav = document.createElement("div");
  sideNav.id = "sideFixedNav";
  sideNav.style.position = "fixed";
  sideNav.style.top = "50%";
  sideNav.style.left = "20px";
  sideNav.style.transform = "translateY(-50%)";
  sideNav.style.background = "#fff";
  sideNav.style.padding = "20px 16px";
  sideNav.style.borderRadius = "12px";
  sideNav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
  sideNav.style.zIndex = "999";
  sideNav.style.minWidth = "140px";
  sideNav.style.display = "flex";
  sideNav.style.flexDirection = "column";
  sideNav.style.gap = "10px";

  sideNav.innerHTML = `<h4 style="margin:0 0 12px 0; font-size:16px; text-align:center; color:#333;">展示目录</h4>`;

  projects.forEach((p, idx) => {
    const a = document.createElement("a");
    a.href = `#${p.id}`;
    a.style.padding = "8px 12px";
    a.style.borderRadius = "8px";
    a.style.textDecoration = "none";
    a.style.color = "#555";
    a.style.fontSize = "14px";
    a.style.transition = "all 0.2s";
    a.style.background = "#f5f5f5";
    a.innerText = `${idx + 1}. ${p.title}`;

    a.onmouseover = () => {
      a.style.background = "#222";
      a.style.color = "#fff";
    };
    a.onmouseout = () => {
      a.style.background = "#f5f5f5";
      a.style.color = "#555";
    };

    sideNav.appendChild(a);
  });

  const media = window.matchMedia("(max-width: 768px)");
  function checkScreen() {
    sideNav.style.display = media.matches ? "none" : "flex";
  }
  media.addEventListener("change", checkScreen);
  checkScreen();

  document.body.appendChild(sideNav);
}
createFixedSideNav();

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getProjectIntro(project) {
  const count = Array.isArray(project.images) ? project.images.length : 0;
  return `包含 ${count} 张商品图片。`;
}

function renderSlides(project, wrapper) {
  const imageList = Array.isArray(project.images) ? project.images : [];
  imageList.forEach((fileName) => {
    const safeFileName = escapeHtml(fileName);
    const src = `images/${project.id}/${safeFileName}`;
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `
      <a class="screenshot-link" href="${src}" data-fancybox="${escapeHtml(project.id)}">
        <img src="${src}" loading="lazy" alt="${escapeHtml(project.title)}"/>
      </a>
    `;
    wrapper.appendChild(slide);
  });
}

function createVisitButton(project) {
  const hasUrl = project.url && project.url !== "#";
  if (!hasUrl) {
    return `<span class="visit-btn visit-btn--disabled" aria-disabled="true">回到主页</span>`;
  }
  return `
    <a class="visit-btn" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">Visit Website</a>
  `;
}

projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "card lazy-card";
  card.dataset.index = index;
  card.id = escapeHtml(project.id);

  card.innerHTML = `
    <div class="media-wrap">
      <div class="swiper swiper-${index}">
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination swiper-pagination-${index}"></div>
      </div>
      <span class="media-badge">Case ${String(index + 1).padStart(2, "0")}</span>
    </div>
    <div class="card-body">
      <h3 class="card-title">${escapeHtml(project.title)}</h3>
      <p class="card-desc">${escapeHtml(getProjectIntro(project))}</p>
      <div class="card-actions">
        <span class="hint">点击图片查看大图</span>
        ${createVisitButton(project)}
      </div>
    </div>
  `;

  card._projectData = project;
  container.appendChild(card);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const card = entry.target;
    if (card.dataset.loaded) return;
    card.dataset.loaded = "true";

    const index = card.dataset.index;
    const project = card._projectData;
    const wrapper = card.querySelector(".swiper-wrapper");
    renderSlides(project, wrapper);

    const imageCount = project.images?.length || 0;
    new Swiper(`.swiper-${index}`, {
      loop: imageCount > 1,
      observer: true,
      observeParents: true,
      pagination: { el: `.swiper-pagination-${index}`, clickable: true },
    });
    observer.unobserve(card);
  });
}, { rootMargin: "120px" });

document.querySelectorAll(".lazy-card").forEach(card => observer.observe(card));

Fancybox.bind("[data-fancybox]", {
  Toolbar: { display: ["close"] },
  hideScrollbar: false,
});

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.slice(1);
  if (!hash) return;
  const targetId = hash.split('-')[0];
  const el = document.getElementById(targetId);
  if (el) {
    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
});
