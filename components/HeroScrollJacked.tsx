"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { SimboloTraco } from "@/components/Simbolo";

const LINHAS = ["Tecnologia", "com", "propósito"];

export default function HeroScrollJacked() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.5 });

  const ribbonProgress = useTransform(p, [0.15, 0.55], [0, 1], { clamp: true });
  const fillOpacity = useTransform(p, [0.55, 0.65], [0, 1], { clamp: true });

  const blobOpacity = useTransform(p, [0, 0.1, 0.22], [0.5, 0.5, 0]);

  const markScale = useTransform(p, [0.65, 0.87], [1, 0.08]);
  const markX = useTransform(p, [0, 0.65, 0.87], ["-50%", "-50%", "-160%"]);
  const markY = useTransform(p, [0, 0.65, 0.87], ["-50%", "-50%", "-210%"]);
  const markOpacity = useTransform(p, [0.8, 0.9], [1, 0]);

  const line1 = useTransform(p, [0.76, 0.85], [0, 1], { clamp: true });
  const line1Y = useTransform(p, [0.76, 0.85], ["110%", "0%"], { clamp: true });
  const line2 = useTransform(p, [0.79, 0.88], [0, 1], { clamp: true });
  const line2Y = useTransform(p, [0.79, 0.88], ["110%", "0%"], { clamp: true });
  const line3 = useTransform(p, [0.82, 0.91], [0, 1], { clamp: true });
  const line3Y = useTransform(p, [0.82, 0.91], ["110%", "0%"], { clamp: true });

  const supportOpacity = useTransform(p, [0.89, 0.97], [0, 1], { clamp: true });
  const supportY = useTransform(p, [0.89, 0.97], [16, 0], { clamp: true });

  return (
    <div ref={containerRef} id="hero-track" className="relative h-[250vh]">
      <section
        id="top"
        className="sticky top-0 h-dvh overflow-hidden"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lilas blur-[100px]"
          style={{ opacity: blobOpacity }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-56 w-56 sm:h-72 sm:w-72 md:h-80 md:w-80 lg:h-96 lg:w-96"
          style={{ x: markX, y: markY, scale: markScale, opacity: markOpacity }}
        >
          <SimboloTraco
            className="h-full w-full"
            ribbonProgress={ribbonProgress}
            fillOpacity={fillOpacity}
          />
        </motion.div>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 pt-[230px] text-center sm:px-8 sm:pt-[320px] md:pt-[350px] lg:pt-[420px]">
          <h1 className="font-display text-[2.75rem] leading-[1.05] text-roxo sm:text-6xl lg:text-7xl">
            {LINHAS.map((linha, i) => {
              const opacity = [line1, line2, line3][i];
              const y = [line1Y, line2Y, line3Y][i];
              return (
                <span key={linha} className="block overflow-hidden">
                  <motion.span className="block" style={{ opacity, y }}>
                    {linha}
                  </motion.span>
                </span>
              );
            })}
          </h1>

          <motion.p
            style={{ opacity: supportOpacity, y: supportY }}
            className="mt-6 max-w-[36ch] text-lg font-normal text-roxo/80 sm:text-xl"
          >
            Soluções sob medida para empresas que querem otimizar processos,
            ganhar eficiência e crescer com clareza.
          </motion.p>

          <motion.div
            style={{ opacity: supportOpacity, y: supportY }}
            className="mt-9 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contato"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-roxo px-7 py-3.5 text-base font-normal text-offwhite transition-colors hover:bg-roxo/90"
            >
              Falar com a gente
            </a>
            <a
              href="#como-trabalhamos"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-roxo px-7 py-3.5 text-base font-normal text-roxo transition-colors hover:bg-roxo/5"
            >
              Como trabalhamos
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
