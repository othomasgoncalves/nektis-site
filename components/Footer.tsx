import { SimboloCompleto } from "@/components/Simbolo";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-roxo pt-14 text-offwhite sm:pt-20">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <SimboloCompleto className="h-8 w-auto" color="#efebe8" />

        <a
          href="mailto:contato@nektis.tech"
          className="text-base font-normal text-offwhite transition-opacity hover:opacity-80"
        >
          contato@nektis.tech
        </a>

        <p className="text-sm font-normal text-offwhite/70">
          © {new Date().getFullYear()} Nektis. Todos os direitos reservados.
        </p>
      </div>

      <p
        aria-hidden
        className="font-display -mb-[6vw] mt-10 select-none text-center leading-none text-offwhite sm:mt-14"
        style={{ fontSize: "clamp(4.5rem, 20vw, 15rem)" }}
      >
        Nektis
      </p>
    </footer>
  );
}
