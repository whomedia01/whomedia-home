/**
 * @file globalScroll.ts
 * @description Native Mobile & Desktop Scroll Enabler & Viewport Manager.
 * Ensures vertical scrolling is never locked or blocked across all responsive viewports.
 */

/**
 * Initializes global scroll properties on document root, body, and main containers.
 * Resets any legacy overflow-locking or touch-blocking styles dynamically on load and window resize.
 *
 * @returns {void}
 */
export function initGlobalScrollEnabler(): void {
  const resetStyles = (): void => {
    // Force native vertical scrolling on HTML root and BODY
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.height = "auto";
    document.documentElement.style.maxHeight = "none";

    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.height = "auto";
    document.body.style.maxHeight = "none";
    document.body.style.pointerEvents = "auto";

    // Ensure the main wrapper allows unconstrained layout flow
    const mainWrapper = document.getElementById("main-wrapper");
    if (mainWrapper) {
      mainWrapper.style.overflowY = "visible";
      mainWrapper.style.height = "auto";
      mainWrapper.style.maxHeight = "none";
    }

    // Verify all primary section IDs permit unhindered scroll
    const sections: string[] = [
      "section-hero",
      "section-about",
      "section-process",
      "section-portfolio",
      "section-hub",
      "section-contact"
    ];

    sections.forEach((id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.overflow = "visible";
        el.style.height = "auto";
        el.style.minHeight = "100vh";
      }
    });
  };

  resetStyles();

  // Re-run resets on window resize or load event to maintain active scroll configuration
  window.addEventListener("resize", resetStyles);
  window.addEventListener("load", resetStyles);
}
