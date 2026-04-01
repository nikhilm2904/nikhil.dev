// animation.ts — TypeScript-powered text animations
// Compiled output goes to animation.js

interface TypewriterOptions {
  element: HTMLElement;
  strings: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  cursor?: boolean;
}

class Typewriter {
  private element: HTMLElement;
  private strings: string[];
  private typeSpeed: number;
  private deleteSpeed: number;
  private pauseDuration: number;
  private loop: boolean;
  private currentStringIndex: number = 0;
  private currentCharIndex: number = 0;
  private isDeleting: boolean = false;
  private cursorEl: HTMLElement | null = null;

  constructor(options: TypewriterOptions) {
    this.element = options.element;
    this.strings = options.strings;
    this.typeSpeed = options.typeSpeed ?? 80;
    this.deleteSpeed = options.deleteSpeed ?? 40;
    this.pauseDuration = options.pauseDuration ?? 1800;
    this.loop = options.loop ?? true;

    if (options.cursor !== false) {
      this.cursorEl = document.createElement("span");
      this.cursorEl.className = "tw-cursor";
      this.cursorEl.textContent = "|";
      this.element.parentNode?.insertBefore(
        this.cursorEl,
        this.element.nextSibling
      );
    }
    this.tick();
  }

  private tick(): void {
    const current = this.strings[this.currentStringIndex];

    if (this.isDeleting) {
      this.currentCharIndex--;
    } else {
      this.currentCharIndex++;
    }

    this.element.textContent = current.substring(0, this.currentCharIndex);

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.currentCharIndex === current.length) {
      delay = this.pauseDuration;
      this.isDeleting = true;
    } else if (this.isDeleting && this.currentCharIndex === 0) {
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
  private element: HTMLElement;
  private texts: string[];
  private interval: number;
  private currentIndex: number = 0;

  constructor(element: HTMLElement, texts: string[], interval: number = 3000) {
    this.element = element;
    this.texts = texts;
    this.interval = interval;
    this.element.textContent = texts[0];
    setTimeout(() => this.rotate(), interval);
  }

  private rotate(): void {
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
function animateCounter(
  el: HTMLElement,
  target: number,
  duration: number = 2000,
  suffix: string = ""
): void {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

// Scroll reveal
function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.delay ?? "0";
          setTimeout(() => {
            el.classList.add("revealed");
          }, parseInt(delay));
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.12 }
  );
  elements.forEach((el) => observer.observe(el));
}

// Skill progress bar animation
function animateSkillBars(): void {
  const bars = document.querySelectorAll<HTMLElement>(".skill-fill");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target as HTMLElement;
          const level = bar.dataset.level ?? "0";
          setTimeout(() => {
            bar.style.width = level + "%";
          }, 200);
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.3 }
  );
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
        "Full Stack Web Integration",
      ],
      typeSpeed: 75,
      deleteSpeed: 38,
      pauseDuration: 1600,
    });
  }

  // Rotating badge
  const rotEl = document.getElementById("rotating-badge");
  if (rotEl) {
    new RotatingText(
      rotEl,
      ["🚀 Open to Work", "⚡ Salesforce Expert", "🏆 5x Certified"],
      2800
    );
  }

  // Counters
  const counters = document.querySelectorAll<HTMLElement>("[data-counter]");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const target = parseInt(el.dataset.counter ?? "0");
          const suffix = el.dataset.suffix ?? "";
          animateCounter(el, target, 1800, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  initScrollReveal();
  animateSkillBars();
});
