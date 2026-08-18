"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.04;
      current.y += (target.y - current.y) * 0.04;
      scene.style.transform = `perspective(1200px) rotateY(${
        current.x * 4
      }deg) rotateX(${current.y * -4}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const stars = Array.from({ length: 40 }).map((_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 53) % 100}%`,
    size: `${2 + (i % 3)}px`,
    delay: `${(i % 10) * 0.4}s`,
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-scene"
    >
      <div
        ref={sceneRef}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="animate-blob-float absolute -top-40 -left-40 h-[38rem] w-[38rem] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.2 300), transparent 70%)",
          }}
        />
        <div
          className="animate-blob-drift absolute -right-52 top-1/4 h-[42rem] w-[42rem] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.6 0.18 200), transparent 70%)",
          }}
        />
        <div
          className="animate-blob-float absolute bottom-[-14rem] left-1/4 h-[36rem] w-[36rem] rounded-full opacity-30 blur-3xl"
          style={{
            animationDelay: "-9s",
            background:
              "radial-gradient(circle, oklch(0.55 0.19 330), transparent 70%)",
          }}
        />
        <div
          className="animate-blob-drift absolute top-[-10rem] left-1/2 h-[28rem] w-[28rem] rounded-full opacity-25 blur-3xl"
          style={{
            animationDelay: "-13s",
            background:
              "radial-gradient(circle, oklch(0.5 0.14 260), transparent 70%)",
          }}
        />

        <div
          className="animate-ring-spin absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            border: "1px solid oklch(0.82 0.14 200 / 0.8)",
            transformStyle: "preserve-3d",
            transformOrigin: "center",
          }}
        />
        <div
          className="animate-ring-spin absolute left-1/2 top-1/2 h-[62rem] w-[62rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10"
          style={{
            animationDirection: "reverse",
            animationDuration: "45s",
            border: "1px solid oklch(0.705 0.195 305 / 0.7)",
            transformStyle: "preserve-3d",
            transformOrigin: "center",
          }}
        />
      </div>

      <div
        className="animate-grid-pan absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.95 0.015 285 / 0.4) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.95 0.015 285 / 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <span
            key={i}
            className="animate-starfield absolute rounded-full bg-foreground"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, oklch(0.148 0.028 290) 100%)",
        }}
      />
    </div>
  );
}