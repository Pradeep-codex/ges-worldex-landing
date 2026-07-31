"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function WelcomeLine() {
  const reduceMotion = useReducedMotion();

  const prefix = useMemo(() => "Welcome to GES Worldex", []);
  const separator = useMemo(() => " — ", []);
  const suffix = useMemo(() => "Global Exhibitions and Services", []);
  const text = useMemo(() => `${prefix}${separator}${suffix}`, [prefix, separator, suffix]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setCount(text.length);
      return;
    }

    setCount(0);
    const speedMs = 22;
    const timer = window.setInterval(() => {
      setCount((c) => (c >= text.length ? c : c + 1));
    }, speedMs);

    return () => window.clearInterval(timer);
  }, [reduceMotion, text]);

  const shown = text.slice(0, count);
  const shownPrefix = shown.slice(0, prefix.length);
  const shownSeparator = shown.slice(prefix.length, prefix.length + separator.length);
  const shownSuffix = shown.slice(prefix.length + separator.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
      className="pointer-events-none select-none"
    >
      <h2
        aria-label={text}
        className={
          "welcome-display-font text-left font-black tracking-tight whitespace-normal break-words " +
          "leading-[1.2] md:leading-[1.1]"
        }
        style={{ color: "var(--about-text-primary)" }}
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          <span className="text-[24px] sm:text-[30px] md:text-[40px] lg:text-[52px]">
            {shownPrefix}
          </span>
          <span className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[26px] opacity-80">
            {shownSeparator}
          </span>
          <span className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[34px] font-extrabold">
            {shownSuffix}
            {count < text.length ? <span className="type-caret" /> : null}
          </span>
        </span>
      </h2>
    </motion.div>
  );
}
