"use client";

import { useRef, useState } from "react";
import { motion, useScroll } from "motion/react";
import Reveal from "@/components/Reveal";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Escuta",
    texto:
      "Conversamos com quem opera o processo, não apenas com quem decide sobre ele. É de quem vive a rotina que saem os detalhes que definem se uma solução vai ser usada ou abandonada.",
  },
  {
    numero: "02",
    titulo: "Desenho",
    texto:
      "Traduzimos o que ouvimos em um escopo claro: o que será feito, o que fica de fora e qual resultado esperar. Sem promessa vaga e sem termo técnico que o cliente precise decifrar.",
  },
  {
    numero: "03",
    titulo: "Construção",
    texto:
      "Desenvolvemos em entregas curtas, com o cliente vendo o progresso em vez de esperar um lançamento único no fim. Ajuste cedo custa menos que correção depois.",
  },
  {
    numero: "04",
    titulo: "Acompanhamento",
    texto:
      "Depois de implantado, medimos o que mudou na prática e ajustamos o que não pegou. A parceria continua enquanto a operação evoluir.",
  },
];

const dotVariants = {
  hidden: { scale: 0.6, backgroundColor: "rgba(62,28,89,0.2)" },
  visible: { scale: 1, backgroundColor: "#a68eee" },
};

export default function ComoTrabalhamos() {
  const [openIndex, setOpenIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section
      id="como-trabalhamos"
      className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="font-display text-3xl text-roxo sm:text-4xl">
            Como trabalhamos
          </h2>
        </Reveal>

        <div ref={listRef} className="relative mt-14">
          <div className="absolute inset-y-3 left-2.5 w-px -translate-x-1/2 bg-roxo/10 sm:left-3.5" />
          <motion.div
            className="absolute left-2.5 top-3 w-px -translate-x-1/2 bg-lilas sm:left-3.5"
            style={{ height: "calc(100% - 24px)", scaleY: scrollYProgress, transformOrigin: "top" }}
          />

          {ETAPAS.map((etapa, index) => {
            const isOpen = index === openIndex;
            return (
              <motion.div
                key={etapa.numero}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 border-b border-roxo/15 sm:gap-7"
              >
                <div className="flex w-5 shrink-0 justify-center pt-8 sm:w-7">
                  <motion.span
                    className="h-2.5 w-2.5 rounded-full"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.7 }}
                    variants={dotVariants}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`etapa-painel-${etapa.numero}`}
                    className="flex w-full min-h-[44px] items-center gap-4 py-5 text-left"
                  >
                    <span className="font-display text-lg text-roxo/40">
                      {etapa.numero}
                    </span>
                    <span className="font-display min-w-0 flex-1 break-words text-xl text-roxo sm:text-2xl">
                      {etapa.titulo}
                    </span>
                    <span
                      className={`text-2xl text-roxo transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>

                  <motion.div
                    id={`etapa-painel-${etapa.numero}`}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[60ch] pb-6 text-base font-normal text-roxo/80">
                      {etapa.texto}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
