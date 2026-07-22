/**
 * @file mobileMenu.ts
 * @description Responsive Mobile Drawer Navigation Toggle & Body Scroll Lock Controller.
 */

declare const gsap: any;

/**
 * Initializes mobile drawer menu toggle buttons, staggered link entrance animations, and background scroll locking.
 *
 * @returns {void}
 */
export function initMobileMenu(): void {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !closeBtn || !menu) return;

  const openMenu = (): void => {
    menu.classList.remove("-translate-y-full", "pointer-events-none");
    menu.classList.add("pointer-events-auto");
    document.body.style.overflow = "hidden"; // Lock background scroll

    if (typeof gsap !== "undefined") {
      gsap.fromTo(
        links,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out", delay: 0.25 }
      );
    } else {
      links.forEach((link: any) => {
        link.style.opacity = "1";
        link.style.transform = "none";
      });
    }
  };

  const closeMenu = (): void => {
    menu.classList.add("-translate-y-full", "pointer-events-none");
    menu.classList.remove("pointer-events-auto");
    document.body.style.overflow = ""; // Unlock background scroll
  };

  toggleBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
    });
  });
}
