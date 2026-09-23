"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface Pilar {
  titulo: string;
  texto: string;
}

function DnaPilarItem({ pilar, isLast }: { pilar: Pilar; isLast: boolean }) {
  const itemRef = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 0.75", "end 0.35"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  const opacity = useTransform(progress, [0, 0.5, 1], [0.4, 1, 0.4]);
  const scale = useTransform(progress, [0, 0.5, 1], [0.97, 1, 0.97]);
  const dotScale = useTransform(progress, [0, 0.5, 1], [0.7, 1.15, 0.7]);
  const dotOpacity = useTransform(progress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <li ref={itemRef} className="relative flex gap-5 pl-1 sm:gap-7">
      <div className="flex w-2.5 shrink-0 flex-col items-center pt-1.5">
        <motion.span
          className="h-2.5 w-2.5 shrink-0 rounded-full bg-lilas"
          style={{ scale: dotScale, opacity: dotOpacity }}
        />
        {!isLast && <div className="mt-2 w-px flex-1 bg-offwhite/15" />}
      </div>

      <motion.div style={{ opacity, scale }} className="min-w-0 flex-1 pb-10">
        <h4 className="font-display text-xl text-offwhite sm:text-2xl">
          {pilar.titulo}
        </h4>
        <p className="mt-2 max-w-[48ch] text-base font-normal text-offwhite/80">
          {pilar.texto}
        </p>
      </motion.div>
    </li>
  );
}

export default function DnaPilares({ pilares }: { pilares: Pilar[] }) {
  return (
    <ul className="mt-14">
      {pilares.map((pilar, index) => (
        <DnaPilarItem
          key={pilar.titulo}
          pilar={pilar}
          isLast={index === pilares.length - 1}
        />
      ))}
    </ul>
  );
}
