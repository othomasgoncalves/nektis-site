import DnaPilares from "@/components/DnaPilares";
import { SimboloCompleto } from "@/components/Simbolo";
import Reveal from "@/components/Reveal";

const PILARES_DNA = [
  {
    titulo: "Propósito antes de produto",
    texto:
      "A tecnologia só importa se resolver um problema real do cliente. A Nektis não vende ferramenta, vende transformação de negócio.",
  },
  {
    titulo: "Proximidade",
    texto:
      "Não somos uma prestadora distante. Somos uma parceira que entende o contexto de cada cliente antes de propor qualquer solução.",
  },
  {
    titulo: "Clareza",
    texto:
      "Em um mercado técnico e muitas vezes complexo, traduzimos tecnologia em linguagem acessível e decisões objetivas.",
  },
  {
    titulo: "Inovação com responsabilidade",
    texto:
      "Inovar não é seguir tendência por seguir. É aplicar inovação com critério, segurança e visão de longo prazo.",
  },
  {
    titulo: "Confiança",
    texto:
      "Relacionamentos duradouros, não transações pontuais. O compromisso é acompanhar a evolução do cliente, não apenas entregar um projeto.",
  },
];

export default function NoQueAcreditamos() {
  return (
    <section className="relative overflow-hidden bg-roxo px-5 py-24 sm:px-8 lg:px-12 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white to-transparent opacity-70 sm:h-32"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent opacity-100 sm:h-32"
      />

      <SimboloCompleto
        className="pointer-events-none absolute -right-24 top-1/2 h-[140%] w-auto -translate-y-1/2 opacity-[0.06] sm:-right-16"
        color="#efebe8"
      />

      <div className="relative mx-auto max-w-6xl lg:grid lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <Reveal>
            <h2 className="font-display text-3xl text-offwhite sm:text-4xl">
              No que acreditamos
            </h2>

            <div className="mt-8">
              <h3 className="font-display text-sm text-offwhite/60">Missão</h3>
              <p className="mt-3 max-w-[46ch] text-base font-normal text-offwhite sm:text-lg">
                Transformar a tecnologia em um instrumento estratégico de
                crescimento para os negócios, desenvolvendo soluções
                personalizadas que otimizem processos, fortaleçam operações e
                gerem resultados reais com clareza, objetividade e compromisso
                em cada parceria.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 lg:mt-0">
          <Reveal>
            <h3 className="font-display text-sm text-offwhite/60">Visão</h3>
            <p className="mt-3 max-w-[46ch] text-base font-normal text-offwhite sm:text-lg">
              Ser referência em soluções tecnológicas estratégicas,
              reconhecida pela proximidade com os clientes e pela capacidade
              de transformar desafios em oportunidades de crescimento
              sustentável.
            </p>
          </Reveal>

          <DnaPilares pilares={PILARES_DNA} />
        </div>
      </div>
    </section>
  );
}
