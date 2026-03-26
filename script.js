/* ========================================
   SALESFORCE DEVELOPER PORTFOLIO
   script.js — Interactivity & UI Logic
   ======================================== */

"use strict";

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("theme") || "dark";
root.setAttribute("data-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);
  updateThemeIcon(next);
});

function updateThemeIcon(theme) {
  themeToggle.innerHTML =
    theme === "dark"
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
}

/* ---------- Navbar Scroll ---------- */
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a, #mobile-nav a");

window.addEventListener("scroll", () => {
  // Sticky style
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // Active nav link
  let current = "";
  sections.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });

  // Back to top
  const backTop = document.getElementById("back-top");
  backTop.classList.toggle("visible", window.scrollY > 500);
});

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      // Close mobile nav if open
      closeMobileNav();
    }
  });
});

/* ---------- Back To Top ---------- */
document.getElementById("back-top").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* ---------- Mobile Nav ---------- */
const hamburger = document.getElementById("hamburger");
const mobileNav = document.getElementById("mobile-nav");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  overlay.classList.toggle("active", isOpen);
  document.body.style.overflow = isOpen ? "hidden" : "";
});

overlay.addEventListener("click", closeMobileNav);

function closeMobileNav() {
  mobileNav.classList.remove("open");
  hamburger.classList.remove("open");
  overlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* ---------- About Tabs ---------- */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanes.forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(`tab-${target}`).classList.add("active");
  });
});

/* ---------- Project Filter ---------- */
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.removeAttribute("data-hidden");
        card.style.animation = "fadeInUp .35s ease both";
      } else {
        card.setAttribute("data-hidden", "");
      }
    });
  });
});

/* ---------- Micro-interactions ---------- */

// Button ripple
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position:absolute;left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;
      width:6px;height:6px;background:rgba(255,255,255,.4);border-radius:50%;
      transform:scale(0);animation:ripple .5s ease-out forwards;pointer-events:none;
    `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Inject ripple keyframe
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(40); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

/* ---------- Skill bar tooltips ---------- */
document.querySelectorAll(".skill-item").forEach((item) => {
  const fill = item.querySelector(".skill-fill");
  if (fill) {
    item.title = `Proficiency: ${fill.dataset.level}%`;
  }
});

/* ---------- Cert card hover particle ---------- */
// Lightweight sparkle on cert card hover
document.querySelectorAll(".cert-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.setProperty("--glow", "1");
  });
  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--glow", "0");
  });
});
