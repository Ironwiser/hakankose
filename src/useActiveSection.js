import { useEffect, useState } from "react";

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState("main");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const sections = document.querySelectorAll("main > section");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id || "main");
        }
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return activeSection;
}
