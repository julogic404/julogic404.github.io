import { Download } from "lucide-react";
import type { ProjetoConteudo } from "../../content/site";

/** Imagem com proteção contra arrastar/guardar. */
export function ImagemProtegida({ className: nomeClasse, ...propriedades }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const classeCombinada = `imagem-protegida${nomeClasse ? ` ${nomeClasse}` : ""}`;
  const estiloBase: React.CSSProperties = { userSelect: "none" };
  const estiloCombinado = propriedades.style ? { ...estiloBase, ...propriedades.style } : estiloBase;
  return (
    <img
      {...propriedades}
      className={classeCombinada}
      draggable={false}
      onContextMenu={(evento: React.MouseEvent<HTMLImageElement>) => evento.preventDefault()}
      onDragStart={(evento: React.DragEvent<HTMLImageElement>) => evento.preventDefault()}
      onMouseDown={(evento: React.MouseEvent<HTMLImageElement>) => {
        if (evento.button === 1 || evento.button === 2) evento.preventDefault();
      }}
      style={estiloCombinado}
    />
  );
}

export function TituloSecao({ chapeu, children: conteudo }: { chapeu: string; children: React.ReactNode }) {
  return (
    <div className="secao-titulo">
      <span>{chapeu}</span>
      <h2>{conteudo}</h2>
      <i />
    </div>
  );
}

export function PreviaProjeto({ projeto }: { projeto: ProjetoConteudo }) {
  return (
    <div className="previa-projeto">
      <ImagemProtegida src={projeto.imagem} alt={projeto.titulo} loading="lazy" />
    </div>
  );
}

export function DownloadProjeto({ projeto }: { projeto: ProjetoConteudo }) {
  return (
    <a
      className="download-projeto"
      href={projeto.urlDownload}
      download
      aria-label={`${projeto.rotuloDownload}: ${projeto.titulo}`}
      onClick={(evento) => {
        if (!projeto.urlDownload) evento.preventDefault();
      }}
    >
      <Download size={12} /> {projeto.rotuloDownload}
    </a>
  );
}
