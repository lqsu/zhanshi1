const projects = [
  { id: "project01", title: "惠普28A", url: "https://znjc025.com", images: ["1.png", "2.webp", "3.webp", "4.webp", "5.webp", "6.webp"] },
  { id: "project02", title: "网站02", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp", "4.webp"] },
  { id: "project03", title: "网站03", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project04", title: "网站04", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project05", title: "网站05", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project06", title: "网站06", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
];

const container = document.getElementById("projectList");

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
    <a class="visit-btn" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">
      Visit Website
    </a>
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
      <div class="card-meta"></div>
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

// 按进入视口时再初始化轮播，减少首屏之外图片对性能的影响。
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const card = entry.target;
    const index = card.dataset.index;
    const project = card._projectData;
    const wrapper = card.querySelector(".swiper-wrapper");

    if (card.dataset.loaded) return;
    card.dataset.loaded = "true";

    renderSlides(project, wrapper);

    const imageCount = Array.isArray(project.images) ? project.images.length : 0;

    new Swiper(`.swiper-${index}`, {
      loop: imageCount > 1,
      observer: true,
      observeParents: true,
      watchOverflow: true,
      pagination: {
        el: `.swiper-pagination-${index}`,
        clickable: true,
      },
    });

    observer.unobserve(card);
  });
}, {
  rootMargin: "120px"
});

document.querySelectorAll(".lazy-card").forEach(card => {
  observer.observe(card);
});

Fancybox.bind("[data-fancybox]", {
  Toolbar: {
    display: ["close"]
  },
  
  hideScrollbar: false,
});


window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.slice(1);
  if (!hash) return;

  const targetId = hash.split('-')[0];
  const targetEl = document.getElementById(targetId);

  if (targetEl) {
    setTimeout(() => {
      targetEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  }
});
