import { ArrowRight, Sparkle } from "lucide-react";
import { useState } from "react";
import { recomendarPortefolio, type Recomendacao } from "../../lib/recomendar.functions";
import type { ConteudoSite, Idioma } from "../../content/site";
import { TituloSecao } from "./base";

export function Assistente({ conteudo, idioma }: { conteudo: ConteudoSite; idioma: Idioma }) {
  const t = conteudo.textos.assistente;
  const [descricao, definirDescricao] = useState("");
  const [carregando, definirCarregando] = useState(false);
  const [erro, definirErro] = useState("");
  const [resultado, definirResultado] = useState<Recomendacao | null>(null);

  const enviar = async (evento: React.FormEvent) => {
    evento.preventDefault();
    const texto = descricao.trim();
    definirErro("");
    if (texto.length < 10) {
      definirErro(t.erroCurto);
      return;
    }
    definirCarregando(true);
    definirResultado(null);
    try {
      const recomendacao = await recomendarPortefolio({ data: { descricao: texto, idioma } });
      definirResultado(recomendacao);
    } catch (falha) {
      const mensagem = falha instanceof Error ? falha.message : "";
      definirErro(mensagem.includes("AI_SEM_CREDITOS") ? t.erroCreditos : t.erroFalhou);
    } finally {
      definirCarregando(false);
    }
  };

  return (
    <section className="secao" id="assistente">
      <TituloSecao chapeu={t.chapeu}>{t.titulo}</TituloSecao>
      <div className="painel painel-assistente">
        <p className="assistente-descricao">{t.descricao}</p>
        <form onSubmit={enviar} noValidate>
          <label className={`campo${erro ? " campo-erro" : ""}`}>
            <span>{t.campo}</span>
            <textarea
              value={descricao}
              onChange={(evento) => {
                definirDescricao(evento.target.value);
                definirErro("");
              }}
              maxLength={1200}
              rows={4}
              placeholder={t.placeholder}
            />
            {erro && <small role="alert">{erro}</small>}
          </label>
          <button className="botao-primario" type="submit" disabled={carregando}>
            <Sparkle size={15} /> {carregando ? t.carregando : t.botao}
          </button>
        </form>

        {resultado && (
          <div className="assistente-resultado" aria-live="polite">
            <p className="assistente-resumo">{resultado.resumo}</p>
            {resultado.servicos.length > 0 && (
              <div className="assistente-grupo">
                <strong>{t.rotuloServicos}</strong>
                <ul>
                  {resultado.servicos.map((nome) => (
                    <li key={nome}>{nome}</li>
                  ))}
                </ul>
              </div>
            )}
            {resultado.projetos.length > 0 && (
              <div className="assistente-grupo">
                <strong>{t.rotuloProjetos}</strong>
                <ul>
                  {resultado.projetos.map((titulo) => (
                    <li key={titulo}>
                      <a href="#projetos">{titulo}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="assistente-grupo">
              <strong>{t.rotuloPasso}</strong>
              <p>{resultado.proximoPasso}</p>
            </div>
            <a className="botao-secundario" href="#orcamento">
              {t.irOrcamento} <ArrowRight size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
