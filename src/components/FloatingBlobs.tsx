"use client";

import { useEffect, useMemo, useRef } from "react";

type BlobDef = {
  id: string;
  baseX: number; // 0..1
  baseY: number; // 0..1
  size: number; // px
  colorVar: "--pastel-1" | "--pastel-2" | "--pastel-3" | "--pastel-4";
  blur: number; // px
  opacity: number;
  drift: number; // px
};

export function FloatingBlobs() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const blobRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const blobs = useMemo<BlobDef[]>(
    () => [
      { id: "b1", baseX: 0.18, baseY: 0.22, size: 520, colorVar: "--pastel-2", blur: 48, opacity: 0.55, drift: 26 },
      { id: "b2", baseX: 0.78, baseY: 0.18, size: 460, colorVar: "--pastel-1", blur: 44, opacity: 0.5, drift: 22 },
      { id: "b3", baseX: 0.72, baseY: 0.78, size: 560, colorVar: "--pastel-3", blur: 52, opacity: 0.45, drift: 28 },
      { id: "b4", baseX: 0.14, baseY: 0.82, size: 480, colorVar: "--pastel-4", blur: 46, opacity: 0.44, drift: 24 },
    ],
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    let raf = 0;
    let vw = window.innerWidth;
    let vh = window.innerHeight;

    const pointer = { x: vw * 0.5, y: vh * 0.35, active: false };

    const state = blobs.map((b, idx) => {
      const x = b.baseX * vw;
      const y = b.baseY * vh;
      return {
        id: b.id,
        i: idx,
        x,
        y,
        vx: 0,
        vy: 0,
      };
    });

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
    };

    const onResize = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("mouseleave", onPointerLeave);
    window.addEventListener("resize", onResize);

    const loop = (t: number) => {
      const time = t * 0.001;

      for (const s of state) {
        const def = blobs[s.i];
        const el = blobRefs.current[s.id];
        if (!el) continue;

        const baseX = def.baseX * vw;
        const baseY = def.baseY * vh;

        const driftX =
          Math.sin(time * 0.55 + s.i * 1.2) * def.drift +
          Math.cos(time * 0.33 + s.i * 0.9) * (def.drift * 0.6);
        const driftY =
          Math.cos(time * 0.5 + s.i * 1.1) * def.drift +
          Math.sin(time * 0.29 + s.i * 0.7) * (def.drift * 0.7);

        const targetX = baseX + driftX;
        const targetY = baseY + driftY;

        // Spring back to base drift target
        const spring = 0.012;
        s.vx += (targetX - s.x) * spring;
        s.vy += (targetY - s.y) * spring;

        // Repel away from pointer within radius
        if (pointer.active) {
          const dx = s.x - pointer.x;
          const dy = s.y - pointer.y;
          const dist = Math.max(1, Math.hypot(dx, dy));
          const radius = 260 + def.size * 0.25;

          if (dist < radius) {
            const strength = (1 - dist / radius) * 2.0;
            const nx = dx / dist;
            const ny = dy / dist;
            s.vx += nx * strength * 2.8;
            s.vy += ny * strength * 2.8;
          }
        }

        // Damping for a soft "bounce"
        s.vx *= 0.9;
        s.vy *= 0.9;

        s.x += s.vx;
        s.y += s.vy;

        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0) translate3d(-50%, -50%, 0)`;
      }

      raf = window.requestAnimationFrame(loop);
    };

    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("mouseleave", onPointerLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [blobs]);

  return (
    <div ref={containerRef} className="floating-blobs" aria-hidden="true">
      {blobs.map((b) => (
        <div
          key={b.id}
          ref={(node) => {
            blobRefs.current[b.id] = node;
          }}
          className="floating-blob"
          style={{
            width: `${b.size}px`,
            height: `${b.size}px`,
            filter: `blur(${b.blur}px)`,
            opacity: b.opacity,
            background: `radial-gradient(circle at 30% 30%, var(${b.colorVar}) 0%, rgba(255,255,255,0) 62%)`,
          }}
        />
      ))}
    </div>
  );
}
