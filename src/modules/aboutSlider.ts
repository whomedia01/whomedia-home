/**
 * @file aboutSlider.ts
 * @description 3D Interactive Showcase Slider with Tilt Physics, Touch Swiper, & Camera Shutter Animation.
 */

import { ABOUT_PILLARS } from "../data/aboutPillars.ts";

declare const gsap: any;

/**
 * Initializes the corporate philosophy showcase slider with 3D tilt calculations, touch swipe gestures, and auto-rotation.
 *
 * @returns {void}
 */
export function initAboutSlider(): void {
  const showcase = document.getElementById("about-showcase");
  const showcaseContent = document.getElementById("about-showcase-content");
  const tabButtons = document.querySelectorAll(".about-tab-btn");
  const shutterLine = document.getElementById("shutter-flash-line");

  if (!showcase || !showcaseContent || tabButtons.length === 0) return;

  let currentIdx = 0;
  let autoTimer: any = null;
  const slideDuration = 4500; // 4.5 seconds auto-cycle interval

  // 3D Tilt & Spotlight mouse listener
  showcase.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = showcase.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;
    showcase.style.setProperty("--mouse-x", `${posX}%`);
    showcase.style.setProperty("--mouse-y", `${posY}%`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -6;
    const tiltY = ((x - centerX) / centerX) * 6;

    if (typeof gsap !== "undefined") {
      gsap.to(showcase, {
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power1.out"
      });
    }
  });

  showcase.addEventListener("mouseleave", () => {
    if (typeof gsap !== "undefined") {
      gsap.to(showcase, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  });

  // Mobile Touch Swipe Gesture Listener (Passive non-blocking scroll)
  let touchStartX = 0;
  let touchStartY = 0;
  showcase.addEventListener(
    "touchstart",
    (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    },
    { passive: true }
  );

  showcase.addEventListener(
    "touchend",
    (e: TouchEvent) => {
      if (e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) {
            const nextIdx = (currentIdx + 1) % ABOUT_PILLARS.length;
            updateShowcase(nextIdx);
            startAutoCycle();
          } else {
            const prevIdx = (currentIdx - 1 + ABOUT_PILLARS.length) % ABOUT_PILLARS.length;
            updateShowcase(prevIdx);
            startAutoCycle();
          }
        }
      }
    },
    { passive: true }
  );

  const updateShowcase = (index: number): void => {
    currentIdx = index;
    const data = ABOUT_PILLARS[index];

    tabButtons.forEach((btn, idx) => {
      const activeBar = btn.querySelector(".active-progress-bar") as HTMLElement;
      const span1 = btn.querySelector("span:first-child");
      const span2 = btn.querySelector("span:nth-child(2)");

      if (idx === index) {
        btn.classList.add("border-blue-500/40", "bg-blue-50/50");
        btn.classList.remove("border-slate-200", "hover:border-slate-300");
        if (span1) span1.className = "text-[10px] font-bold text-blue-600 uppercase tracking-widest";
        if (span2) span2.className = "text-xs md:text-sm font-extrabold text-slate-900 tracking-tight";

        if (activeBar) {
          activeBar.style.transition = "none";
          activeBar.style.transform = "scaleX(0)";
          void activeBar.offsetHeight; // Reflow
          activeBar.style.transition = `transform ${slideDuration}ms linear`;
          activeBar.style.transform = "scaleX(1)";
        }
      } else {
        btn.classList.remove("border-blue-500/40", "bg-blue-50/50");
        btn.classList.add("border-slate-200", "hover:border-slate-300");
        if (span1) span1.className = "text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-widest";
        if (span2) span2.className = "text-xs md:text-sm font-extrabold text-slate-600 group-hover:text-slate-900 transition-colors tracking-tight";

        if (activeBar) {
          activeBar.style.transition = "none";
          activeBar.style.transform = "scaleX(0)";
        }
      }
    });

    const performContentUpdate = (): void => {
      const badgeEl = document.getElementById("showcase-badge");
      const numEl = document.getElementById("showcase-number");
      const titleEl = document.getElementById("showcase-title");
      const descEl = document.getElementById("showcase-desc");
      const bulletsEl = document.getElementById("showcase-bullets");

      if (badgeEl) badgeEl.textContent = data.badge;
      if (numEl) numEl.textContent = data.number;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;

      if (bulletsEl) {
        bulletsEl.innerHTML = "";
        data.bullets.forEach((bullet) => {
          const li = document.createElement("li");
          li.className = "flex gap-3 text-xs md:text-sm text-slate-600";
          li.innerHTML = `
            <svg class="h-4 w-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>${bullet}</span>
          `;
          bulletsEl.appendChild(li);
        });
      }

      const leftNumEl = document.getElementById("about-left-number");
      const leftEyebrowEl = document.getElementById("about-left-eyebrow");
      const leftTitleEl = document.getElementById("about-left-title");
      const leftDescEl = document.getElementById("about-left-desc");

      if (leftNumEl) leftNumEl.textContent = data.number;
      if (leftEyebrowEl) leftEyebrowEl.textContent = data.leftEyebrow;
      if (leftTitleEl) leftTitleEl.innerHTML = data.leftTitle;
      if (leftDescEl) leftDescEl.textContent = data.leftDesc;
    };

    if (typeof gsap !== "undefined") {
      const leftCol = document.getElementById("about-left-col");

      if (shutterLine) {
        gsap.fromTo(shutterLine, { top: "0%", opacity: 0.9 }, { top: "100%", opacity: 0, duration: 0.4, ease: "power2.inOut" });
      }

      gsap.to(showcase, {
        scale: 0.985,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          performContentUpdate();
          gsap.to(showcase, { scale: 1, duration: 0.45, ease: "back.out(1.4)" });
          gsap.fromTo(showcaseContent, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
          if (leftCol) {
            gsap.fromTo(leftCol, { opacity: 0, x: -15 }, { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" });
          }
        }
      });
    } else {
      performContentUpdate();
    }
  };

  const startAutoCycle = (): void => {
    stopAutoCycle();
    autoTimer = setInterval(() => {
      const nextIdx = (currentIdx + 1) % ABOUT_PILLARS.length;
      updateShowcase(nextIdx);
    }, slideDuration);
  };

  const stopAutoCycle = (): void => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-about-tab") || "0", 10);
      if (idx === currentIdx) return;
      updateShowcase(idx);
      startAutoCycle();
    });
  });

  updateShowcase(0);
  startAutoCycle();
}
