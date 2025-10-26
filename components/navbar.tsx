"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import DarkModeToggle from "./DarkModeToggle";
import Link from "next/link";
import { navItems } from "./navItems";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const itemRefs = useRef<HTMLLIElement[]>([]); // store refs for each nav item
  const [highlightStyle, setHighlightStyle] = useState({ left: 0, width: 0 });
  const [highlightStyleNow, setHighlightStyleNow] = useState({
    left: 0,
    width: 0,
  });
  const pathname = usePathname();

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.href === pathname);
    if (activeIndex === -1) return;

    const activeEl = itemRefs.current[activeIndex];
    const PADDING = 16; // shrink both sides by 4px each

    if (activeEl) {
      const { offsetLeft, offsetWidth } = activeEl;

      // Active highlight (current page)
      setHighlightStyleNow({
        left: offsetLeft + PADDING / 2,
        width: offsetWidth - PADDING,
      });

      // Initial hover highlight also set to active by default
      setHighlightStyle({
        left: offsetLeft + PADDING / 2,
        width: offsetWidth - PADDING,
      });
    }
  }, [pathname]);

  return (
    <nav className="w-full relative z-10 text-text-primary-light dark:text-text-primary-dark shadow-default transition-colors duration-300">
      {/* Frosted background layer */}
      <div className="absolute inset-0 bg-green-500/20 backdrop-blur-sm rounded-b-xl shadow-md z-0"></div>

      <div className="relative max-w-6xl mx-auto flex items-center justify-between px-6 py-4 z-10">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <h1 className="font-heading font-extrabold text-xl select-none z-10">
            Brand
          </h1>

          {/* Mobile Home Link */}
          <div className="sm:hidden">
            <Link
              href="/"
              className={`cursor-pointer font-bold transition-colors duration-200 hover:text-navbar-hover-light dark:hover:text-navbar-hover-dark font-heading ${
                pathname === "/" ? "underline" : ""
              }`}
            >
              Home
            </Link>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 z-10">
          <ul className="flex items-center relative z-10 ">
            {navItems.map((item, index) => (
              <li
                key={item.name}
                ref={(el) => {
                  itemRefs.current[index] = el!;
                }}
                onMouseEnter={() => {
                  const linkEl = itemRefs.current[index].querySelector("a");
                  if (!linkEl) return;
                  const { offsetLeft, offsetWidth } = linkEl;
                  const PADDING = 16;
                  setHighlightStyle({
                    left: offsetLeft + PADDING / 2,
                    width: offsetWidth - PADDING,
                  });
                }}
                onMouseLeave={() => {
                  const activeIndex = navItems.findIndex(
                    (i) => i.href === pathname
                  );
                  const activeEl = itemRefs.current[activeIndex];
                  if (!activeEl) return;
                  const linkEl = activeEl.querySelector("a");
                  if (!linkEl) return;
                  const { offsetLeft, offsetWidth } = linkEl;
                  const PADDING = 16;
                  setHighlightStyle({
                    left: offsetLeft + PADDING / 2,
                    width: offsetWidth - PADDING,
                  });
                }}
              >
                <Link
                  href={item.href}
                  className="relative z-10 block px-5 py-2 cursor-pointer font-bold transition-colors duration-200 font-heading"
                >
                  {item.name}
                </Link>
              </li>
            ))}

            {/* Highlight rectangles */}
            <div
              className="absolute top-0 h-full rounded-md backdrop-blur-md transition-all duration-300 pointer-events-none opacity-10 z-0 bg-surface-dark dark:bg-surface-light"
              style={{
                left: highlightStyle.left,
                width: highlightStyle.width,
              }}
            />
            <div
              className="absolute top-0 h-full rounded-md border-2 border-border-dark dark:border-border-light transition-all duration-300 pointer-events-none z-0"
              style={{
                left: highlightStyleNow.left,
                width: highlightStyleNow.width,
              }}
            />
          </ul>

          <div className="ml-4"></div>
        </div>

        <div className="hidden sm:block">
          <DarkModeToggle />
        </div>

        {/* Hamburger Icon (mobile only) */}
        <button
          className="sm:hidden flex flex-col justify-center items-center cursor-pointer gap-1 w-8 h-8 z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-text-primary-light dark:bg-text-primary-dark transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-text-primary-light dark:bg-text-primary-dark transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-text-primary-light dark:bg-text-primary-dark transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          menuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <ul className="relative z-10 flex shadow-default rounded-b-x flex-col items-center gap-4 py-4 bg-green-500/20 backdrop-blur-none rounded-b-xl">
          {navItems
            .filter((item) => item.name !== "Home")
            .map((item) => {
              const isActive = item.href === pathname;
              return (
                <li key={item.name} onClick={() => setMenuOpen(false)}>
                  <Link
                    href={item.href}
                    className={`cursor-pointer font-bold transition-colors duration-200 hover:text-navbar-hover-light dark:hover:text-navbar-hover-dark font-heading
            ${isActive ? "underline" : ""}`}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          <li>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
