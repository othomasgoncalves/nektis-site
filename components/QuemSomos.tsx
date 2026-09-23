"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import Reveal from "@/components/Reveal";

const FUNDADORES = [
  {
    nome: "João Pedro Siqueira",
    cargo: "CEO e Founder",
    responsabilidade: "Responsável pela idealização de produto e finanças.",
    foto: "/time/joao-pedro.png",
  },
  {
    nome: "Xaciano Culandi",
    cargo: "CEO e Co-Founder",
    responsabilidade:
      "Responsável pela idealização de produto e comercial.",
    foto: "/time/xaciano.png",
  },
  {
    nome: "Thomás Gonçalves",
    cargo: "CTO e Co-Founder",
    responsabilidade:
      "Responsável pelo desenvolvimento de software e gerenciamento de processos.",
    foto: "/time/thomas.png",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function QuemSomos() {
  return (
    <section
      id="quem-somos"
      className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 20%, rgba(166,142,238,0.35), transparent), radial-gradient(55% 45% at 85% 75%, rgba(239,229,254,0.9), transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl text-roxo sm:text-4xl">
            Quem somos
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FUNDADORES.map((pessoa, i) => (
            <motion.div
              key={pessoa.nome}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              className="group rounded-3xl border border-white/40 bg-white/20 p-4 backdrop-blur-md backdrop-saturate-150 transition-colors duration-300 hover:bg-white/35"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-lavanda/60">
                {pessoa.foto ? (
                  <Image
                    src={pessoa.foto}
                    alt={pessoa.nome}
                    width={640}
                    height={800}
                    priority
                    unoptimized
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center"
                    aria-hidden
                  >
                    <span className="font-display text-5xl text-roxo/30">
                      JP
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-display mt-5 text-lg text-roxo">
                {pessoa.nome}
              </h3>
              <p className="mt-1 text-sm font-normal text-roxo/70">
                {pessoa.cargo}
              </p>
              <p className="mt-2 max-w-[38ch] text-base font-normal text-roxo/80">
                {pessoa.responsabilidade}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
