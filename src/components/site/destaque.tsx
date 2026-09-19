import { ArrowRight, BriefcaseBusiness, Facebook, Github, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { marca, redesSociais, type ConteudoSite } from "../../content/site";
import { IconeTikTok, Icone } from "./icones";
import { ImagemProtegida } from "./base";

export function Destaque({ conteudo }: { conteudo: ConteudoSite }) {
  const t = conteudo.textos;
  return (
    <section className="destaque" id="inicio">
      <div className="destaque-texto">
        <span className="chapeu">{t.apresentacaoChapeu}</span>
        <h1>{marca.nome}</h1>
        <p className="funcao">
          {t.funcaoAntes}
          <strong>{t.funcaoDestaque}</strong>
          {t.funcaoDepois}
        </p>
        <p className="introducao">{t.introducao}</p>
        <div className="destaque-acoes">
          <a className="botao-primario" href="#projetos">
            <BriefcaseBusiness size={15} /> {t.verProjetos}
          </a>
          <a className="botao-secundario" href="#contato">
            {t.contactar}
          </a>
        </div>
        <div className="redes-sociais" aria-label={t.redesSociais}>
          {redesSociais.map((rede) => (
            <a key={rede.rotulo} href={rede.url} target="_blank" rel="noopener noreferrer" aria-label={rede.rotulo}>
              {rede.rotulo === "GitHub" && <Github size={19} />}
              {rede.rotulo === "Facebook" && <Facebook size={19} />}
              {rede.rotulo === "Instagram" && <Instagram size={19} />}
              {rede.rotulo === "TikTok" && <IconeTikTok size={19} />}
            </a>
          ))}
        </div>
      </div>
      <div className="retrato-wrap">
        <div className="retrato-halo" />
        <ImagemProtegida src={marca.imagemDestaque} alt={t.retratoAlt} width={1024} height={576} />
      </div>
      <aside className="disponibilidade">
        <p>
          <span className="ponto-online" /> <strong>{t.disponivel}</strong>
          <small>{t.disponivelSub}</small>
        </p>
        <hr />
        <a href={`mailto:${marca.email}`}>
          <Mail size={15} /> {marca.email}
        </a>
        <a href={marca.whatsapp} target="_blank" rel="noopener noreferrer">
          <Phone size={15} /> {marca.telefone}
        </a>
      </aside>
    </section>
  );
}

export function Estatisticas({ conteudo }: { conteudo: ConteudoSite }) {
  return (
    <section className="estatisticas" aria-label={conteudo.textos.rotuloEstatisticas}>
      {conteudo.estatisticas.map((item) => (
        <div className="estatistica" key={item.rotulo}>
          <Icone nome={item.icone} size={19} />
          <p>
            <strong>{item.valor}</strong>
            <span>{item.rotulo}</span>
          </p>
        </div>
      ))}
    </section>
  );
}

export function ContactoRodape({ conteudo }: { conteudo: ConteudoSite }) {
  const t = conteudo.textos;
  return (
    <section className="painel-contacto" id="contato">
      <div>
        <h2>{t.contactoTitulo}</h2>
        <p>{t.contactoTexto}</p>
        <a className="botao-primario" href={`mailto:${marca.email}`}>
          {t.contactoCta} <ArrowRight size={14} />
        </a>
      </div>
      <div className="itens-contacto">
        <a href={`mailto:${marca.email}`}>
          <Mail />
          <span>
            {t.rotuloEmail}
            <small>{marca.email}</small>
          </span>
        </a>
        <a href={marca.whatsapp} target="_blank" rel="noopener noreferrer">
          <Phone />
          <span>
            {t.rotuloTelefone}
            <small>{marca.telefone}</small>
          </span>
        </a>
        <p>
          <MapPin />
          <span>
            {t.rotuloLocalizacao}
            <small>{t.localizacao}</small>
          </span>
        </p>
      </div>
    </section>
  );
}
