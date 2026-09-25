"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { PillButton } from "@/components/ui/PillButton";

const sectionIds = site.nav.map((link) => link.href.slice(1));

function NavPill({ active, tone }: { active: string; tone: "glass" | "dark" }) {
  const surface =
    tone === "glass" ? "bg-white/[.18] backdrop-blur-md" : "bg-[rgba(17,17,17,.7)] backdrop-blur-md shadow-lg shadow-black/10";

  return (
    <ul className={`flex items-center rounded-full p-1 ${surface}`}>
      {site.nav.map((link) => {
        const isActive = link.href === `#${active}`;
        return (
          <li key={link.href}>
            <a
              href={link.href}
              aria-current={isActive ? "location" : undefined}
              className={`block rounded-full px-3 py-[10px] text-[13px] leading-none transition-colors duration-200 lg:px-[18px] lg:text-sm ${
                isActive ? "bg-white text-ink" : "text-white hover:bg-white/15"
              }`}
            >
              {link.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function SiteHeader() {
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(sectionIds[0]);
  const [menuOpen, setMenuOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  // Pin the nav once the hero has scrolled away, and highlight the section in view.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.getElementById("home");
      setPinned(hero ? hero.getBoundingClientRect().bottom < 0 : false);

      const line = window.innerHeight * 0.35;
      let current = sectionIds[0];
      let bestTop = -Infinity;
      for (const id of sectionIds) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > bestTop) {
          bestTop = top;
          current = id;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Mobile menu: lock page scroll, move focus in, trap Tab, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeButton.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        opener.current?.focus({ preventScroll: true });
        return;
      }
      if (event.key !== "Tab" || !dialog.current) return;
      const focusables = dialog.current.querySelectorAll<HTMLElement>("a[href], button");
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    opener.current = event.currentTarget;
    setMenuOpen(true);
  };
  const closeMenu = () => {
    setMenuOpen(false);
    opener.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <header className="on-dark absolute inset-x-0 top-3 z-30 text-white md:top-4 lg:top-6">
        <div className="shell shell-pad relative flex items-center justify-between pt-6 md:pt-[26px]">
          <a
            href="#home"
            aria-label={site.brand.name}
            className="text-[15px] leading-[1.1] font-semibold tracking-[-0.02em] lg:text-base"
          >
            {site.brand.logoLines[0]}
            <br />
            {site.brand.logoLines[1]}
          </a>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <NavPill active={active} tone="glass" />
          </nav>

          <a
            href={site.brand.phone.href}
            aria-label={`Call ${site.brand.phone.label}`}
            className="hidden size-11 place-items-center rounded-full bg-white text-ink md:grid lg:hidden"
          >
            <Phone aria-hidden size={16} strokeWidth={1.75} />
          </a>
          <div className="hidden lg:block">
            <PillButton
              href={site.brand.phone.href}
              variant="light"
              leadingIcon={<Phone aria-hidden size={14} strokeWidth={1.75} />}
            >
              {site.brand.phone.label}
            </PillButton>
          </div>

          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="grid size-11 place-items-center rounded-full bg-white/[.18] backdrop-blur-md md:hidden"
          >
            <Menu aria-hidden size={20} strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {pinned && (
          <motion.div
            key="pinned-nav"
            className="on-dark pointer-events-none fixed inset-x-0 top-4 z-40 flex justify-center px-4 md:justify-center"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <nav aria-label="Sticky" className="pointer-events-auto hidden md:block">
              <NavPill active={active} tone="dark" />
            </nav>
            <button
              type="button"
              onClick={openMenu}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="pointer-events-auto ml-auto grid size-11 place-items-center rounded-full bg-[rgba(17,17,17,.7)] text-white backdrop-blur-md md:hidden"
            >
              <Menu aria-hidden size={20} strokeWidth={1.75} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="on-dark fixed inset-0 z-50 flex flex-col bg-black px-6 pt-6 pb-10 text-white md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-base leading-[1.1] font-semibold tracking-[-0.02em]">
                {site.brand.logoLines[0]}
                <br />
                {site.brand.logoLines[1]}
              </span>
              <button
                ref={closeButton}
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-full bg-white/10"
              >
                <X aria-hidden size={20} strokeWidth={1.75} />
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-16">
              <ul className="space-y-2">
                {site.nav.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={link.href === `#${active}` ? "location" : undefined}
                      className={`text-[44px] leading-[1.15] font-medium tracking-[-0.03em] ${
                        link.href === `#${active}` ? "text-white" : "text-white/55"
                      }`}
                    >
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="mt-auto">
              <PillButton
                href={site.brand.phone.href}
                variant="light"
                leadingIcon={<Phone aria-hidden size={14} strokeWidth={1.75} />}
              >
                {site.brand.phone.label}
              </PillButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
