import type { Metadata } from "next";
import { MotionConfig } from "motion/react";
import { unbounded, satoshi } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nektis.tech"),
  title: "Nektis — Tecnologia com propósito",
  description:
    "Consultoria de tecnologia que entrega soluções sob medida para empresas otimizarem processos, ganharem eficiência e crescerem com clareza.",
  openGraph: {
    title: "Nektis — Tecnologia com propósito",
    description:
      "Soluções sob medida para empresas que querem otimizar processos, ganhar eficiência e crescer com clareza.",
    url: "https://nektis.tech",
    siteName: "Nektis",
    locale: "pt_BR",
    type: "website",
  },
  icons: {
    icon: "/brand/icon-roxo.png",
    apple: "/brand/icon-square.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${unbounded.variable} ${satoshi.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-white text-roxo antialiased">
        <MotionConfig reducedMotion="never">{children}</MotionConfig>
      </body>
    </html>
  );
}
