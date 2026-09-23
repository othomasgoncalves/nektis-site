"use client";

import { motion, type Variants } from "motion/react";
import { SimboloPonto, SimboloMovimento, SimboloConexao } from "@/components/Simbolo";
import Reveal from "@/components/Reveal";

const PILARES = [
  {
    titulo: "Diagnóstico de processos",
    texto:
      "Antes de propor qualquer solução, mapeamos como a operação funciona hoje: onde o tempo se perde, o que é retrabalho e o que pode ser automatizado sem quebrar o que já funciona.",
    Segmento: SimboloPonto,
  },
  {
    titulo: "Soluções sob medida",
    texto:
      "Não trabalhamos com pacote fechado. Cada sistema, integração ou automação é construída para o contexto do negócio e no ritmo que a equipe consegue absorver.",
    Segmento: SimboloMovimento,
  },
  {
    titulo: "Evolução contínua",
    texto:
      "A entrega não encerra a parceria. Acompanhamos o uso real, ajustamos o que precisa de ajuste e evoluímos a solução conforme a operação cresce.",
    Segmento: SimboloConexao,
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

const segmentoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, delay: i * 0.12 + 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function OQueFazemos() {
  return (
    <section
      id="o-que-fazemos"
      className="relative px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2 className="font-display text-3xl text-roxo sm:text-4xl">
            O que fazemos
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {PILARES.map((pilar, i) => (
            <motion.div
              key={pilar.titulo}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={cardVariants}
            >
              <motion.div custom={i} variants={segmentoVariants}>
                <pilar.Segmento className="h-12 w-12 text-roxo" color="#3e1c59" />
              </motion.div>
              <h3 className="font-display mt-5 text-xl text-roxo">{pilar.titulo}</h3>
              <p className="mt-4 max-w-[42ch] text-base font-normal text-roxo/80">
                {pilar.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
