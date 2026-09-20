import { createServerFn } from "@tanstack/react-start";
import { projetos, servicos, textos, type Idioma } from "../content/site";

export type Recomendacao = {
  resumo: string;
  servicos: string[];
  projetos: string[];
  proximoPasso: string;
};

type Entrada = { descricao: string; idioma: Idioma };

const ESQUEMA = {
  type: "object",
  additionalProperties: false,
  required: ["resumo", "servicos", "projetos", "proximoPasso"],
  properties: {
    resumo: { type: "string", description: "2-3 frases a resumir o que o visitante quer construir." },
    servicos: { type: "array", items: { type: "string" }, description: "Nomes exactos dos serviços mais relevantes (1 a 3)." },
    projetos: { type: "array", items: { type: "string" }, description: "Títulos exactos dos projetos do portefólio mais parecidos (1 a 3)." },
    proximoPasso: { type: "string", description: "Uma frase com a sugestão de próximo passo." },
  },
} as const;

function catalogo(idioma: Idioma) {
  const listaServicos = servicos.map((s) => `- ${s[idioma].titulo}: ${s[idioma].texto}`).join("\n");
  const listaProjetos = projetos
    .map((p) => `- ${p.titulo} (${p[idioma].etiquetas})${p.urlDemo ? " [web demo]" : " [app Android]"}`)
    .join("\n");
  return { listaServicos, listaProjetos };
}

export const recomendarPortefolio = createServerFn({ method: "POST" })
  .inputValidator((entrada: unknown): Entrada => {
    const dados = entrada as Partial<Entrada> | null;
    const descricao = typeof dados?.descricao === "string" ? dados.descricao.trim() : "";
    if (descricao.length < 10) throw new Error("DESCRICAO_CURTA");
    const idioma: Idioma = dados?.idioma === "en" ? "en" : "pt";
    return { descricao: descricao.slice(0, 1200), idioma };
  })
  .handler(async ({ data }): Promise<Recomendacao> => {
    const chave = process.env["LOVABLE_API_KEY"];
    if (!chave) throw new Error("AI_INDISPONIVEL");

    const { listaServicos, listaProjetos } = catalogo(data.idioma);
    const lingua = data.idioma === "en" ? "English" : "português de Angola";

    const resposta = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": chave,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low", summary: "auto" },
        instructions: [
          `És o assistente do estúdio JuLogic 404. Responde SEMPRE em ${lingua}, de forma curta e directa.`,
          "A partir da descrição do visitante, escolhe apenas serviços e projetos das listas abaixo, usando os nomes/títulos exactamente como aparecem.",
          "",
          "SERVIÇOS:",
          listaServicos,
          "",
          "PROJETOS DO PORTEFÓLIO:",
          listaProjetos,
        ].join("\n"),
        input: [{ role: "user", content: [{ type: "input_text", text: data.descricao }] }],
        text: {
          format: { type: "json_schema", name: "recomendacao", strict: true, schema: ESQUEMA },
        },
      }),
    });

    if (!resposta.ok || !resposta.body) {
      const detalhe = await resposta.text().catch(() => "");
      console.error("AI Gateway", resposta.status, detalhe.slice(0, 500));
      throw new Error(resposta.status === 402 ? "AI_SEM_CREDITOS" : "AI_FALHOU");
    }

    let texto = "";
    const leitor = resposta.body.getReader();
    const decodificador = new TextDecoder();
    let restante = "";
    while (true) {
      const { done, value } = await leitor.read();
      if (done) break;
      restante += decodificador.decode(value, { stream: true });
      const linhas = restante.split("\n");
      restante = linhas.pop() ?? "";
      for (const linha of linhas) {
        if (!linha.startsWith("data:")) continue;
        const bruto = linha.slice(5).trim();
        if (!bruto || bruto === "[DONE]") continue;
        try {
          const evento = JSON.parse(bruto) as { type?: string; delta?: string };
          if (evento.type === "response.output_text.delta" && typeof evento.delta === "string") {
            texto += evento.delta;
          }
        } catch {
          /* evento parcial ou não-JSON: ignorar */
        }
      }
    }

    let recomendacao: Recomendacao;
    try {
      recomendacao = JSON.parse(texto) as Recomendacao;
    } catch {
      console.error("Resposta da IA sem JSON válido:", texto.slice(0, 300));
      throw new Error("AI_FALHOU");
    }

    const nomesServicos = servicos.map((s) => s[data.idioma].titulo);
    const titulosProjetos = projetos.map((p) => p.titulo);
    const normalizar = (valor: string) =>
      valor
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
    // Aceita pequenas variações de escrita e devolve sempre o nome oficial.
    const filtrar = (valores: unknown, validos: string[]) => {
      if (!Array.isArray(valores)) return [];
      const encontrados: string[] = [];
      for (const valor of valores) {
        if (typeof valor !== "string") continue;
        const chave = normalizar(valor);
        const oficial = validos.find((v) => {
          const alvo = normalizar(v);
          return alvo === chave || alvo.includes(chave) || chave.includes(alvo);
        });
        if (oficial && !encontrados.includes(oficial)) encontrados.push(oficial);
      }
      return encontrados.slice(0, 3);
    };

    return {
      resumo: String(recomendacao.resumo ?? "").slice(0, 600),
      servicos: filtrar(recomendacao.servicos, nomesServicos),
      projetos: filtrar(recomendacao.projetos, titulosProjetos),
      proximoPasso: String(recomendacao.proximoPasso ?? textos[data.idioma].assistente.passoPadrao).slice(0, 400),
    };
  });
