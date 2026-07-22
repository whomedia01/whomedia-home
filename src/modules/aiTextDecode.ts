/**
 * @file aiTextDecode.ts
 * @description Cybernetic AI Text Scramble & Decode Animation Controller.
 */

/**
 * Scrambles headlines through random cyber symbols before revealing original Korean text upon viewport intersection.
 *
 * @returns {void}
 */
export function initAiTextDecodeAnimation(): void {
  const headlines = document.querySelectorAll<HTMLElement>("section h2, .ai-decode-text");
  if (!headlines.length) return;

  const symbols = "01X#*$%&@!?/<>[]{}=";

  const scrambleElement = (el: HTMLElement): void => {
    if (el.dataset.scrambling === "true") return;
    el.dataset.scrambling = "true";

    const textNodes: { node: Text; originalText: string }[] = [];

    const findTextNodes = (node: Node): void => {
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
            if (char === " " || char === "\n" || char === "\r" || char === "\t") return char;
            if (idx < revealedCount) return char;
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join("");

        node.nodeValue = scrambled;
      });

      if (currentFrame >= frames) {
        clearInterval(timer);
        textNodes.forEach(({ node, originalText }) => {
          node.nodeValue = originalText;
        });
        el.dataset.scrambling = "false";
      }
    }, intervalMs);
  };

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
