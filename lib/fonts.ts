import { Unbounded } from "next/font/google";
import localFont from "next/font/local";

export const unbounded = Unbounded({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
  variable: "--font-unbounded",
});

export const satoshi = localFont({
  src: "../public/fonts/Satoshi-Variable.woff2",
  weight: "300 900",
  display: "swap",
  variable: "--font-satoshi",
});
