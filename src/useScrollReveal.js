import { useEffect } from "react";

// One observer for the page; revealed content stays visible across language changes.
export function useScrollReveal() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches || !("IntersectionObserver" in window)) return;

    const elements = [
      ...document.querySelectorAll(
        [
          ".section-head",
          ".service",
          ".why-grid > div:first-child",
          ".value",
          ".steps > article",
          ".partner-grid > article",
          ".about > div",
          ".contact-grid > div:first-child",
          ".contact-details > *",
          ".footer-top",
          ".footer-bottom",
        ].join(","),
      ),
    ];

    const reveal = (element, delay = 0) => {
      element.style.setProperty("--reveal-delay", `${delay}ms`);
      element.dataset.reveal = "visible";
      observer.unobserve(element);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        const groups = new Map();
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          const index = groups.get(target.parentElement) ?? 0;
          groups.set(target.parentElement, index + 1);
          reveal(target, Math.min(index, 3) * 85);
        });
      },
      { threshold: 0, rootMargin: "0px 0px -30px 0px" },
    );

    // Read positions before writing styles. Keep the initial viewport visible.
    const belowFold = elements.filter(
      (element) => element.getBoundingClientRect().top >= window.innerHeight,
    );
    belowFold.forEach((element) => {
      element.dataset.reveal = "pending";
      observer.observe(element);
    });

    const onFocus = (event) => {
      const element = event.target.closest('[data-reveal="pending"]');
      if (element) reveal(element);
    };
    const onMotionChange = () => {
      if (!motion.matches) return;
      belowFold.forEach((element) => reveal(element));
      observer.disconnect();
    };
    document.addEventListener("focusin", onFocus);
    motion.addEventListener("change", onMotionChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", onFocus);
      motion.removeEventListener("change", onMotionChange);
      belowFold.forEach((element) => {
        delete element.dataset.reveal;
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);
}
