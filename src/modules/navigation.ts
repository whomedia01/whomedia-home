/**
 * @file navigation.ts
 * @description Smooth Anchor Navigation, IntersectionObserver Section Highlighting, and Header Dynamics.
 */

/**
 * Scrolls smoothly to a specific section by index (0-5).
 *
 * @param {number} index - Index of target section in ordered sections array.
 * @returns {void}
 */
export function scrollToIndex(index: number): void {
  const sections = [
    "section-hero",
    "section-about",
    "section-process",
    "section-portfolio",
    "section-hub",
    "section-contact"
  ];

  if (index < 0 || index >= sections.length) return;

  const targetEl = document.getElementById(sections[index]);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * Updates active highlight styling for desktop navigation links and pagination dots.
 *
 * @param {number} index - Active section index.
 * @returns {void}
 */
export function updateNavState(index: number): void {
  // Highlight Header Links
  const navLinks = document.querySelectorAll(".desktop-nav-link");
  navLinks.forEach((link, idx) => {
    if (idx === index) {
      link.classList.add("text-blue-600", "font-bold");
      link.classList.remove("text-slate-600");
    } else {
      link.classList.remove("text-blue-600", "font-bold");
      link.classList.add("text-slate-600");
    }
  });

  // Highlight Pagination Dots
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add("bg-blue-600", "scale-125");
      dot.classList.remove("bg-slate-300");
    } else {
      dot.classList.remove("bg-blue-600", "scale-125");
      dot.classList.add("bg-slate-300");
    }
  });
}

/**
 * Initializes anchor click listeners for pagination dots, header links, and smooth hash links.
 *
 * @returns {void}
 */
export function initHorizontalScroll(): void {
  // Dot Pagination clicks
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index") || "0", 10);
      scrollToIndex(index);
    });
  });

  // Header Nav links clicks
  const navLinks = document.querySelectorAll(".desktop-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e: Event) => {
      e.preventDefault();
      const index = parseInt(link.getAttribute("data-index") || "0", 10);
      scrollToIndex(index);
    });
  });

  // Global smooth scroll interceptor for hash links
  document.body.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (!anchor) return;

    const href = anchor.getAttribute("href");
    if (href && href.startsWith("#")) {
      let targetId = href.substring(1);

      const sectionMapping: Record<string, string> = {
        hero: "section-hero",
        about: "section-about",
        process: "section-process",
        portfolio: "section-portfolio",
        hub: "section-hub",
        contact: "section-contact"
      };

      if (sectionMapping[targetId]) {
        targetId = sectionMapping[targetId];
      }

      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}

/**
 * Initializes IntersectionObserver to highlight navigation nodes automatically when sections cross the viewport.
 *
 * @returns {void}
 */
export function initIntersectionObserver(): void {
  const sections = [
    "section-hero",
    "section-about",
    "section-process",
    "section-portfolio",
    "section-hub",
    "section-contact"
  ];

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: "-35% 0px -45% 0px",
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const index = sections.indexOf(id);
        if (index !== -1) {
          updateNavState(index);
        }
      }
    });
  }, observerOptions);

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Staggered reveal observer for cards and editorial elements
  const revealElements = document.querySelectorAll(".stagger-reveal, .portfolio-card, .flip-card, .process-step");
  
  // Assign stagger delay per container parent
  const containers = document.querySelectorAll(".stagger-container, #section-about .grid, #section-portfolio .grid, #section-process .grid");
  containers.forEach((container) => {
    const children = container.querySelectorAll(".stagger-reveal, .portfolio-card, .flip-card, .process-step");
    children.forEach((child, idx) => {
      (child as HTMLElement).style.setProperty("--stagger-delay", `${idx * 0.1}s`);
      child.classList.add("stagger-reveal");
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    },
    { root: null, rootMargin: "0px 0px -80px 0px", threshold: 0.1 }
  );

  document.querySelectorAll(".stagger-reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // Header glassmorphism shadow scroll effect
  window.addEventListener("scroll", () => {
    const header = document.getElementById("site-header");
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("glass", "py-4", "shadow-lg");
        header.classList.remove("bg-transparent", "py-6");
      } else {
        header.classList.remove("glass", "py-4", "shadow-lg");
        header.classList.add("bg-transparent", "py-6");
      }
    }
  });
}
