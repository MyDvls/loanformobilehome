import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectLanguage = (lang: "en" | "es") => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsOpen(false);
      buttonRef.current?.focus();
    }
  };

  return (
    <div className="relative mr-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDropdown}
        className="hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-400"
        title={i18n.language === "en" ? "Switch language" : "Cambiar idioma"}
        ref={buttonRef}
        aria-expanded={isOpen}
        aria-controls="language-dropdown"
      >
        <Globe className="h-5 w-5" />
      </Button>
      {isOpen && (
        <div
          id="language-dropdown"
          ref={dropdownRef}
          className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg dark:shadow-[0_4px_20px_rgba(0,0,0,0.2)] z-10"
          onKeyDown={handleKeyDown}
        >
          <ul className="py-1">
            <li>
              <button
                onClick={() => selectLanguage("en")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                English
              </button>
            </li>
            <li>
              <button
                onClick={() => selectLanguage("es")}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Spanish
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;