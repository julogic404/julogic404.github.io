import { BriefcaseBusiness, ChevronRight, Code2 } from "lucide-react";
import { tecnologias, type ConteudoSite } from "../../content/site";
import { Icone, IconeTecnologia } from "./icones";
import { DownloadProjeto, PreviaProjeto, TituloSecao } from "./base";

export function Servicos({ conteudo }: { conteudo: ConteudoSite }) {
  const t = conteudo.textos;
  return (
    <section className="secao" id="servicos">
      <TituloSecao chapeu={t.servicosChapeu}>{t.servicosTitulo}</TituloSecao>
      <div className="grade-servicos">
        {conteudo.servicos.map((servico) => (
          <article className="cartao-servico" key={servico.titulo}>
            <Icone nome={servico.icone} />
            <h3>{servico.titulo}</h3>
            <p>{servico.texto}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Projetos({ conteudo }: { conteudo: ConteudoSite }) {
  const t = conteudo.textos;
  return (
    <section className="secao secao-projetos" id="projetos">
      <TituloSecao chapeu={t.projetosChapeu}>{t.projetosTitulo}</TituloSecao>
      <div className="grade-projetos">
        {conteudo.projetos.map((projeto) => (
          <article className="cartao-projeto" key={projeto.titulo}>
            <PreviaProjeto projeto={projeto} />
            <div className="info-projeto">
              <div className="info-projeto-texto">
                <h3>{projeto.titulo}</h3>
                <p>{projeto.etiquetas}</p>
              </div>
              <DownloadProjeto projeto={projeto} />
            </div>
          </article>
        ))}
      </div>
      <a className="todos-projetos" href="#projetos">
        {t.verTodosProjetos} <ChevronRight size={14} />
      </a>
    </section>
  );
}

export function Sobre({ conteudo }: { conteudo: ConteudoSite }) {
  const t = conteudo.textos;
  return (
    <section className="secao secao-dividida" id="sobre">
      <article className="painel painel-habilidades">
        <h2>
          <Code2 size={17} /> {t.habilidadesTitulo}
        </h2>
        <div className="conteudo-habilidades">
          <div>
            {conteudo.habilidades.map((habilidade) => (
              <div className="habilidade" key={habilidade.nome}>
                <span>
                  {habilidade.nome}
                  <b>{habilidade.valor}%</b>
                </span>
                <div>
                  <i style={{ width: `${habilidade.valor}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pilha-tecnologias" aria-label={t.rotuloTecnologias}>
            {tecnologias.map((nome) => (
              <IconeTecnologia key={nome} nome={nome} />
            ))}
          </div>
        </div>
      </article>
      <article className="painel painel-experiencia">
        <h2>
          <BriefcaseBusiness size={17} /> {t.experienciaTitulo}
        </h2>
        <div className="linha-tempo">
          {conteudo.experiencia.map((item) => (
            <div className="item-linha-tempo" key={`${item.cargo}-${item.empresa}`}>
              <i />
              <div>
                <strong>{item.cargo}</strong>
                <span>{item.empresa}</span>
                <p>{item.texto}</p>
              </div>
              <time>{item.data}</time>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}
