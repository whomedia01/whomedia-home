/**
 * @file flipCards.ts
 * @description 3D Platform Flip Card Interaction Controller.
 */

/**
 * Initializes click/tap event listeners on B2B Hub flip cards to toggle 3D perspective flip states.
 * Ignores clicks on embedded external links or buttons inside the card faces.
 *
 * @returns {void}
 */
export function initFlipCards(): void {
  const containers = document.querySelectorAll(".flip-card-container");
  containers.forEach((container) => {
    container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("a") || target.closest("button")) {
        return;
      }
      const inner = container.querySelector(".flip-card-inner");
      if (inner) {
        inner.classList.toggle("is-flipped");
      }
    });
  });
}
