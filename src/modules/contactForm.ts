/**
 * @file contactForm.ts
 * @description B2B Project Inquiry Contact Form Controller & Toast Notification Handler.
 */

declare const gsap: any;

/**
 * Initializes B2B inquiry category pill selection, async submission simulation, and success toast notification.
 *
 * @returns {void}
 */
export function initContactForm(): void {
  const form = document.getElementById("b2b-contact-form") as HTMLFormElement;
  const catButtons = document.querySelectorAll(".form-cat-btn");
  const categoryInput = document.getElementById("form-category") as HTMLInputElement;
  const toast = document.getElementById("success-toast");

  if (!form || catButtons.length === 0 || !categoryInput || !toast) return;

  // Category selection toggle
  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-val") || "영상 제작";
      categoryInput.value = value;

      catButtons.forEach((b) => {
        b.classList.remove("border-blue-600", "bg-blue-600", "text-white", "shadow-xs");
        b.classList.add("border-slate-200", "bg-slate-100", "text-slate-600");
      });

      btn.classList.add("border-blue-600", "bg-blue-600", "text-white", "shadow-xs");
      btn.classList.remove("border-slate-200", "bg-slate-100", "text-slate-600");
    });
  });

  // Handle inquiry submit
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement;
    const origText = submitBtn.textContent || "프로젝트 문의 제출하기";

    submitBtn.disabled = true;
    submitBtn.textContent = "상담 접수 전송 중...";
    submitBtn.classList.add("opacity-70");

    // Simulate async transmission
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
      submitBtn.classList.remove("opacity-70");

      form.reset();

      // Reset category selector to default
      categoryInput.value = "영상 제작";
      catButtons.forEach((b, idx) => {
        if (idx === 0) {
          b.classList.add("border-blue-600", "bg-blue-600", "text-white", "shadow-xs");
          b.classList.remove("border-slate-200", "bg-slate-100", "text-slate-600");
        } else {
          b.classList.remove("border-blue-600", "bg-blue-600", "text-white", "shadow-xs");
          b.classList.add("border-slate-200", "bg-slate-100", "text-slate-600");
        }
      });

      // Show success toast feedback
      toast.classList.remove("pointer-events-none");
      toast.classList.add("opacity-100");

      if (typeof gsap !== "undefined") {
        gsap.to(toast, {
          opacity: 1,
          y: -15,
          duration: 0.45,
          ease: "power2.out"
        });
      }

      // Auto-hide toast after 4.5s
      setTimeout(() => {
        const cleanupToast = (): void => {
          toast.classList.add("pointer-events-none");
        };

        toast.classList.remove("opacity-100");

        if (typeof gsap !== "undefined") {
          gsap.to(toast, {
            opacity: 0,
            y: 0,
            duration: 0.45,
            ease: "power2.in",
            onComplete: cleanupToast
          });
        } else {
          cleanupToast();
        }
      }, 4500);
    }, 1250);
  });
}
