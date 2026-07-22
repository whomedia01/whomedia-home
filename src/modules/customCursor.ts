/**
 * @file customCursor.ts
 * @description Custom Video Production Pointer with Camera Recording Box & Tactile Ripple FX.
 */

declare const gsap: any;

/**
 * Initializes the custom video-production camera pointer and click shockwave FX.
 * Automatically disables itself on mobile/touch devices for native touch performance.
 *
 * @returns {void}
 */
export function initCustomCursor(): void {
  // Disable custom cursor on touch/mobile devices to avoid touch interference
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return;
  }

  // Ensure single DOM element instances for dot and ring
  let dot = document.querySelector(".custom-cursor-dot") as HTMLElement;
  let ring = document.querySelector(".custom-cursor-ring") as HTMLElement;

  if (!dot) {
    dot = document.createElement("div");
    dot.className = "custom-cursor-dot";
    document.body.appendChild(dot);
  } else if (dot.parentElement !== document.body) {
    document.body.appendChild(dot);
  }

  if (!ring) {
    ring = document.createElement("div");
    ring.className = "custom-cursor-ring";
    document.body.appendChild(ring);
  } else if (ring.parentElement !== document.body) {
    document.body.appendChild(ring);
  }

  ring.innerHTML = `
    <div class="custom-cursor-camera-box">
      <svg class="custom-cursor-camera-svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-3.69-2.213a.75.75 0 0 1-.375-.647V8.11a.75.75 0 0 1 .375-.647l3.69-2.213a.75.75 0 0 1 1.135.647v12.206a.75.75 0 0 1-1.135.647Z" />
      </svg>
      <span class="camera-rec-dot"></span>
    </div>
    <span class="custom-cursor-text">WHO</span>
  `;

  const textLabel = ring.querySelector(".custom-cursor-text") as HTMLElement;

  // Center cursor transform origin
  if (typeof gsap !== "undefined") {
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "center center",
      autoAlpha: 0
    });
  } else {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
    dot.style.visibility = "hidden";
    ring.style.visibility = "hidden";
  }

  let isFirstMove = true;
  let isVisible = false;

  const showCursor = (): void => {
    if (!isVisible) {
      isVisible = true;
      if (typeof gsap !== "undefined") {
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      } else {
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        dot.style.visibility = "visible";
        ring.style.visibility = "visible";
      }
    }
  };

  const hideCursor = (): void => {
    if (isVisible) {
      isVisible = false;
      document.body.classList.remove("cursor-hovering", "cursor-viewing");
      if (typeof gsap !== "undefined") {
        gsap.to([dot, ring], { autoAlpha: 0, duration: 0.2, overwrite: "auto" });
      } else {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
        dot.style.visibility = "hidden";
        ring.style.visibility = "hidden";
      }
    }
  };

  const onMouseMove = (e: MouseEvent): void => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (typeof gsap !== "undefined") {
      if (isFirstMove) {
        gsap.set([dot, ring], { x: mouseX, y: mouseY });
        isFirstMove = false;
      } else {
        gsap.to(dot, { x: mouseX, y: mouseY, duration: 0, ease: "none", overwrite: "auto" });
        gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.12, ease: "power2.out", overwrite: "auto" });
      }
    } else {
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    showCursor();
  };

  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("mouseleave", hideCursor);
  document.addEventListener("mouseenter", showCursor);

  window.addEventListener("mouseout", (e: MouseEvent) => {
    if (!e.relatedTarget && !(e as any).toElement) {
      hideCursor();
    }
  });

  // Tactile click shockwave effect
  const triggerClickFX = (x: number, y: number): void => {
    if (typeof gsap === "undefined") return;

    const ripple = document.createElement("div");
    ripple.className = "custom-cursor-ripple";
    document.body.appendChild(ripple);

    gsap.set(ripple, {
      x,
      y,
      scale: 0.1,
      opacity: 0.95,
      xPercent: -50,
      yPercent: -50
    });

    gsap.to(ripple, {
      scale: 2.2,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => ripple.remove()
    });
  };

  const onMouseDown = (e: MouseEvent): void => {
    if (typeof gsap !== "undefined") {
      gsap.to(dot, { scale: 0.4, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { scale: 0.85, duration: 0.1, ease: "power2.out" });
    }
    triggerClickFX(e.clientX, e.clientY);
  };

  const onMouseUp = (): void => {
    if (typeof gsap !== "undefined") {
      gsap.to(dot, { scale: 1, duration: 0.12, ease: "power2.out" });
      gsap.to(ring, { scale: 1, duration: 0.12, ease: "power2.out" });
    }
  };

  window.addEventListener("mousedown", onMouseDown, { passive: true });
  window.addEventListener("mouseup", onMouseUp, { passive: true });

  // Event Delegation for Interactive Hover States
  document.addEventListener("mouseover", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const interactiveEl = target.closest(
      ".clickable, a, button, input, textarea, [role='button'], .portfolio-card, [data-video-id], .about-tab-btn, .pagination-dot"
    );

    if (interactiveEl) {
      const isVideoItem =
        interactiveEl.classList.contains("portfolio-card") ||
        interactiveEl.closest(".portfolio-card") ||
        interactiveEl.hasAttribute("data-video-id");

      if (isVideoItem) {
        if (textLabel) textLabel.textContent = "PLAY";
        document.body.classList.add("cursor-viewing");
        document.body.classList.remove("cursor-hovering");
      } else {
        if (textLabel) textLabel.textContent = "WHO";
        document.body.classList.add("cursor-hovering");
        document.body.classList.remove("cursor-viewing");
      }
    }
  });

  document.addEventListener("mouseout", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const interactiveEl = target.closest(
      ".clickable, a, button, input, textarea, [role='button'], .portfolio-card, [data-video-id], .about-tab-btn, .pagination-dot"
    );

    if (interactiveEl) {
      document.body.classList.remove("cursor-hovering", "cursor-viewing");
    }
  });
}
