// animation.ts — TypeScript-powered text animations
// Compiled output goes to animation.js
class Typewriter {
    constructor(options) {
        var _a, _b, _c, _d, _e;
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.cursorEl = null;
        this.element = options.element;
        this.strings = options.strings;
        this.typeSpeed = (_a = options.typeSpeed) !== null && _a !== void 0 ? _a : 80;
        this.deleteSpeed = (_b = options.deleteSpeed) !== null && _b !== void 0 ? _b : 40;
        this.pauseDuration = (_c = options.pauseDuration) !== null && _c !== void 0 ? _c : 1800;
        this.loop = (_d = options.loop) !== null && _d !== void 0 ? _d : true;
        if (options.cursor !== false) {
            this.cursorEl = document.createElement("span");
            this.cursorEl.className = "tw-cursor";
            this.cursorEl.textContent = "|";
            (_e = this.element.parentNode) === null || _e === void 0 ? void 0 : _e.insertBefore(this.cursorEl, this.element.nextSibling);
        }
        this.tick();
    }
    tick() {
        const current = this.strings[this.currentStringIndex];
        if (this.isDeleting) {
            this.currentCharIndex--;
        }
        else {
            this.currentCharIndex++;
        }
        this.element.textContent = current.substring(0, this.currentCharIndex);
        let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;
        if (!this.isDeleting && this.currentCharIndex === current.length) {
            delay = this.pauseDuration;
            this.isDeleting = true;
        }
        else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentStringIndex = (this.currentStringIndex + 1) % this.strings.length;
            delay = 400;
        }
        if (this.loop || this.currentStringIndex < this.strings.length - 1 || !this.isDeleting) {
            setTimeout(() => this.tick(), delay);
        }
    }
}
// Rotating badge text animation
class RotatingText {
    constructor(element, texts, interval = 3000) {
        this.currentIndex = 0;
        this.element = element;
        this.texts = texts;
        this.interval = interval;
        this.element.textContent = texts[0];
        setTimeout(() => this.rotate(), interval);
    }
    rotate() {
        this.element.style.opacity = "0";
        this.element.style.transform = "translateY(-10px)";
        setTimeout(() => {
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            this.element.textContent = this.texts[this.currentIndex];
            this.element.style.opacity = "1";
            this.element.style.transform = "translateY(0)";
        }, 300);
        setTimeout(() => this.rotate(), this.interval);
    }
}
// Counter animation for stats
function animateCounter(el, target, duration = 2000, suffix = "") {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1)
            requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}
// Scroll reveal
function initScrollReveal() {
    const elements = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var _a;
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = (_a = el.dataset.delay) !== null && _a !== void 0 ? _a : "0";
                setTimeout(() => {
                    el.classList.add("revealed");
                }, parseInt(delay));
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.12 });
    elements.forEach((el) => observer.observe(el));
}
// Skill progress bar animation
function animateSkillBars() {
    const bars = document.querySelectorAll(".skill-fill");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var _a;
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = (_a = bar.dataset.level) !== null && _a !== void 0 ? _a : "0";
                setTimeout(() => {
                    bar.style.width = level + "%";
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    bars.forEach((b) => observer.observe(b));
}
// Init all animations on DOM ready
document.addEventListener("DOMContentLoaded", () => {
    // Typewriter on hero
    const twEl = document.getElementById("typewriter-text");
    if (twEl) {
        new Typewriter({
            element: twEl,
            strings: [
                "Salesforce Developer",
                "Apex Specialist",
                "Lightning Web Components",
                "Flow & Automation Expert",
                "Platform Developer I",
            ],
            typeSpeed: 75,
            deleteSpeed: 38,
            pauseDuration: 1600,
        });
    }
    // Rotating badge
    const rotEl = document.getElementById("rotating-badge");
    if (rotEl) {
        new RotatingText(rotEl, ["🚀 Open to Work", "⚡ Salesforce Dev", "🏆 5x Certified"], 2800);
    }
    // Counters
    const counters = document.querySelectorAll("[data-counter]");
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            var _a, _b;
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt((_a = el.dataset.counter) !== null && _a !== void 0 ? _a : "0");
                const suffix = (_b = el.dataset.suffix) !== null && _b !== void 0 ? _b : "";
                animateCounter(el, target, 1800, suffix);
                counterObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach((c) => counterObserver.observe(c));
    initScrollReveal();
    animateSkillBars();
});
