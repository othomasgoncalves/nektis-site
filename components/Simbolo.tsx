"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useTransform } from "motion/react";
import {
  MARK_VIEWBOX,
  MARK_TRANSFORM,
  RIBBON_D,
  DOT_D,
  MOVIMENTO_CLIP,
  CONEXAO_CLIP,
  DOT_BBOX,
} from "@/lib/symbol";

interface SimboloProps {
  className?: string;
  color?: string;
}

export function SimboloCompleto({ className, color = "#3e1c59" }: SimboloProps) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden>
      <g transform={MARK_TRANSFORM} fill={color}>
        <path d={RIBBON_D} />
        <path d={DOT_D} />
      </g>
    </svg>
  );
}

function SimboloFatia({
  className,
  color = "#3e1c59",
  clip,
}: SimboloProps & { clip: { x: number; y: number; width: number; height: number } }) {
  return (
    <svg
      viewBox={`${clip.x} ${clip.y} ${clip.width} ${clip.height}`}
      className={className}
      aria-hidden
    >
      <g transform={MARK_TRANSFORM} fill={color}>
        <path d={RIBBON_D} />
      </g>
    </svg>
  );
}

export function SimboloMovimento(props: SimboloProps) {
  return <SimboloFatia {...props} clip={MOVIMENTO_CLIP} />;
}

export function SimboloConexao(props: SimboloProps) {
  return <SimboloFatia {...props} clip={CONEXAO_CLIP} />;
}

export function SimboloPonto({ className, color = "#3e1c59" }: SimboloProps) {
  return (
    <svg
      viewBox={`${DOT_BBOX.x} ${DOT_BBOX.y} ${DOT_BBOX.width} ${DOT_BBOX.height}`}
      className={className}
      aria-hidden
    >
      <g transform={MARK_TRANSFORM} fill={color}>
        <path d={DOT_D} />
      </g>
    </svg>
  );
}

export function SimboloTraco({
  className,
  color = "#3e1c59",
  ribbonProgress,
  fillOpacity,
}: SimboloProps & {
  ribbonProgress: MotionValue<number>;
  fillOpacity: MotionValue<number>;
}) {
  const ribbonRef = useRef<SVGPathElement>(null);
  const [ribbonLen, setRibbonLen] = useState(0);

  useEffect(() => {
    if (ribbonRef.current) setRibbonLen(ribbonRef.current.getTotalLength());
  }, []);

  const ribbonOffset = useTransform(ribbonProgress, (t) => ribbonLen * (1 - t));
  const strokeOpacity = useTransform(fillOpacity, (v) => 1 - v);

  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden>
      <g transform={MARK_TRANSFORM}>
        <path d={DOT_D} fill={color} />

        <motion.path
          ref={ribbonRef}
          d={RIBBON_D}
          fill="none"
          stroke={color}
          strokeWidth={90}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={ribbonLen || 1}
          style={{ strokeDashoffset: ribbonOffset, opacity: strokeOpacity }}
        />
        <motion.path d={RIBBON_D} fill={color} style={{ opacity: fillOpacity }} />
      </g>
    </svg>
  );
}
