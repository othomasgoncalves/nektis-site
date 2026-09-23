import { z } from "zod";

export const contatoSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome."),
  empresa: z.string().trim().min(2, "Informe o nome da empresa."),
  contato: z.string().trim().min(5, "Informe um e-mail ou telefone válido."),
  assunto: z.string().trim().min(10, "Conte um pouco mais sobre o que você precisa."),
  // Honeypot: deve chegar vazio. Campo real de formulário nunca deveria vir preenchido.
  site: z.string().optional(),
});

export type ContatoInput = z.infer<typeof contatoSchema>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: string): boolean {
  return EMAIL_REGEX.test(value);
}
