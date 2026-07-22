/**
 * @file contactForm.ts
 * @description B2B Project Inquiry Contact Form Controller, Email Dispatcher & Modal Feedback Handler.
 */

import { sendInquiry, InquiryPayload } from "./emailService";

declare const gsap: any;

/**
 * Shows the contact feedback modal dialog (Success or Error).
 */
function showFeedbackModal(isSuccess: boolean, customMessage?: string): void {
  const modal = document.getElementById("contact-feedback-modal");
  const modalBox = document.getElementById("contact-modal-box");
  const iconWrapper = document.getElementById("contact-modal-icon-wrapper");
  const iconSuccess = document.getElementById("contact-modal-icon-success");
  const iconError = document.getElementById("contact-modal-icon-error");
  const badge = document.getElementById("contact-modal-badge");
  const title = document.getElementById("contact-modal-title");
  const messageEl = document.getElementById("contact-modal-message");
  const noticeText = document.getElementById("contact-modal-notice-text");

  if (!modal || !modalBox || !badge || !title || !messageEl) return;

  if (isSuccess) {
    iconWrapper?.classList.remove("bg-red-50", "text-red-600");
    iconWrapper?.classList.add("bg-blue-50", "text-blue-600");
    iconSuccess?.classList.remove("hidden");
    iconError?.classList.add("hidden");

    badge.className = "px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-blue-100 text-blue-700 mb-2";
    badge.textContent = "문의 접수 완료";

    title.textContent = "B2B 프로젝트 문의 접수 완료";
    messageEl.textContent = customMessage || "문의가 성공적으로 접수되었습니다. 24시간 이내에 답변드리겠습니다.";

    if (noticeText) {
      noticeText.textContent = "작성해주신 이메일로 자동 확인 메일이 발송되었습니다. (관리자 수신: whomedia6104@gmail.com)";
    }
  } else {
    iconWrapper?.classList.remove("bg-blue-50", "text-blue-600");
    iconWrapper?.classList.add("bg-red-50", "text-red-600");
    iconSuccess?.classList.add("hidden");
    iconError?.classList.remove("hidden");

    badge.className = "px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full bg-red-100 text-red-700 mb-2";
    badge.textContent = "문의 접수 실패";

    title.textContent = "문의 접수 처리 오류";
    messageEl.textContent = customMessage || "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나, 02-6443-4222로 직접 연락주시기 바랍니다.";

    if (noticeText) {
      noticeText.textContent = "대표 전화: 02-6443-4222 / 이메일: whomedia6104@gmail.com으로 직접 문의하실 수 있습니다.";
    }
  }

  // Animate Modal Entrance
  modal.classList.remove("pointer-events-none", "opacity-0");
  modal.classList.add("opacity-100");
  modalBox.classList.remove("scale-95");
  modalBox.classList.add("scale-100");

  if (typeof gsap !== "undefined") {
    gsap.fromTo(modalBox, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.4)" });
  }
}

/**
 * Hides the contact feedback modal dialog.
 */
function hideFeedbackModal(): void {
  const modal = document.getElementById("contact-feedback-modal");
  const modalBox = document.getElementById("contact-modal-box");
  if (!modal || !modalBox) return;

  modal.classList.remove("opacity-100");
  modal.classList.add("opacity-0", "pointer-events-none");
  modalBox.classList.remove("scale-100");
  modalBox.classList.add("scale-95");
}

/**
 * Shows floating toast notification
 */
function showToast(): void {
  const toast = document.getElementById("success-toast");
  if (!toast) return;

  toast.classList.remove("pointer-events-none", "opacity-0");
  toast.classList.add("opacity-100");

  if (typeof gsap !== "undefined") {
    gsap.to(toast, { opacity: 1, y: -15, duration: 0.45, ease: "power2.out" });
  }

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    if (typeof gsap !== "undefined") {
      gsap.to(toast, { opacity: 0, y: 0, duration: 0.45, ease: "power2.in", onComplete: () => toast.classList.add("pointer-events-none") });
    } else {
      toast.classList.add("pointer-events-none");
    }
  }, 4000);
}

/**
 * Initializes B2B inquiry category pill selection, async submission with email automation,
 * feedback modals, and debugging utilities.
 */
export function initContactForm(): void {
  const form = document.getElementById("b2b-contact-form") as HTMLFormElement;
  const catButtons = document.querySelectorAll(".form-cat-btn");
  const categoryInput = document.getElementById("form-category") as HTMLInputElement;

  const modalBackdrop = document.getElementById("contact-modal-backdrop");
  const modalCloseBtn = document.getElementById("contact-modal-close-btn");
  const modalConfirmBtn = document.getElementById("contact-modal-confirm-btn");

  if (!form || catButtons.length === 0 || !categoryInput) return;

  // Bind Modal Close listeners
  [modalBackdrop, modalCloseBtn, modalConfirmBtn].forEach((el) => {
    el?.addEventListener("click", hideFeedbackModal);
  });

  // Category selection button handlers
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

  // Handle Async Form Submit
  form.addEventListener("submit", async (e: Event) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement;
    const origText = submitBtn.textContent || "프로젝트 문의 제출하기";

    // 1. Change submit button state to prevent duplicate submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "상담 접수 전송 중...";
    submitBtn.classList.add("opacity-70");

    // Extract payload
    const payload: InquiryPayload = {
      category: categoryInput.value || "영상 제작",
      name: (document.getElementById("form-name") as HTMLInputElement)?.value.trim() || "",
      company: (document.getElementById("form-company") as HTMLInputElement)?.value.trim() || "",
      phone: (document.getElementById("form-phone") as HTMLInputElement)?.value.trim() || "",
      email: (document.getElementById("form-email") as HTMLInputElement)?.value.trim() || "",
      message: (document.getElementById("form-message") as HTMLTextAreaElement)?.value.trim() || ""
    };

    try {
      // 2. Dispatch inquiry via async Email Service (Admin Notification & Customer Auto-responder)
      const result = await sendInquiry(payload);

      if (result.success) {
        // 3a. Success Flow
        showFeedbackModal(true, "문의가 성공적으로 접수되었습니다. 24시간 이내에 답변드리겠습니다.");
        showToast();

        // Reset form & category pills
        form.reset();
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
      } else {
        throw new Error(result.message || "Failed to dispatch email");
      }
    } catch (err: any) {
      // 3b. Error Flow
      console.error("[ContactForm] Error submitting inquiry:", err);
      showFeedbackModal(
        false,
        "접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주시거나, 02-6443-4222로 직접 연락주시기 바랍니다."
      );
    } finally {
      // 4. Restore submit button state
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
      submitBtn.classList.remove("opacity-70");
    }
  });

  // Attach Developer Debugging Helpers to window object
  (window as any).testSendInquiry = async (forceFail: boolean = false) => {
    console.log("🧪 [DevTools Test] Testing sendInquiry directly...");
    const samplePayload: InquiryPayload = {
      category: "영상 제작",
      name: "홍길동 팀장",
      company: "(주)한국에듀텍",
      phone: "010-1234-5678",
      email: "test.client@example.com",
      message: "AI 디지털 교과서용 4K 홍보 영상 및 인터랙티브 강의 제작 견적 요청드립니다."
    };
    try {
      const res = await sendInquiry(samplePayload, forceFail);
      console.log("🧪 [DevTools Test] Result:", res);
      showFeedbackModal(true, res.message);
      return res;
    } catch (e) {
      console.error("🧪 [DevTools Test] Error:", e);
      showFeedbackModal(false);
      return { success: false, error: e };
    }
  };

  (window as any).fillSampleInquiry = () => {
    (document.getElementById("form-name") as HTMLInputElement).value = "김민준 이사";
    (document.getElementById("form-company") as HTMLInputElement).value = "(주)미래교육테크";
    (document.getElementById("form-phone") as HTMLInputElement).value = "010-9876-5432";
    (document.getElementById("form-email") as HTMLInputElement).value = "minjun.kim@futureedu.co.kr";
    (document.getElementById("form-message") as HTMLTextAreaElement).value = "신규 LMS 탑재용 동영상 강의 프로덕션 제작 및 스튜디오 대관 문의드립니다.";
    (document.getElementById("form-consent") as HTMLInputElement).checked = true;
    console.log("✅ [DevTools Helper] Sample inquiry form data auto-filled!");
  };
}
