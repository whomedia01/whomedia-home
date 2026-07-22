/**
 * @file processTimeline.ts
 * @description Work Process Step Selection & Interactive Timeline Bar Controller with Auto-Play.
 */

import { PROCESS_DATA } from "../data/processData.ts";

declare const gsap: any;

/**
 * Initializes auto-playing B2B process timeline buttons, progress bars, and animated stage details.
 *
 * @returns {void}
 */
export function initProcessTimeline(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".process-step-btn");
  const timelineBar = document.getElementById("process-timeline-bar");
  const container = document.getElementById("process-detail-container");
  const section = document.getElementById("section-process");

  if (buttons.length === 0 || !timelineBar || !container) return;

  let currentStep = 1;
  let autoPlayTimer: number | null = null;
  let isPaused = false;
  const STEP_DURATION = 4000; // 4000ms = 4 seconds

  /**
   * Activates a specific step UI, updating button highlights, progress bar, timeline bar, and detail panel.
   */
  const activateStep = (stepNum: number, startProgress: boolean = true): void => {
    currentStep = stepNum;
    const data = PROCESS_DATA[stepNum];
    if (!data) return;

    // 1. Highlight active button and dim inactive ones
    buttons.forEach((btn) => {
      const btnStep = parseInt(btn.getAttribute("data-step") || "1", 10);
      const progressBar = btn.querySelector<HTMLElement>(".process-progress-bar");
      const circle = btn.querySelector<HTMLElement>(".process-step-circle");
      const stepTag = btn.querySelector<HTMLElement>(".process-step-label");
      const stepTitle = btn.querySelector<HTMLElement>(".process-step-title");

      // Reset progress bar on all buttons
      if (progressBar) {
        progressBar.style.transition = "none";
        progressBar.style.transform = "scaleX(0)";
      }

      if (btnStep === stepNum) {
        // Active Button: Highlighted with brand primary blue styling
        btn.classList.add("glass-active", "border-blue-500/50", "bg-blue-50/50", "shadow-md");
        btn.classList.remove("glass", "bg-white", "border-slate-200/80");

        if (circle) {
          circle.className = "process-step-circle w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white font-display font-extrabold text-sm shadow-md transition-all duration-300";
        }
        if (stepTag) {
          stepTag.className = "process-step-label text-[10px] font-bold text-blue-600 tracking-widest block uppercase transition-colors duration-300";
        }
        if (stepTitle) {
          stepTitle.className = "process-step-title text-sm font-extrabold text-slate-900 transition-colors duration-300";
        }

        // Trigger loading bar animation over 4 seconds
        if (progressBar && startProgress && !isPaused) {
          void progressBar.offsetWidth; // force reflow
          progressBar.style.transition = `transform ${STEP_DURATION}ms linear`;
          progressBar.style.transform = "scaleX(1)";
        }
      } else {
        // Inactive Button: Dimmed text color
        btn.classList.remove("glass-active", "border-blue-500/50", "bg-blue-50/50", "shadow-md");
        btn.classList.add("glass", "bg-white", "border-slate-200/80");

        if (circle) {
          circle.className = "process-step-circle w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 font-display font-bold text-sm transition-all duration-300";
        }
        if (stepTag) {
          stepTag.className = "process-step-label text-[10px] font-bold text-slate-400 tracking-widest block uppercase transition-colors duration-300";
        }
        if (stepTitle) {
          stepTitle.className = "process-step-title text-sm font-medium text-slate-500 transition-colors duration-300";
        }
      }
    });

    // 2. Update vertical timeline height percentage
    const percentage = ((stepNum - 1) / 3) * 100;
    timelineBar.style.height = `${percentage}%`;

    // 3. Update background watermark number
    const bgNum = document.getElementById("process-bg-num");
    if (bgNum) bgNum.textContent = data.bgNum;

    // 4. Content update handler
    const updateContent = (): void => {
      const tagEl = document.getElementById("process-tag");
      const titleEl = document.getElementById("process-title");
      const subtitleEl = document.getElementById("process-subtitle");
      const bulletsEl = document.getElementById("process-bullets");

      if (tagEl) tagEl.textContent = data.tag;
      if (titleEl) titleEl.textContent = data.title;
      if (subtitleEl) subtitleEl.textContent = data.subtitle;

      if (bulletsEl) {
        bulletsEl.innerHTML = "";
        data.bullets.forEach((bullet) => {
          const li = document.createElement("li");
          li.className = "flex gap-3 text-sm text-slate-600";
          li.innerHTML = `
            <svg class="h-5 w-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
            <span>${bullet}</span>
          `;
          bulletsEl.appendChild(li);
        });
      }
    };

    // 5. Smooth Visual Transitions (GSAP or CSS fallback, duration 0.5s total)
    if (typeof gsap !== "undefined") {
      gsap.to(container, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power1.out",
        onComplete: () => {
          updateContent();
          gsap.to(container, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    } else {
      container.style.transition = "opacity 0.2s ease, transform 0.2s ease";
      container.style.opacity = "0";
      container.style.transform = "translateY(-10px)";
      setTimeout(() => {
        updateContent();
        container.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
      }, 200);
    }
  };

  /**
   * Starts or resets the 4000ms auto-play interval timer.
   */
  const startTimer = (): void => {
    stopTimer();
    
    // Trigger loading bar for current step
    const activeBtn = document.querySelector<HTMLButtonElement>(`[data-step="${currentStep}"]`);
    const progressBar = activeBtn?.querySelector<HTMLElement>(".process-progress-bar");
    if (progressBar && !isPaused) {
      progressBar.style.transition = "none";
      progressBar.style.transform = "scaleX(0)";
      void progressBar.offsetWidth;
      progressBar.style.transition = `transform ${STEP_DURATION}ms linear`;
      progressBar.style.transform = "scaleX(1)";
    }

    autoPlayTimer = window.setInterval(() => {
      if (!isPaused) {
        const nextStep = (currentStep % 4) + 1;
        activateStep(nextStep, true);
      }
    }, STEP_DURATION);
  };

  /**
   * Clears the auto-play interval timer.
   */
  const stopTimer = (): void => {
    if (autoPlayTimer !== null) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  };

  // Attach click listeners for manual step selection
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stepNum = parseInt(btn.getAttribute("data-step") || "1", 10);
      activateStep(stepNum, true);
      startTimer();
    });
  });

  // Pause on hover over workflow section area, resume on mouseleave
  const hoverArea = section || document.querySelector("#section-process") || container;
  if (hoverArea) {
    hoverArea.addEventListener("mouseenter", () => {
      isPaused = true;
      // Freeze progress bar at current position
      const activeBtn = document.querySelector<HTMLButtonElement>(`[data-step="${currentStep}"]`);
      const progressBar = activeBtn?.querySelector<HTMLElement>(".process-progress-bar");
      if (progressBar) {
        const computedStyle = window.getComputedStyle(progressBar);
        const currentMatrix = computedStyle.transform;
        progressBar.style.transition = "none";
        progressBar.style.transform = currentMatrix;
      }
    });

    hoverArea.addEventListener("mouseleave", () => {
      isPaused = false;
      startTimer();
    });
  }

  // Initialize Step 01 & Start Auto-Play
  activateStep(1, true);
  startTimer();
}

