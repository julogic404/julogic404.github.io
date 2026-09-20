import { ArrowRight } from "lucide-react";
import { marca, type ConteudoSite, type Idioma } from "../../content/site";

export function Cabecalho({
  conteudo,
  idioma,
  escolherIdioma,
}: {
  conteudo: ConteudoSite;
  idioma: Idioma;
  escolherIdioma: (proximo: Idioma) => void;
}) {
  const t = conteudo.textos;
  return (
    <header className="cabecalho-site">
      <a className="marca-nome" href="#inicio">
        {marca.nomeCurto}
      </a>
      <nav aria-label={t.navegacaoRotulo}>
        <a className="active" href="#inicio">{t.navegacao.inicio}</a>
        <a href="#sobre">{t.navegacao.sobre}</a>
        <a href="#servicos">{t.navegacao.servicos}</a>
        <a href="#projetos">{t.navegacao.projetos}</a>
        {/* <a href="#assistente">{t.navegacao.assistente}</a> */}
        <a href="#orcamento">{t.navegacao.orcamento}</a>
        <a href="#contato">{t.navegacao.contacto}</a>
      </nav>
      <div className="acoes-cabecalho">
        <div className="alternador-idioma" role="group" aria-label={t.rotuloIdioma}>
          <button
            type="button"
            className={idioma === "pt" ? "active" : ""}
            onClick={() => escolherIdioma("pt")}
            aria-pressed={idioma === "pt"}
            title="Português"
          >
            🇵🇹 PT
          </button>
          <button
            type="button"
            className={idioma === "en" ? "active" : ""}
            onClick={() => escolherIdioma("en")}
            aria-pressed={idioma === "en"}
            title="English"
          >
            🇬🇧 EN
          </button>
        </div>
        <a className="botao-contorno" href="#contato">
          {t.contratar} <ArrowRight size={14} />
        </a>
      </div>
    </header>
  );
            }
