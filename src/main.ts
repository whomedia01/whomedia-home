/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Declare external globals loaded from CDN to satisfy TypeScript compilation
declare const gsap: any;
declare const YT: any;

// Define B2B Process Step Data structure
interface ProcessStep {
  title: string;
  subtitle: string;
  tag: string;
  bgNum: string;
  bullets: string[];
}

const PROCESS_DATA: Record<number, ProcessStep> = {
  1: {
    title: "고객 문의 및 요구사항 분석",
    subtitle: "고객의 비즈니스 니즈와 목적을 정밀하게 파악하는 맞춤 1:1 진단",
    tag: "상담 & 요구 분석",
    bgNum: "01",
    bullets: [
      "전문 컨설턴트의 1:1 맞춤 상담 및 비즈니스 환경 정밀 진단",
      "프로젝트 목표, 예산, 일정 및 핵심 요구사항 도출",
      "공공·기업 환경 및 가이드라인에 맞춘 최적의 추진 방향성 제시"
    ]
  },
  2: {
    title: "맞춤형 솔루션 기획 및 제안",
    subtitle: "분석된 데이터를 바탕으로 명확하고 체계적인 사업 실행안 기획",
    tag: "기획 & 제안",
    bgNum: "02",
    bullets: [
      "고객사별 특성에 최적화된 맞춤형 기획서 및 전략 제안서 작성",
      "합리적인 견적 산출 및 투명한 스케줄링 프로세스 제공",
      "전문 기획진의 전략 방향성 공유 및 사전 피드백 적극 수렴"
    ]
  },
  3: {
    title: "프로젝트 제작 및 실행",
    subtitle: "자체 전문 인프라와 분야별 제작진이 주도하는 완성도 높은 실행",
    tag: "제작 & 실행",
    bgNum: "03",
    bullets: [
      "자체 전문 스튜디오 인프라 및 최신 촬영·편집 시스템 투입",
      "전문 연출진, 모션그래픽, 크리에이티브 파트너 네트워크 간 유기적 협업 체계",
      "마일스톤별 실시간 진행 상황 공유 및 철저한 품질 관리(QC)"
    ]
  },
  4: {
    title: "최종 검수, 인도 및 사후 지원",
    subtitle: "안정적인 프로젝트 최종 인도와 지속적인 파트너십 케어",
    tag: "검수 & 사후지원",
    bgNum: "04",
    bullets: [
      "고객사 최종 검수 완료 및 맞춤 포맷/시스템 인도",
      "프로젝트 운영 가이드 제공 및 실시간 CS 대응 지원",
      "성과 분석 및 차기 프로젝트 연계를 위한 지속적인 피드백 파트너십"
    ]
  }
};

/**
 * Premium Dynamic Corporate Philosophy Slider Types & Constants
 */
interface AboutPillar {
  badge: string;
  number: string;
  title: string;
  desc: string;
  bullets: string[];
  leftEyebrow: string;
  leftTitle: string;
  leftDesc: string;
}

const ABOUT_PILLARS: AboutPillar[] = [
  {
    badge: "PILLAR 01 / BUSINESS HUB",
    number: "01",
    title: "통합 미디어 비전 (Vision)",
    desc: "미디어 콘텐츠, 온·오프라인 맞춤 교육, 언론 네트워크를 유기적으로 융합한 최적의 비즈니스 허브입니다.",
    bullets: [
      "기업 및 공공기관 맞춤형 디지털 미디어 비즈니스 솔루션 구축",
      "브랜드 가치 극대화 및 멀티 플랫폼 융복합 사업 연계"
    ],
    leftEyebrow: "WHO WE ARE",
    leftTitle: '디지털 통합<br class="hidden sm:block" /> <span class="text-blue-600">미디어 비즈니스 허브</span>',
    leftDesc: "(주)후미디어는 전문 스튜디오 인프라, 온·오프라인 평생교육원(후캠퍼스), 인터넷 언론 미디어를 유기적으로 결합하여 기업의 지속 가능한 성장과 가치 실현을 이끄는 디지털 통합 미디어 비즈니스 허브입니다."
  },
  {
    badge: "PILLAR 02 / SMART INFRA",
    number: "02",
    title: "체계적 비즈니스 솔루션 (System)",
    desc: "시네마틱 프로덕션 제작 역량과 차세대 클라우드 LMS 솔루션을 통합 제공합니다.",
    bullets: [
      "자체 전문 스튜디오 및 시네마틱 4K 미디어 제작 시스템",
      "SCORM 및 xAPI 표준 규격을 지원하는 맞춤형 인프라"
    ],
    leftEyebrow: "HOW WE BUILD",
    leftTitle: '체계적인 통합<br class="hidden sm:block" /> <span class="text-blue-600">미디어와 인프라</span>',
    leftDesc: "자체 보유한 스튜디오 연출진과 스마트 플랫폼 기술력을 결합하여 비즈니스 목적에 최적화된 몰입감 높은 솔루션을 제공합니다."
  },
  {
    badge: "PILLAR 03 / TANGIBLE VALUE",
    number: "03",
    title: "실질적 성과 창출 (Value)",
    desc: "단순 프로젝트 완수를 넘어 기업과 조직의 지속적 경쟁력 강화를 지향합니다.",
    bullets: [
      "정밀 데이터 분석 기반의 맞춤 리포트 및 성과 모니터링",
      "지속적인 사후 파트너십 케어 및 비즈니스 연계 가이드"
    ],
    leftEyebrow: "WHAT WE DELIVER",
    leftTitle: '비즈니스 성공을<br class="hidden sm:block" /> <span class="text-blue-600">이끄는 가치 실현</span>',
    leftDesc: "공공 및 B2B 과업 성공 경험을 바탕으로 철저한 검수와 성과 분석을 제공하여 고객사의 실질적 가치 창출에 기여합니다."
  }
];

/**
 * 0. Global Scroll Enabler & Native Behavior Restorer
 * Explicitly forces vertical scrolling on the document body, HTML, and main wrapper,
 * ensuring no pointer events are locked, and no wheel/touch handlers block native behavior.
 */
function initGlobalScrollEnabler() {
  const resetStyles = () => {
    // Force native scrolling on document root and body
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.overflowX = "hidden";
    document.documentElement.style.height = "auto";
    document.documentElement.style.maxHeight = "none";
    
    document.body.style.overflowY = "auto";
    document.body.style.overflowX = "hidden";
    document.body.style.height = "auto";
    document.body.style.maxHeight = "none";
    document.body.style.pointerEvents = "auto";

    // Ensure the main wrapper is not layout-locked
    const mainWrapper = document.getElementById("main-wrapper");
    if (mainWrapper) {
      mainWrapper.style.overflowY = "visible";
      mainWrapper.style.height = "auto";
      mainWrapper.style.maxHeight = "none";
    }

    // Ensure all section containers allow native scroll and do not clip or prevent scroll
    const sections = ["section-hero", "section-about", "section-process", "section-portfolio", "section-hub", "section-contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.style.overflow = "visible";
        el.style.height = "auto";
        el.style.minHeight = "100vh";
      }
    });
  };

  resetStyles();
  
  // Re-verify styles on resize or load to keep them active
  window.addEventListener("resize", resetStyles);
  window.addEventListener("load", resetStyles);

  // Guarantee that wheel/touch movements bypass any event.preventDefault() blocking
  const bypassBlocker = (e: Event) => {
    e.stopPropagation();
  };

  window.addEventListener("wheel", bypassBlocker, { passive: true });
  window.addEventListener("touchmove", bypassBlocker, { passive: true });
}

function initAll() {
  // Initialize all modular elements
  initGlobalScrollEnabler();
  initAmbientThemeController();
  initCustomCursor();
  initHorizontalScroll();
  initIntersectionObserver();
  initAboutSlider();
  initProcessTimeline();
  initPortfolioModal();
  initContactForm();
  initMobileMenu();
  initFlipCards();
  initAiTextDecodeAnimation();
}

/**
 * Fixed Dark Mode Controller (기본 다크 모드 고정)
 */
function initAmbientThemeController() {
  document.documentElement.classList.add("dark");
}

// Robust loading fallback to guarantee initialization even if DOMContentLoaded has already fired in the container preview
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}

/**
 * Custom Camera Video Pointer Logic
 */
function initCustomCursor() {
  // Mobile / touch safety check: disable custom cursor on touch devices
  if (window.matchMedia("(hover: none), (pointer: coarse)").matches) {
    return;
  }

  // Check if cursor elements already exist to prevent duplicates
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

  // Use GSAP set for exact centered transforms (-50%, -50%)
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

  const showCursor = () => {
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

  const hideCursor = () => {
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

  const onMouseMove = (e: MouseEvent) => {
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

  // Handle cursor visibility relative to viewport boundaries
  document.addEventListener("mouseleave", hideCursor);
  document.addEventListener("mouseenter", showCursor);

  window.addEventListener("mouseout", (e: MouseEvent) => {
    if (!e.relatedTarget && !(e as any).toElement) {
      hideCursor();
    }
  });

  // Tactile click shockwave
  const triggerClickFX = (x: number, y: number) => {
    if (typeof gsap === "undefined") return;

    // 1. Expanding shockwave ring
    const ripple = document.createElement("div");
    ripple.className = "custom-cursor-ripple";
    document.body.appendChild(ripple);

    gsap.set(ripple, {
      x: x,
      y: y,
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
      onComplete: () => ripple.remove(),
    });
  };

  const onMouseDown = (e: MouseEvent) => {
    if (typeof gsap !== "undefined") {
      gsap.to(dot, { scale: 0.4, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { scale: 0.85, duration: 0.1, ease: "power2.out" });
    }
    triggerClickFX(e.clientX, e.clientY);
  };

  const onMouseUp = () => {
    if (typeof gsap !== "undefined") {
      gsap.to(dot, { scale: 1, duration: 0.12, ease: "power2.out" });
      gsap.to(ring, { scale: 1, duration: 0.12, ease: "power2.out" });
    }
  };

  window.addEventListener("mousedown", onMouseDown, { passive: true });
  window.addEventListener("mouseup", onMouseUp, { passive: true });

  // Event Delegation for Interactive Elements (catches static & dynamic elements)
  document.addEventListener("mouseover", (e) => {
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

  document.addEventListener("mouseout", (e) => {
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

/**
 * 2. Vertical Scroll Anchor Navigation Logic (Desktop & Mobile Viewports)
 * Seamlessly manages anchor targeting, smooth native scroll actions, and state preservation.
 */
function initHorizontalScroll() {
  // Dot Pagination clicks
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index") || "0", 10);
      scrollToIndex(index);
    });
  });

  // Header Nav links clicks
  const navLinks = document.querySelectorAll(".desktop-nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const index = parseInt(link.getAttribute("data-index") || "0", 10);
      scrollToIndex(index);
    });
  });

  // Global smooth scroll interceptor for any hash link
  document.body.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (!anchor) return;
    
    const href = anchor.getAttribute("href");
    if (href && href.startsWith("#")) {
      let targetId = href.substring(1);
      
      // Map simple hashes to actual section element IDs
      const sectionMapping: Record<string, string> = {
        "hero": "section-hero",
        "about": "section-about",
        "process": "section-process",
        "portfolio": "section-portfolio",
        "hub": "section-hub",
        "contact": "section-contact"
      };
      
      if (sectionMapping[targetId]) {
        targetId = sectionMapping[targetId];
      }
      
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
}

/**
 * Scrolls smoothly to a specific section by index (0-5)
 */
function scrollToIndex(index: number) {
  const sections = ["section-hero", "section-about", "section-process", "section-portfolio", "section-hub", "section-contact"];
  
  if (index < 0 || index >= sections.length) return;

  const targetEl = document.getElementById(sections[index]);
  if (targetEl) {
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/**
 * 3. Element Visibility-based Navigation Highlight (Unified PC & Mobile Scroll Sync)
 */
function updateNavState(index: number) {
  // Highlight Header Links
  const navLinks = document.querySelectorAll(".desktop-nav-link");
  navLinks.forEach((link, idx) => {
    if (idx === index) {
      link.classList.add("text-blue-600", "font-bold");
      link.classList.remove("text-slate-600");
    } else {
      link.classList.remove("text-blue-600", "font-bold");
      link.classList.add("text-slate-600");
    }
  });

  // Highlight Pagination Dots
  const dots = document.querySelectorAll(".pagination-dot");
  dots.forEach((dot, idx) => {
    if (idx === index) {
      dot.classList.add("bg-blue-600", "scale-125");
      dot.classList.remove("bg-slate-300");
    } else {
      dot.classList.remove("bg-blue-600", "scale-125");
      dot.classList.add("bg-slate-300");
    }
  });
}

/**
 * Scroll Intersection Observer to light up correct header nodes automatically
 */
function initIntersectionObserver() {
  const sections = ["section-hero", "section-about", "section-process", "section-portfolio", "section-hub", "section-contact"];
  
  const observerOptions = {
    root: null,
    rootMargin: "-35% 0px -45% 0px", // Triggers active highlight when section passes through viewport sweet spot
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const index = sections.indexOf(id);
        if (index !== -1) {
          updateNavState(index);
        }
      }
    });
  }, observerOptions);

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  // Window scroll hook for header opacity and shadow effects
  window.addEventListener("scroll", () => {
    const header = document.getElementById("site-header");
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("glass", "py-4", "shadow-lg");
        header.classList.remove("bg-transparent", "py-6");
      } else {
        header.classList.remove("glass", "py-4", "shadow-lg");
        header.classList.add("bg-transparent", "py-6");
      }
    }
  });
}

/**
 * 4. Work Process Interactive Timeline Step Selection
 * Clicking nodes fills the path line and fades in structural descriptions via GSAP.
 */
function initProcessTimeline() {
  const buttons = document.querySelectorAll(".process-step-btn");
  const timelineBar = document.getElementById("process-timeline-bar");
  const container = document.getElementById("process-detail-container");

  if (buttons.length === 0 || !timelineBar || !container) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const stepNum = parseInt(btn.getAttribute("data-step") || "1", 10);
      const data = PROCESS_DATA[stepNum];
      if (!data) return;

      // Update active styling of triggers
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

      // Animate timeline vertical line (PC only)
      // Percentage map: 1 -> 0%, 2 -> 33%, 3 -> 66%, 4 -> 100%
      const percentage = ((stepNum - 1) / 3) * 100;
      timelineBar.style.height = `${percentage}%`;

      // Update massive background outline number
      const bgNum = document.getElementById("process-bg-num");
      if (bgNum) bgNum.textContent = data.bgNum;

      const updateContent = () => {
        // Re-render HTML details safely
        const titleEl = document.getElementById("process-title");
        const subtitleEl = document.getElementById("process-subtitle");
        const bulletsEl = document.getElementById("process-bullets");

        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;
        
        if (bulletsEl) {
          bulletsEl.innerHTML = ""; // Clear
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

      // Animate the details fading smoothly
      if (typeof gsap !== "undefined") {
        gsap.to(container, {
          opacity: 0,
          y: -10,
          duration: 0.25,
          onComplete: () => {
            updateContent();
            // Trigger smooth fade back in
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

/**
 * Automatically fetch and update real YouTube video titles & attributes via oEmbed
 */
function initYouTubeTitleFetcher() {
  const cards = document.querySelectorAll(".portfolio-card[data-video-id]");
  if (cards.length === 0) return;

  cards.forEach(async (card) => {
    const videoId = card.getAttribute("data-video-id");
    if (!videoId) return;

    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
      if (!res.ok) return;
      const data = await res.json();

      if (data && data.title) {
        card.setAttribute("data-title", data.title);
        card.setAttribute("title", data.title);
        if (data.author_name) {
          card.setAttribute("data-author", data.author_name);
        }

        const titleEl = card.querySelector("h3");
        if (titleEl) {
          titleEl.textContent = data.title;
        }
      }
    } catch (err) {
      console.warn("YouTube title fetch fallback for ID:", videoId, err);
    }
  });
}

/**
 * 5. YouTube Portfolio Cards & Popup Modal Handler
 */
function initPortfolioModal() {
  const cards = document.querySelectorAll(".portfolio-card");
  const modal = document.getElementById("video-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close");
  const container = document.getElementById("modal-player-container");

  if (cards.length === 0 || !modal || !backdrop || !closeBtn || !container) return;

  // Fetch real YouTube video titles and set attributes automatically
  initYouTubeTitleFetcher();

  const openModal = (videoId: string) => {
    document.body.classList.add("modal-open");
    modal.classList.remove("pointer-events-none");
    modal.classList.add("opacity-100");

    // Embed YouTube responsive iframe
    container.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1" 
              class="w-full h-full border-0" 
              allow="autoplay; encrypted-media" 
              allowfullscreen>
      </iframe>
    `;

    const modalBox = modal.querySelector(".relative") as HTMLElement;
    if (modalBox) {
      modalBox.classList.remove("scale-90");
      modalBox.classList.add("scale-100");
    }

    // GSAP high-end transition fallback
    if (typeof gsap !== "undefined") {
      gsap.to(modal, {
        opacity: 1,
        duration: 0.35,
        ease: "power2.out"
      });

      if (modalBox) {
        gsap.to(modalBox, {
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.2)"
        });
      }
    }
  };

  const closeModal = () => {
    const modalBox = modal.querySelector(".relative") as HTMLElement;
    
    if (modalBox) {
      modalBox.classList.remove("scale-100");
      modalBox.classList.add("scale-90");
    }
    
    modal.classList.add("pointer-events-none");
    modal.classList.remove("opacity-100");

    const cleanup = () => {
      container.innerHTML = ""; // Stop playing video by destroying iframe
      document.body.classList.remove("modal-open");
    };

    // GSAP exit animations fallback
    if (typeof gsap !== "undefined") {
      if (modalBox) {
        gsap.to(modalBox, {
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in"
        });
      }

      gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: cleanup
      });
    } else {
      cleanup();
    }
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const videoId = card.getAttribute("data-video-id");
      if (videoId) openModal(videoId);
    });
  });

  // Filter tabs click handler
  const filterTabs = document.querySelectorAll(".portfolio-tab-btn");
  filterTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const filter = tab.getAttribute("data-filter") || "all";

      // Update tab button styles
      filterTabs.forEach((t) => {
        t.classList.remove("active", "bg-blue-600", "text-white", "shadow-md");
        t.classList.add("text-slate-600", "bg-slate-100");
      });
      tab.classList.add("active", "bg-blue-600", "text-white", "shadow-md");
      tab.classList.remove("text-slate-600", "bg-slate-100");

      // Filter portfolio cards
      cards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const el = card as HTMLElement;
        if (filter === "all" || category === filter) {
          el.style.display = "flex";
          if (typeof gsap !== "undefined") {
            gsap.fromTo(el, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" });
          }
        } else {
          el.style.display = "none";
        }
      });
    });
  });

  backdrop.addEventListener("click", closeModal);
  closeBtn.addEventListener("click", closeModal);
}

/**
 * 6. Contact Form validation, Category pill toggle, and success Toast feedback
 */
function initContactForm() {
  const form = document.getElementById("b2b-contact-form") as HTMLFormElement;
  const catButtons = document.querySelectorAll(".form-cat-btn");
  const categoryInput = document.getElementById("form-category") as HTMLInputElement;
  const toast = document.getElementById("success-toast");

  if (!form || catButtons.length === 0 || !categoryInput || !toast) return;

  // Category select toggle
  catButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = btn.getAttribute("data-val") || "영상 제작";
      categoryInput.value = value;

      // Update button visual styles
      catButtons.forEach((b) => {
        b.classList.remove("border-blue-600", "bg-blue-600", "text-white", "shadow-xs");
        b.classList.add("border-slate-200", "bg-slate-100", "text-slate-600");
      });

      btn.classList.add("border-blue-600", "bg-blue-600", "text-white", "shadow-xs");
      btn.classList.remove("border-slate-200", "bg-slate-100", "text-slate-600");
    });
  });

  // Handle submit action
  form.addEventListener("submit", (e: Event) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']") as HTMLButtonElement;
    const origText = submitBtn.textContent || "프로젝트 문의 제출하기";

    // Set loading indicator
    submitBtn.disabled = true;
    submitBtn.textContent = "상담 접수 전송 중...";
    submitBtn.classList.add("opacity-70");

    // Secure simulated network post
    setTimeout(() => {
      // Restore Button
      submitBtn.disabled = false;
      submitBtn.textContent = origText;
      submitBtn.classList.remove("opacity-70");

      // Reset form
      form.reset();

      // Reset category to default (영상 제작)
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

      // Show Toast success overlay with GSAP fallback
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

      // Hide toast automatically after 4.5 seconds
      setTimeout(() => {
        const cleanupToast = () => {
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

/**
 * 7. Mobile Drawer Navigation overlay toggling
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mobile-menu-close");
  const menu = document.getElementById("mobile-menu");
  const links = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !closeBtn || !menu) return;

  const openMenu = () => {
    menu.classList.remove("-translate-y-full", "pointer-events-none");
    menu.classList.add("pointer-events-auto");
    document.body.style.overflow = "hidden"; // Prevent background scroll

    // Stagger animate menu nodes
    if (typeof gsap !== "undefined") {
      gsap.fromTo(links, 
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

  const closeMenu = () => {
    menu.classList.add("-translate-y-full", "pointer-events-none");
    menu.classList.remove("pointer-events-auto");
    document.body.style.overflow = ""; // Restore scroll
  };

  toggleBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);

  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
      
      // Allow scroll completion before releasing body lock
      setTimeout(() => {
        document.body.style.overflow = "";
      }, 300);
    });
  });
}

function initAboutSlider() {
  const showcase = document.getElementById("about-showcase");
  const showcaseContent = document.getElementById("about-showcase-content");
  const tabButtons = document.querySelectorAll(".about-tab-btn");
  const shutterLine = document.getElementById("shutter-flash-line");
  
  if (!showcase || !showcaseContent || tabButtons.length === 0) return;

  let currentIdx = 0;
  let autoTimer: any = null;
  const slideDuration = 4500; // 4.5 seconds

  // Interactive 3D Tilt & Lens Spotlight Effect on Mouse Hover
  showcase.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = showcase.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate percentage for spotlight gradient position
    const posX = (x / rect.width) * 100;
    const posY = (y / rect.height) * 100;
    showcase.style.setProperty("--mouse-x", `${posX}%`);
    showcase.style.setProperty("--mouse-y", `${posY}%`);

    // Calculate subtle 3D tilt angles (-7deg to +7deg)
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

  // Mobile Touch Swipe Gesture Handler (Non-blocking passive scroll)
  let touchStartX = 0;
  let touchStartY = 0;
  showcase.addEventListener("touchstart", (e: TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  showcase.addEventListener("touchend", (e: TouchEvent) => {
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
  }, { passive: true });

  const updateShowcase = (index: number) => {
    currentIdx = index;
    const data = ABOUT_PILLARS[index];

    // Helper to update active styles on tabs
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
          // Force layout reflow
          activeBar.offsetHeight;
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

    const performContentUpdate = () => {
      // Right side showcase
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

      // Left side column
      const leftNumEl = document.getElementById("about-left-number");
      const leftEyebrowEl = document.getElementById("about-left-eyebrow");
      const leftTitleEl = document.getElementById("about-left-title");
      const leftDescEl = document.getElementById("about-left-desc");

      if (leftNumEl) leftNumEl.textContent = data.number;
      if (leftEyebrowEl) leftEyebrowEl.textContent = data.leftEyebrow;
      if (leftTitleEl) leftTitleEl.innerHTML = data.leftTitle;
      if (leftDescEl) leftDescEl.textContent = data.leftDesc;
    };

    // Cinematic Viewfinder Camera Shutter Focus Transition
    if (typeof gsap !== "undefined") {
      const leftCol = document.getElementById("about-left-col");
      
      // Trigger Shutter Line scan
      if (shutterLine) {
        gsap.fromTo(shutterLine, 
          { top: "0%", opacity: 0.9 },
          { top: "100%", opacity: 0, duration: 0.4, ease: "power2.inOut" }
        );
      }

      // Scale down card slightly as lens refocuses
      gsap.to(showcase, {
        scale: 0.985,
        duration: 0.18,
        ease: "power2.in",
        onComplete: () => {
          performContentUpdate();
          // Animate card back to scale 1 with lens focus snap
          gsap.to(showcase, {
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.4)"
          });
          // Content fade + stagger lift
          gsap.fromTo(showcaseContent, 
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
          );
          if (leftCol) {
            gsap.fromTo(leftCol, 
              { opacity: 0, x: -15 },
              { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" }
            );
          }
        }
      });
    } else {
      performContentUpdate();
    }
  };

  const startAutoCycle = () => {
    stopAutoCycle();
    autoTimer = setInterval(() => {
      const nextIdx = (currentIdx + 1) % ABOUT_PILLARS.length;
      updateShowcase(nextIdx);
    }, slideDuration);
  };

  const stopAutoCycle = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  // Add click events to tab buttons
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-about-tab") || "0", 10);
      if (idx === currentIdx) return;
      updateShowcase(idx);
      startAutoCycle(); // Restart cycle from selected slide
    });
  });

  // Initial render of first slide
  updateShowcase(0);
  startAutoCycle();
}

/**
 * 3D Platform Card Flip Controller
 * Supports hover and click/tap to toggle flip state.
 */
function initFlipCards() {
  const containers = document.querySelectorAll(".flip-card-container");
  containers.forEach((container) => {
    container.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      // Do not flip if user clicks an external link or button inside the card
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

/**
 * AI Cybernetic Text Decode Animation (Typography)
 * Rapidly scrambles section headlines through random cyber symbols before resolving cleanly into Korean text.
 */
function initAiTextDecodeAnimation() {
  // Target major section h2 headlines and any elements with .ai-decode-text
  const headlines = document.querySelectorAll<HTMLElement>("section h2, .ai-decode-text");
  if (!headlines.length) return;

  const symbols = "01X#*$%&@!?/<>[]{}=";

  const scrambleElement = (el: HTMLElement) => {
    if (el.dataset.scrambling === "true") return;
    el.dataset.scrambling = "true";

    // Collect all text nodes inside element to scramble text while preserving HTML tags (e.g. <span class="text-blue-600">)
    const textNodes: { node: Text; originalText: string }[] = [];

    const findTextNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const txt = node.nodeValue || "";
        if (txt.trim().length > 0) {
          textNodes.push({ node: node as Text, originalText: txt });
        }
      } else {
        node.childNodes.forEach((child) => findTextNodes(child));
      }
    };

    findTextNodes(el);
    if (!textNodes.length) {
      el.dataset.scrambling = "false";
      return;
    }

    const duration = 500; // 0.5s total scramble
    const frames = 18;
    const intervalMs = duration / frames;
    let currentFrame = 0;

    const timer = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / frames;

      textNodes.forEach(({ node, originalText }) => {
        const len = originalText.length;
        const revealedCount = Math.floor(progress * len);

        const scrambled = originalText
          .split("")
          .map((char, idx) => {
            // Keep spaces, tabs, and newlines unchanged
            if (char === " " || char === "\n" || char === "\r" || char === "\t") return char;
            if (idx < revealedCount) return char;
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join("");

        node.nodeValue = scrambled;
      });

      if (currentFrame >= frames) {
        clearInterval(timer);
        // Restore all original text nodes
        textNodes.forEach(({ node, originalText }) => {
          node.nodeValue = originalText;
        });
        el.dataset.scrambling = "false";
      }
    }, intervalMs);
  };

  // IntersectionObserver to trigger when section headline scrolls into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          scrambleElement(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 }
  );

  headlines.forEach((el) => observer.observe(el));
}




