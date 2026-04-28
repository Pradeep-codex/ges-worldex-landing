"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./DomeGallery.module.css";

type GalleryImage = {
  src: string;
  alt: string;
};

type DomeGalleryProps = {
  images?: GalleryImage[];
  fit?: number;
  minRadius?: number;
  maxRadius?: number;
  maxVerticalRotationDeg?: number;
  segments?: number;
  dragSensitivity?: number;
  dragDampening?: number;
  grayscale?: boolean;
  overlayBlurColor?: string;
};

const DEFAULT_IMAGES: GalleryImage[] = [
  { src: "/exhibition/expo1.jpg", alt: "GES Worldex exhibition scene one" },
  { src: "/exhibition/expo2.jpg", alt: "GES Worldex exhibition scene two" },
  { src: "/exhibition/expo3.jpg", alt: "GES Worldex exhibition scene three" },
  { src: "/exhibition/expo4.jpg", alt: "GES Worldex exhibition scene four" },
  { src: "/exhibition/expo5.jpg", alt: "GES Worldex exhibition scene five" },
  { src: "/exhibition/expo6.jpg", alt: "GES Worldex exhibition scene six" },
  { src: "/about-images/abt1.JPG", alt: "GES Worldex gallery image one" },
  { src: "/about-images/abt2.JPG", alt: "GES Worldex gallery image two" },
  { src: "/about-images/abt3.JPG", alt: "GES Worldex gallery image three" },
] as const;

type DomeItem = {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const wrapAngleSigned = (deg: number) => {
  const angle = (((deg + 180) % 360) + 360) % 360;
  return angle - 180;
};

function buildItems(pool: GalleryImage[], segments: number): DomeItem[] {
  const xCols = Array.from({ length: segments }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, column) => {
    const ys = column % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const normalized = (pool.length ? pool : DEFAULT_IMAGES).map((image) => ({
    src: image.src,
    alt: image.alt,
  }));

  return coords.map((coord, index) => {
    const image = normalized[index % normalized.length];
    return { ...coord, src: image.src, alt: image.alt };
  });
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.8,
  minRadius = 600,
  maxRadius = Infinity,
  maxVerticalRotationDeg = 5,
  segments = 34,
  dragSensitivity = 20,
  dragDampening = 4,
  grayscale = false,
  overlayBlurColor = "rgba(10, 23, 35, 0.72)",
}: DomeGalleryProps) {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const pointerIdRef = useRef<number | null>(null);
  const pressedImageRef = useRef<GalleryImage | null>(null);
  const isDraggingRef = useRef(false);
  const didDragRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotationRef = useRef({ x: 0, y: 0 });
  const startPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastMoveRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const inertiaFrameRef = useRef<number | null>(null);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const node = sphereRef.current;
    if (!node) {
      return;
    }

    node.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaFrameRef.current !== null) {
      cancelAnimationFrame(inertiaFrameRef.current);
      inertiaFrameRef.current = null;
    }
  }, []);

  const startInertia = useCallback(() => {
    const friction = clamp(0.94 + dragDampening * 0.01, 0.94, 0.985);
    const threshold = 0.02;

    const step = () => {
      velocityRef.current.x *= friction;
      velocityRef.current.y *= friction;

      if (Math.abs(velocityRef.current.x) < threshold && Math.abs(velocityRef.current.y) < threshold) {
        inertiaFrameRef.current = null;
        return;
      }

      const nextX = clamp(
        rotationRef.current.x - velocityRef.current.y,
        -maxVerticalRotationDeg,
        maxVerticalRotationDeg,
      );
      const nextY = wrapAngleSigned(rotationRef.current.y + velocityRef.current.x);

      rotationRef.current = { x: nextX, y: nextY };
      applyTransform(nextX, nextY);
      inertiaFrameRef.current = requestAnimationFrame(step);
    };

    stopInertia();
    inertiaFrameRef.current = requestAnimationFrame(step);
  }, [applyTransform, dragDampening, maxVerticalRotationDeg, stopInertia]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.max(1, entry.contentRect.width);
      const height = Math.max(1, entry.contentRect.height);
      const minDim = Math.min(width, height);
      const radius = clamp(minDim * fit, minRadius, maxRadius);

      root.style.setProperty("--radius", `${Math.round(radius)}px`);
      root.style.setProperty("--segments-x", String(segments));
      root.style.setProperty("--segments-y", String(segments));
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");

      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    resizeObserver.observe(root);

    return () => {
      resizeObserver.disconnect();
    };
  }, [applyTransform, fit, grayscale, maxRadius, minRadius, overlayBlurColor, segments]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  useEffect(() => {
    return () => {
      stopInertia();
    };
  }, [stopInertia]);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage]);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!mainRef.current) {
      return;
    }

    stopInertia();
    pointerIdRef.current = event.pointerId;
    isDraggingRef.current = true;
    didDragRef.current = false;
    pressedImageRef.current = null;
    startRotationRef.current = { ...rotationRef.current };
    startPointerRef.current = { x: event.clientX, y: event.clientY };
    lastMoveRef.current = { x: event.clientX, y: event.clientY, time: performance.now() };
    velocityRef.current = { x: 0, y: 0 };

    const target = event.target as HTMLElement | null;
    const button = target?.closest("[data-dome-image-index]");
    const itemIndex = button?.getAttribute("data-dome-image-index");

    if (itemIndex !== null && itemIndex !== undefined) {
      const matchedItem = items[Number(itemIndex)];
      if (matchedItem) {
        pressedImageRef.current = { src: matchedItem.src, alt: matchedItem.alt };
      }
    }

    mainRef.current.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!isDraggingRef.current || pointerIdRef.current !== event.pointerId) {
      return;
    }

    const totalDx = event.clientX - startPointerRef.current.x;
    const totalDy = event.clientY - startPointerRef.current.y;
    const movedDistance = Math.hypot(totalDx, totalDy);

    if (movedDistance > 8) {
      didDragRef.current = true;
    }

    const nextX = clamp(
      startRotationRef.current.x - totalDy / dragSensitivity,
      -maxVerticalRotationDeg,
      maxVerticalRotationDeg,
    );
    const nextY = wrapAngleSigned(startRotationRef.current.y + totalDx / dragSensitivity);

    rotationRef.current = { x: nextX, y: nextY };
    applyTransform(nextX, nextY);

    const now = performance.now();
    const lastMove = lastMoveRef.current;
    if (lastMove) {
      const dt = Math.max(now - lastMove.time, 16);
      velocityRef.current = {
        x: ((event.clientX - lastMove.x) / dt) * 0.18,
        y: ((event.clientY - lastMove.y) / dt) * 0.18,
      };
    }

    lastMoveRef.current = { x: event.clientX, y: event.clientY, time: now };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerIdRef.current !== event.pointerId) {
      return;
    }

    isDraggingRef.current = false;
    pointerIdRef.current = null;
    mainRef.current?.releasePointerCapture(event.pointerId);

    if (!didDragRef.current && pressedImageRef.current) {
      setActiveImage(pressedImageRef.current);
    }
    pressedImageRef.current = null;

    if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
      startInertia();
    }
  };

  return (
    <>
      <div ref={rootRef} className={styles.root}>
        <main
          ref={mainRef}
          className={styles.main}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div ref={sphereRef} className={styles.sphere}>
            {items.map((item, index) => (
              <div
                key={`${item.x}-${item.y}-${index}`}
                className={styles.item}
                style={
                  {
                    "--offset-x": item.x,
                    "--offset-y": item.y,
                    "--item-size-x": item.sizeX,
                    "--item-size-y": item.sizeY,
                  } as React.CSSProperties
                }
              >
                <button
                  type="button"
                  className={styles.imageWrap}
                  data-dome-image-index={index}
                  aria-label={`Zoom ${item.alt}`}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setActiveImage({ src: item.src, alt: item.alt });
                    }
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1280px) 12vw, (min-width: 768px) 18vw, 28vw"
                    className={styles.image}
                  />
                  <div className={styles.imageScrim} />
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {typeof document !== "undefined" && activeImage
        ? createPortal(
            <div className={styles.zoomOverlay} role="dialog" aria-modal="true" aria-label={activeImage.alt}>
              <button
                type="button"
                className={styles.zoomBackdrop}
                aria-label="Close image zoom"
                onClick={() => setActiveImage(null)}
              />
              <div className={styles.zoomPanel}>
                <button
                  type="button"
                  className={styles.zoomClose}
                  aria-label="Close image zoom"
                  onClick={() => setActiveImage(null)}
                >
                  <X className="h-5 w-5" />
                </button>
                <div className={styles.zoomImageWrap}>
                  <Image
                    src={activeImage.src}
                    alt={activeImage.alt}
                    fill
                    sizes="90vw"
                    className={styles.zoomImage}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
