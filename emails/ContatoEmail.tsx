import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

interface ContatoEmailProps {
  nome: string;
  empresa: string;
  contato: string;
  assunto: string;
}

export default function ContatoEmail({
  nome,
  empresa,
  contato,
  assunto,
}: ContatoEmailProps) {
  return (
    <Html lang="pt-BR">
      <Head />
      <Preview>Novo contato de {empresa} via nektis.tech</Preview>
      <Body style={{ backgroundColor: "#efebe8", fontFamily: "Arial, Helvetica, sans-serif" }}>
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 16,
            margin: "40px auto",
            padding: 32,
            maxWidth: 480,
          }}
        >
          <Heading style={{ color: "#3e1c59", fontSize: 22, margin: "0 0 24px" }}>
            Novo contato pelo site
          </Heading>

          <Text style={{ color: "#3e1c59", fontSize: 14, margin: "0 0 4px" }}>
            <strong>Nome:</strong> {nome}
          </Text>
          <Text style={{ color: "#3e1c59", fontSize: 14, margin: "0 0 4px" }}>
            <strong>Empresa:</strong> {empresa}
          </Text>
          <Text style={{ color: "#3e1c59", fontSize: 14, margin: "0 0 4px" }}>
            <strong>Contato:</strong> {contato}
          </Text>

          <Hr style={{ borderColor: "#efe5fe", margin: "20px 0" }} />

          <Text style={{ color: "#3e1c59", fontSize: 14, margin: "0 0 8px" }}>
            <strong>Assunto:</strong>
          </Text>
          <Text style={{ color: "#3e1c59", fontSize: 14, whiteSpace: "pre-wrap" }}>
            {assunto}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
