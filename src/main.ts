/**
 * @file main.ts
 * @description Main application entry point for WHO Media (주식회사 후미디어).
 * Initializes all modular UI controllers, event listeners, and interactive visual effects.
 * @author AI Studio Assistant
 */

import { initGlobalScrollEnabler } from "./modules/globalScroll.ts";
import { initCustomCursor } from "./modules/customCursor.ts";
import { initMagneticButtons } from "./modules/magnetic.ts";
import { initHorizontalScroll, initIntersectionObserver } from "./modules/navigation.ts";
import { initProcessTimeline } from "./modules/processTimeline.ts";
import { initPortfolioModal } from "./modules/portfolioModal.ts";
import { initContactForm } from "./modules/contactForm.ts";
import { initMobileMenu } from "./modules/mobileMenu.ts";
import { initAboutSlider } from "./modules/aboutSlider.ts";
import { initFlipCards } from "./modules/flipCards.ts";
import { initAiTextDecodeAnimation } from "./modules/aiTextDecode.ts";

/**
 * Master initialization function to bootstrap all application modules sequentially.
 *
 * @returns {void}
 */
function initAll(): void {
  // 1. Force native vertical scrolling and clear any viewport locks
  initGlobalScrollEnabler();

  // 2. Set dark mode theme class
  document.documentElement.classList.add("dark");

  // 3. Initialize custom video camera pointer, click shockwave FX & magnetic CTA buttons
  initCustomCursor();
  initMagneticButtons();

  // 4. Initialize navigation handlers & IntersectionObserver section highlighting
  initHorizontalScroll();
  initIntersectionObserver();

  // 5. Initialize interactive component modules
  initAboutSlider();
  initProcessTimeline();
  initPortfolioModal();
  initContactForm();
  initMobileMenu();
  initFlipCards();
  initAiTextDecodeAnimation();
}

// Guarantee execution whether DOM is loading or already parsed
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAll);
} else {
  initAll();
}
