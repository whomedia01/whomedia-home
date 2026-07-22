/**
 * @file portfolioModal.ts
 * @description YouTube oEmbed Metadata Fetcher, Portfolio Category Filter Tabs, & Fullscreen Video Modal.
 */

import { YouTubeOEmbedResponse } from "../types.ts";

declare const gsap: any;

/**
 * Asynchronously fetches YouTube metadata via oEmbed API to automatically set real titles.
 *
 * @returns {Promise<void>}
 */
export async function initYouTubeTitleFetcher(): Promise<void> {
  const cards = document.querySelectorAll(".portfolio-card[data-video-id]");
  if (cards.length === 0) return;

  cards.forEach(async (card) => {
    const videoId = card.getAttribute("data-video-id");
    if (!videoId) return;

    try {
      const res = await fetch(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
      if (!res.ok) return;
      const data: YouTubeOEmbedResponse = await res.json();

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
      // Non-critical metadata fallback
      console.warn("YouTube title fetch fallback for ID:", videoId, err);
    }
  });
}

/**
 * Initializes portfolio card click events, video popup modal embedding, and category filter buttons.
 *
 * @returns {void}
 */
export function initPortfolioModal(): void {
  const cards = document.querySelectorAll(".portfolio-card");
  const modal = document.getElementById("video-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close");
  const container = document.getElementById("modal-player-container");

  if (cards.length === 0 || !modal || !backdrop || !closeBtn || !container) return;

  // Initialize YouTube oEmbed title auto-population
  initYouTubeTitleFetcher();

  const openModal = (videoId: string): void => {
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

    if (typeof gsap !== "undefined") {
      gsap.to(modal, { opacity: 1, duration: 0.35, ease: "power2.out" });
      if (modalBox) {
        gsap.to(modalBox, { scale: 1, duration: 0.45, ease: "back.out(1.2)" });
      }
    }
  };

  const closeModal = (): void => {
    const modalBox = modal.querySelector(".relative") as HTMLElement;

    if (modalBox) {
      modalBox.classList.remove("scale-100");
      modalBox.classList.add("scale-90");
    }

    modal.classList.add("pointer-events-none");
    modal.classList.remove("opacity-100");

    const cleanup = (): void => {
      container.innerHTML = ""; // Stop playing video by destroying iframe
      document.body.classList.remove("modal-open");
    };

    if (typeof gsap !== "undefined") {
      if (modalBox) {
        gsap.to(modalBox, { scale: 0.9, duration: 0.3, ease: "power2.in" });
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

      filterTabs.forEach((t) => {
        t.classList.remove("active", "bg-blue-600", "text-white", "shadow-md");
        t.classList.add("text-slate-600", "bg-slate-100");
      });
      tab.classList.add("active", "bg-blue-600", "text-white", "shadow-md");
      tab.classList.remove("text-slate-600", "bg-slate-100");

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
