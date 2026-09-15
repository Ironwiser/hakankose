import React, { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { TR, DE, GB } from "country-flag-icons/react/3x2";
import { languages, languageNames, translate } from "./translations.js";
import "./language-switcher.css";

const flags = { tr: TR, de: DE, en: GB };

export function LanguageSwitcher({ language, onChange }) {
  const [expanded, setExpanded] = useState(false);
  const root = useRef(null);
  const trigger = useRef(null);
  const options = useRef([]);
  const id = useId();
  const Flag = flags[language];
  const label = translate("Dil seçimi", language);

  useEffect(() => {
    if (!expanded) return;
    options.current[languages.indexOf(language)]?.focus();
    const onPointerDown = (event) => {
      if (!root.current?.contains(event.target)) setExpanded(false);
    };
    const onFocusIn = (event) => {
      if (!root.current?.contains(event.target)) setExpanded(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [expanded, language]);

  function onKeyDown(event) {
    if (event.key === "Escape") {
      setExpanded(false);
      trigger.current?.focus();
      event.stopPropagation();
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    if (!expanded) {
      setExpanded(true);
      return;
    }
    const index = options.current.indexOf(document.activeElement);
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? languages.length - 1
          : (index + (event.key === "ArrowDown" ? 1 : -1) + languages.length) %
            languages.length;
    options.current[next]?.focus();
  }

  return (
    <div
      className="language-switcher"
      ref={root}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="language-trigger"
        ref={trigger}
        aria-label={`${label}: ${languageNames[language]}`}
        aria-expanded={expanded}
        aria-controls={id}
        onClick={() => setExpanded((value) => !value)}
      >
        <Flag className="language-flag" aria-hidden="true" />
        <span>{language.toUpperCase()}</span>
        <ChevronDown
          className="language-chevron"
          size={14}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <div
          className="language-dropdown"
          id={id}
          role="group"
          aria-label={label}
        >
          <span className="language-caption">{label}</span>
          {languages.map((code, index) => {
            const OptionFlag = flags[code];
            return (
              <button
                type="button"
                key={code}
                className="language-option"
                ref={(element) => {
                  options.current[index] = element;
                }}
                aria-pressed={language === code}
                onClick={() => {
                  onChange(code);
                  setExpanded(false);
                  trigger.current?.focus();
                }}
              >
                <OptionFlag className="language-flag" aria-hidden="true" />
                <span lang={code}>{languageNames[code]}</span>
                <span className="language-code">{code.toUpperCase()}</span>
                {language === code && (
                  <Check
                    className="language-check"
                    size={15}
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
