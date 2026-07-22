/**
 * @file processTimeline.ts
 * @description Work Process Step Selection & Interactive Timeline Bar Controller.
 */

import { PROCESS_DATA } from "../data/processData.ts";

declare const gsap: any;

/**
 * Initializes click handlers for B2B process timeline buttons and animates stage details.
 *
 * @returns {void}
 */
export function initProcessTimeline(): void {
  const buttons = document.querySelectorAll(".process-step-btn");
  const timelineBar = document.getElementById("process-timeline-bar");
  const container = document.getElementById("process-detail-container");

  if (buttons.length === 0 || !timelineBar || !container) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stepNum = parseInt(btn.getAttribute("data-step") || "1", 10);
      const data = PROCESS_DATA[stepNum];
      if (!data) return;

      // Reset and highlight active trigger buttons
      buttons.forEach((b) => {
        b.classList.remove("glass-active", "border-blue-500/40");
        b.classList.add("glass");
        const circle = b.querySelector("div");
        if (circle) {
          circle.classList.remove("bg-blue-600", "text-white", "shadow-md");
          circle.classList.add("bg-slate-100", "text-slate-600");
        }
        const textSpan1 = b.querySelector("span:first-child");
        if (textSpan1) {
          textSpan1.classList.remove("text-blue-600");
          textSpan1.classList.add("text-slate-500");
        }
      });

      btn.classList.add("glass-active", "border-blue-500/40");
      btn.classList.remove("glass");
      const activeCircle = btn.querySelector("div");
      if (activeCircle) {
        activeCircle.classList.add("bg-blue-600", "text-white", "shadow-md");
        activeCircle.classList.remove("bg-slate-100", "text-slate-600");
      }
      const activeTextSpan1 = btn.querySelector("span:first-child");
      if (activeTextSpan1) {
        activeTextSpan1.classList.add("text-blue-600");
        activeTextSpan1.classList.remove("text-slate-500");
      }

      // Update vertical timeline progress height
      const percentage = ((stepNum - 1) / 3) * 100;
      timelineBar.style.height = `${percentage}%`;

      const bgNum = document.getElementById("process-bg-num");
      if (bgNum) bgNum.textContent = data.bgNum;

      const updateContent = (): void => {
        const titleEl = document.getElementById("process-title");
        const subtitleEl = document.getElementById("process-subtitle");
        const bulletsEl = document.getElementById("process-bullets");

        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;

        if (bulletsEl) {
          bulletsEl.innerHTML = "";
          data.bullets.forEach((bullet) => {
            const li = document.createElement("li");
            li.className = "flex gap-3 text-sm text-brand-text-secondary";
            li.innerHTML = `
              <svg class="h-5 w-5 text-brand-accent shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>${bullet}</span>
            `;
            bulletsEl.appendChild(li);
          });
        }
      };

      // Animate transition using GSAP
      if (typeof gsap !== "undefined") {
        gsap.to(container, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          onComplete: () => {
            updateContent();
            gsap.to(container, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out"
            });
          }
        });
      } else {
        updateContent();
      }
    });
  });
}
