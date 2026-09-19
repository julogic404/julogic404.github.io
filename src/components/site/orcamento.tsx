import { Calculator } from "lucide-react";
import { useEffect, useState } from "react";
import {
  marca,
  moedas,
  ROTULO_PERSONALIZADO,
  type ConteudoSite,
  type Idioma,
  type Moeda,
  type Textos,
} from "../../content/site";
import { TituloSecao } from "./base";

type FormularioOrcamento = {
  nome: string;
  email: string;
  tipoProjeto: string;
  moeda: Moeda;
  orcamento: string;
  prazo: string;
  mensagem: string;
};

function ehValorPersonalizado(valor: string, opcoes: readonly string[], rotuloPersonalizado: string) {
  return valor === rotuloPersonalizado || (valor !== "" && !opcoes.includes(valor));
}

export function Orcamento({ conteudo, idioma }: { conteudo: ConteudoSite; idioma: Idioma }) {
  const t = conteudo.textos;
  return (
    <section className="secao" id="orcamento">
      <TituloSecao chapeu={t.orcamentoChapeu}>{t.orcamentoTitulo}</TituloSecao>
      <div className="painel painel-orcamento">
        <FormularioSolicitacaoOrcamento textosAtuais={t} idioma={idioma} />
      </div>
    </section>
  );
}

function FormularioSolicitacaoOrcamento({ textosAtuais, idioma }: { textosAtuais: Textos; idioma: Idioma }) {
  const personalizado = ROTULO_PERSONALIZADO[idioma];
  const [formulario, definirFormulario] = useState<FormularioOrcamento>({
    nome: "",
    email: "",
    tipoProjeto: "",
    moeda: idioma === "en" ? "USD" : "AOA",
    orcamento: "",
    prazo: "",
    mensagem: "",
  });
  const [erros, definirErros] = useState<Partial<Record<keyof FormularioOrcamento, string>>>({});
  const [enviado, definirEnviado] = useState(false);

  useEffect(() => {
    definirFormulario((atual) => ({
      ...atual,
      moeda: idioma === "en" ? "USD" : "AOA",
      tipoProjeto: "",
      orcamento: "",
      prazo: "",
    }));
    definirErros({});
    definirEnviado(false);
  }, [idioma]);

  const opcoesTipoProjeto = [...textosAtuais.tiposProjeto, personalizado];
  const opcoesOrcamento = [...textosAtuais.faixasOrcamento[formulario.moeda], personalizado];
  const opcoesPrazo = [...textosAtuais.prazos, personalizado];

  const validar = (): Partial<Record<keyof FormularioOrcamento, string>> => {
    const errosEncontrados: Partial<Record<keyof FormularioOrcamento, string>> = {};
    const nome = formulario.nome.trim();
    const email = formulario.email.trim();
    const mensagem = formulario.mensagem.trim();
    if (!nome) errosEncontrados.nome = textosAtuais.formulario.erros.nome;
    else if (nome.length > 100) errosEncontrados.nome = textosAtuais.formulario.erros.nomeLongo;
    if (!email) errosEncontrados.email = textosAtuais.formulario.erros.email;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 255)
      errosEncontrados.email = textosAtuais.formulario.erros.emailInvalido;
    if (!formulario.tipoProjeto) errosEncontrados.tipoProjeto = textosAtuais.formulario.erros.tipoProjeto;
    else if (formulario.tipoProjeto === personalizado)
      errosEncontrados.tipoProjeto = textosAtuais.formulario.erros.tipoProjetoPersonalizado;
    if (!formulario.moeda) errosEncontrados.moeda = textosAtuais.formulario.erros.moeda;
    if (!formulario.orcamento) errosEncontrados.orcamento = textosAtuais.formulario.erros.orcamento;
    else if (formulario.orcamento === personalizado)
      errosEncontrados.orcamento = textosAtuais.formulario.erros.orcamentoPersonalizado;
    if (!formulario.prazo) errosEncontrados.prazo = textosAtuais.formulario.erros.prazo;
    else if (formulario.prazo === personalizado)
      errosEncontrados.prazo = textosAtuais.formulario.erros.prazoPersonalizado;
    if (!mensagem) errosEncontrados.mensagem = textosAtuais.formulario.erros.mensagem;
    else if (mensagem.length > 1000) errosEncontrados.mensagem = textosAtuais.formulario.erros.mensagemLonga;
    return errosEncontrados;
  };

  const atualizar =
    (chave: keyof FormularioOrcamento) =>
    (evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      definirFormulario((atual) => ({ ...atual, [chave]: evento.target.value }));
      definirErros((errosAtuais) => ({ ...errosAtuais, [chave]: undefined }));
      definirEnviado(false);
    };

  const atualizarSelecao =
    (chave: "tipoProjeto" | "orcamento" | "prazo") => (evento: React.ChangeEvent<HTMLSelectElement>) => {
      const valor = evento.target.value;
      definirFormulario((atual) => ({ ...atual, [chave]: valor }));
      definirErros((errosAtuais) => ({ ...errosAtuais, [chave]: undefined }));
      definirEnviado(false);
    };

  const atualizarPersonalizado =
    (chave: "tipoProjeto" | "orcamento" | "prazo") => (evento: React.ChangeEvent<HTMLInputElement>) => {
      definirFormulario((atual) => ({ ...atual, [chave]: evento.target.value }));
      definirErros((errosAtuais) => ({ ...errosAtuais, [chave]: undefined }));
      definirEnviado(false);
    };

  const atualizarMoeda = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    definirFormulario((atual) => ({ ...atual, moeda: evento.target.value as Moeda, orcamento: "" }));
    definirErros((errosAtuais) => {
      const proximosErros = { ...errosAtuais };
      delete proximosErros.moeda;
      delete proximosErros.orcamento;
      return proximosErros;
    });
    definirEnviado(false);
  };

  const enviarFormulario = (evento: React.FormEvent) => {
    evento.preventDefault();
    const errosValidacao = validar();
    definirErros(errosValidacao);
    if (Object.keys(errosValidacao).length > 0) return;
    const rotulos = textosAtuais.formulario.rotulos;
    const assunto = `${textosAtuais.formulario.assunto} — ${formulario.tipoProjeto}`;
    const corpo = [
      `${rotulos.nome}: ${formulario.nome.trim()}`,
      `${rotulos.email}: ${formulario.email.trim()}`,
      `${rotulos.tipoProjeto}: ${formulario.tipoProjeto}`,
      `${rotulos.moeda}: ${formulario.moeda}`,
      `${rotulos.orcamento}: ${formulario.orcamento}`,
      `${rotulos.prazo}: ${formulario.prazo}`,
      "",
      rotulos.descricao,
      formulario.mensagem.trim(),
    ].join("\n");
    window.location.href = `mailto:${marca.email}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
    definirEnviado(true);
  };

  const classeCampo = (chave: keyof FormularioOrcamento) => (erros[chave] ? " campo-erro" : "");
  const ehPersonalizado = (valor: string, opcoes: readonly string[]) =>
    ehValorPersonalizado(valor, opcoes, personalizado);

  return (
    <form className="formulario-orcamento" onSubmit={enviarFormulario} noValidate>
      <div className="linha-orcamento">
        <label className={`campo${classeCampo("nome")}`}>
          <span>{textosAtuais.formulario.nome}</span>
          <input type="text" value={formulario.nome} onChange={atualizar("nome")} maxLength={100} placeholder={textosAtuais.formulario.nomePlaceholder} />
          {erros.nome && <small role="alert">{erros.nome}</small>}
        </label>
        <label className={`campo${classeCampo("email")}`}>
          <span>{textosAtuais.formulario.email}</span>
          <input type="email" value={formulario.email} onChange={atualizar("email")} maxLength={255} placeholder={textosAtuais.formulario.emailPlaceholder} />
          {erros.email && <small role="alert">{erros.email}</small>}
        </label>
      </div>
      <div className="linha-orcamento four">
        <label className={`campo${classeCampo("tipoProjeto")}`}>
          <span>{textosAtuais.formulario.tipoProjeto}</span>
          <select value={ehPersonalizado(formulario.tipoProjeto, opcoesTipoProjeto) ? personalizado : formulario.tipoProjeto} onChange={atualizarSelecao("tipoProjeto")}>
            <option value="" disabled>{textosAtuais.formulario.selecionar}</option>
            {opcoesTipoProjeto.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
          </select>
          {ehPersonalizado(formulario.tipoProjeto, opcoesTipoProjeto) && (
            <input type="text" value={formulario.tipoProjeto === personalizado ? "" : formulario.tipoProjeto} onChange={atualizarPersonalizado("tipoProjeto")} maxLength={100} placeholder={textosAtuais.formulario.tipoProjetoPlaceholder} />
          )}
          {erros.tipoProjeto && <small role="alert">{erros.tipoProjeto}</small>}
        </label>
        <label className={`campo${classeCampo("moeda")}`}>
          <span>{textosAtuais.formulario.moeda}</span>
          <select value={formulario.moeda} onChange={atualizarMoeda}>
            {moedas.map((moeda) => <option key={moeda} value={moeda}>{moeda}</option>)}
          </select>
          {erros.moeda && <small role="alert">{erros.moeda}</small>}
        </label>
        <label className={`campo${classeCampo("orcamento")}`}>
          <span>{textosAtuais.formulario.orcamento}</span>
          <select value={ehPersonalizado(formulario.orcamento, opcoesOrcamento) ? personalizado : formulario.orcamento} onChange={atualizarSelecao("orcamento")}>
            <option value="" disabled>{textosAtuais.formulario.selecionar}</option>
            {opcoesOrcamento.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
          </select>
          {ehPersonalizado(formulario.orcamento, opcoesOrcamento) && (
            <input type="text" value={formulario.orcamento === personalizado ? "" : formulario.orcamento} onChange={atualizarPersonalizado("orcamento")} maxLength={100} placeholder={textosAtuais.formulario.orcamentoPlaceholder} />
          )}
          {erros.orcamento && <small role="alert">{erros.orcamento}</small>}
        </label>
        <label className={`campo${classeCampo("prazo")}`}>
          <span>{textosAtuais.formulario.prazo}</span>
          <select value={ehPersonalizado(formulario.prazo, opcoesPrazo) ? personalizado : formulario.prazo} onChange={atualizarSelecao("prazo")}>
            <option value="" disabled>{textosAtuais.formulario.selecionar}</option>
            {opcoesPrazo.map((opcao) => <option key={opcao} value={opcao}>{opcao}</option>)}
          </select>
          {ehPersonalizado(formulario.prazo, opcoesPrazo) && (
            <input type="text" value={formulario.prazo === personalizado ? "" : formulario.prazo} onChange={atualizarPersonalizado("prazo")} maxLength={100} placeholder={textosAtuais.formulario.prazoPlaceholder} />
          )}
          {erros.prazo && <small role="alert">{erros.prazo}</small>}
        </label>
      </div>
      <label className={`campo${classeCampo("mensagem")}`}>
        <span>{textosAtuais.formulario.mensagem}</span>
        <textarea value={formulario.mensagem} onChange={atualizar("mensagem")} maxLength={1000} rows={4} placeholder={textosAtuais.formulario.mensagemPlaceholder} />
        {erros.mensagem && <small role="alert">{erros.mensagem}</small>}
      </label>
      <button className="botao-primario" type="submit">
        <Calculator size={15} /> {textosAtuais.formulario.enviar}
      </button>
      {enviado && <p className="formulario-sucesso">{textosAtuais.formulario.sucesso}</p>}
    </form>
  );
}
