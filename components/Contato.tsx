"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import Reveal from "@/components/Reveal";

type Status = "idle" | "enviando" | "sucesso" | "erro";

const initialForm = {
  nome: "",
  empresa: "",
  contato: "",
  assunto: "",
  site: "", // honeypot
};

export default function Contato() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [erroMsg, setErroMsg] = useState("");

  const handleChange =
    (campo: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [campo]: e.target.value }));
    };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("enviando");
    setErroMsg("");

    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Falha no envio");
      }

      setStatus("sucesso");
      setForm(initialForm);
    } catch {
      setStatus("erro");
      setErroMsg(
        "Não foi possível enviar agora. Tente novamente ou escreva para contato@nektis.tech."
      );
    }
  };

  const enviando = status === "enviando";

  return (
    <section
      id="contato"
      className="relative overflow-hidden px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(50% 60% at 80% 30%, rgba(166,142,238,0.3), transparent), radial-gradient(45% 50% at 15% 80%, rgba(239,229,254,0.9), transparent)",
        }}
      />

      <div className="mx-auto max-w-2xl">
        <Reveal>
          <h2 className="font-display text-3xl text-roxo sm:text-4xl">
            Vamos conversar
          </h2>
          <p className="mt-4 max-w-[52ch] text-base font-normal text-roxo/80 sm:text-lg">
            Conte o que está travando na sua operação. Respondemos em até um
            dia útil.
          </p>
        </Reveal>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-10 space-y-6 rounded-3xl border border-white/40 bg-white/25 p-6 backdrop-blur-md backdrop-saturate-150 sm:p-9"
          noValidate
        >
          <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
            <label htmlFor="site">Deixe este campo em branco</label>
            <input
              id="site"
              name="site"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.site}
              onChange={handleChange("site")}
            />
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-normal text-roxo">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              required
              autoComplete="name"
              value={form.nome}
              onChange={handleChange("nome")}
              className="mt-2 w-full rounded-xl border border-roxo/20 bg-white px-4 py-3 text-base text-roxo outline-none focus-visible:border-roxo"
            />
          </div>

          <div>
            <label htmlFor="empresa" className="block text-sm font-normal text-roxo">
              Empresa
            </label>
            <input
              id="empresa"
              name="empresa"
              type="text"
              required
              autoComplete="organization"
              value={form.empresa}
              onChange={handleChange("empresa")}
              className="mt-2 w-full rounded-xl border border-roxo/20 bg-white px-4 py-3 text-base text-roxo outline-none focus-visible:border-roxo"
            />
          </div>

          <div>
            <label htmlFor="contato" className="block text-sm font-normal text-roxo">
              Contato
            </label>
            <input
              id="contato"
              name="contato"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="E-mail ou telefone"
              required
              value={form.contato}
              onChange={handleChange("contato")}
              className="mt-2 w-full rounded-xl border border-roxo/20 bg-white px-4 py-3 text-base text-roxo outline-none focus-visible:border-roxo"
            />
          </div>

          <div>
            <label htmlFor="assunto" className="block text-sm font-normal text-roxo">
              Assunto
            </label>
            <textarea
              id="assunto"
              name="assunto"
              required
              rows={5}
              autoComplete="off"
              value={form.assunto}
              onChange={handleChange("assunto")}
              className="mt-2 w-full resize-y rounded-xl border border-roxo/20 bg-white px-4 py-3 text-base text-roxo outline-none focus-visible:border-roxo"
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full bg-roxo px-7 py-3.5 text-base font-normal text-offwhite transition-colors hover:bg-roxo/90 disabled:opacity-60 sm:w-auto"
          >
            {enviando ? "Enviando..." : "Enviar mensagem"}
          </button>

          <div role="status" aria-live="polite">
            {status === "sucesso" && (
              <p className="text-base font-normal text-roxo">
                Mensagem enviada. Retornamos em até um dia útil.
              </p>
            )}
            {status === "erro" && (
              <p className="text-base font-normal text-roxo">{erroMsg}</p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
