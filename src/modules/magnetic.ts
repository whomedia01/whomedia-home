/**
 * @file magnetic.ts
 * @description Magnetic cursor button interaction for primary CTA controls.
 * Uses GPU-accelerated transforms and GSAP animations.
 * Strictly disabled on touch / mobile devices via pointer media query checks.
 */

declare const gsap: any;

/**
 * Initializes magnetic hover effect on CTA buttons and interactive controls.
 *
 * @returns {void}
 */
export function initMagneticButtons(): void {
  // CRITICAL CONSTRAINT: Must be disabled on touch devices / coarse pointers
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const magneticSelector = ".magnetic-btn, .btn-magnetic, [data-magnetic], .impact-cta-banner a";
  const magneticEls = document.querySelectorAll(magneticSelector);

  magneticEls.forEach((el) => {
    const target = el as HTMLElement;
    target.style.willChange = "transform";

    const innerIcon = target.querySelector("i, svg") as HTMLElement | null;
    if (innerIcon) {
      innerIcon.style.willChange = "transform";
      innerIcon.style.display = "inline-block";
    }

    const onMouseMove = (e: MouseEvent): void => {
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.35;
      const deltaY = (e.clientY - centerY) * 0.35;

      if (typeof gsap !== "undefined") {
        gsap.to(target, {
          x: deltaX,
          y: deltaY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });

        if (innerIcon) {
          gsap.to(innerIcon, {
            x: deltaX * 0.5,
            y: deltaY * 0.5,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      } else {
        target.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    };

    const onMouseLeave = (): void => {
      if (typeof gsap !== "undefined") {
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto"
        });

        if (innerIcon) {
          gsap.to(innerIcon, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto"
          });
        }
      } else {
        target.style.transform = "translate3d(0, 0, 0)";
      }
    };

    target.addEventListener("mousemove", onMouseMove);
    target.addEventListener("mouseleave", onMouseLeave);
  });
}
