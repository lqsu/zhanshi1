const projects = [
  { id: "project01", title: "惠普28A", url: "https://znjc025.com", images: ["1.png", "2.webp", "3.webp"] },
  { id: "project02", title: "网站02", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project03", title: "网站03", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
  { id: "project04", title: "网站04", url: "https://znjc025.com", images: ["1.webp", "2.webp", "3.webp"] },
];

const container = document.getElementById("projectList");
let allCards = []; // 存储所有产品卡片

// ==============================================
// 1. 渲染所有产品（默认隐藏）
// ==============================================
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
  return `包含 ${count} 张商品图片`;
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
  if (!hasUrl) return `<span class="visit-btn visit-btn--disabled" aria-disabled="true">回到主页</span>`;
  return `<a class="visit-btn" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">返回主页</a>`;
}

// 先渲染全部，但全部隐藏
projects.forEach((project, index) => {
  const card = document.createElement("article");
  card.className = "card lazy-card";
  card.dataset.index = index;
  card.id = escapeHtml(project.id);
  card.style.display = "none"; // 默认隐藏

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
  allCards.push(card);
});

// 懒加载轮播
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

Fancybox.bind("[data-fancybox]", { Toolbar: { display: ["close"] }, hideScrollbar: false });

// ==============================================
// 2. 显示控制函数（核心）
// ==============================================
function showAllCards() {
  allCards.forEach(c => c.style.display = "none");
  const randomTwo = getRandomTwo(projects);
  randomTwo.forEach(p => {
    const card = document.getElementById(p.id);
    if (card) card.style.display = "block";
  });
}
function showSingleCard(projectId) {
  allCards.forEach(c => c.style.display = "none");
  const card = document.getElementById(projectId);
  if (card) card.style.display = "block";
}
function getRandomTwo(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, 2);
}

// ==============================================
// 3. 目录导航（带全部按钮 + 默认收起 + 显眼）
// ==============================================
function createFixedSideNav() {
  // 顶部显眼目录按钮（电脑+手机都显示）
  const toggleBtn = document.createElement("button");
  toggleBtn.id = "navToggleBtn";
  toggleBtn.textContent = "📋 产品目录";
  toggleBtn.style.position = "fixed";
  toggleBtn.style.top = "15px";
  toggleBtn.style.left = "15px";
  toggleBtn.style.zIndex = "99999";
  toggleBtn.style.padding = "10px 16px";
  toggleBtn.style.borderRadius = "10px";
  toggleBtn.style.border = "none";
  toggleBtn.style.background = "#ff3c00"; // 橙色超显眼
  toggleBtn.style.color = "#fff";
  toggleBtn.style.fontSize = "15px";
  toggleBtn.style.fontWeight = "bold";
  toggleBtn.style.boxShadow = "0 4px 12px rgba(255,60,0,0.3)";
  toggleBtn.style.cursor = "pointer";

  // 侧边目录面板
  const sideNav = document.createElement("div");
  sideNav.id = "sideFixedNav";
  sideNav.style.position = "fixed";
  sideNav.style.top = "50%";
  sideNav.style.left = "20px";
  sideNav.style.transform = "translateY(-50%)";
  sideNav.style.background = "#fff";
  sideNav.style.padding = "20px 16px";
  sideNav.style.borderRadius = "12px";
  sideNav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
  sideNav.style.zIndex = "9999";
  sideNav.style.minWidth = "150px";
  sideNav.style.display = "none"; // 默认收起
  sideNav.style.flexDirection = "column";
  sideNav.style.gap = "10px";

  sideNav.innerHTML = `<h4 style="margin:0 0 12px 0; font-size:16px; text-align:center; color:#333;">产品目录</h4>`;
  const navLinks = document.createElement("div");
  navLinks.id = "navLinksContainer";
  navLinks.style.display = "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.gap = "10px";

  // ========== 加【全部】按钮 ==========
  const allLink = document.createElement("a");
  allLink.href = "#all";
  allLink.style.padding = "8px 12px";
  allLink.style.borderRadius = "8px";
  allLink.style.textDecoration = "none";
  allLink.style.color = "#fff";
  allLink.style.fontSize = "14px";
  allLink.style.fontWeight = "bold";
  allLink.style.background = "#222";
  allLink.innerText = "✅ 全部产品";
  navLinks.appendChild(allLink);

  // 产品列表
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

    a.onmouseover = () => { a.style.background = "#222"; a.style.color = "#fff"; };
    a.onmouseout = () => { a.style.background = "#f5f5f5"; a.style.color = "#555"; };
    navLinks.appendChild(a);
  });

  sideNav.appendChild(navLinks);
  document.body.appendChild(toggleBtn);
  document.body.appendChild(sideNav);

  // 切换显示/隐藏
  let isOpen = false;
  toggleBtn.addEventListener("click", () => {
    isOpen = !isOpen;
    sideNav.style.display = isOpen ? "flex" : "none";
    toggleBtn.textContent = isOpen ? "❌ 关闭目录" : "📋 产品目录";
  });

  // 点击目录后控制显示
  navLinks.addEventListener("click", (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.tagName !== "A") return;

    const href = target.getAttribute("href");
    if (href === "#all") {
      showAllCards();
    } else {
      const pid = href.replace("#", "");
      showSingleCard(pid);
    }

    // 点击后自动收起目录
    isOpen = false;
    sideNav.style.display = "none";
    toggleBtn.textContent = "📋 产品目录";
  });
}

// ==============================================
// 4. 初始化：默认随机显示2个
// ==============================================
window.addEventListener('DOMContentLoaded', () => {
  showAllCards();
  createFixedSideNav();

  // 处理 hash 跳转
  const hash = window.location.hash.slice(1);
  if (hash && hash !== "all") {
    const targetId = hash.split('-')[0];
    setTimeout(() => showSingleCard(targetId), 100);
  }
});
