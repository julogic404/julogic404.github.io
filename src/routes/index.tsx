import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { conteudoPara, marca, seo, textos } from "../content/site";
import { Cabecalho } from "../components/site/cabecalho";
import { ContactoRodape, Destaque, Estatisticas } from "../components/site/destaque";
import { Projetos, Servicos, Sobre } from "../components/site/secoes";
import { Orcamento } from "../components/site/orcamento";
import { usarIdioma } from "../components/site/usar-idioma";

// Todo o conteúdo (PT/EN) e os dados de SEO vêm de src/content/site.ts
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.titulo },
      { name: "description", content: seo.descricao },
      { name: "keywords", content: seo.palavrasChave },
      { property: "og:title", content: seo.titulo },
      { property: "og:description", content: seo.descricaoSocial },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:site_name", content: marca.nome },
      { property: "og:locale", content: "pt_AO" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.titulo },
      { name: "twitter:description", content: seo.descricaoSocial },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: marca.nome,
          url: "/",
          email: marca.email,
          areaServed: "AO",
          address: { "@type": "PostalAddress", addressLocality: "Luanda", addressCountry: "AO" },
          makesOffer: seo.ofertas.map((nome) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: nome },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: "/" },
            { "@type": "ListItem", position: 2, name: textos.pt.navegacao.servicos, item: "/#servicos" },
            { "@type": "ListItem", position: 3, name: textos.pt.navegacao.projetos, item: "/#projetos" },
            { "@type": "ListItem", position: 4, name: textos.pt.navegacao.orcamento, item: "/#orcamento" },
            { "@type": "ListItem", position: 5, name: textos.pt.navegacao.contacto, item: "/#contacto" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: seo.perguntasFrequentes.map((item) => ({
            "@type": "Question",
            name: item.pergunta,
            acceptedAnswer: { "@type": "Answer", text: item.resposta },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: `Projetos em destaque da ${marca.nome}`,
          description: `Apresentação dos aplicativos Android e Website desenvolvidos pela ${marca.nome}.`,
          inLanguage: "pt-AO",
          author: { "@type": "Organization", name: marca.nome },
          publisher: { "@type": "Organization", name: marca.nome },
          mainEntityOfPage: { "@type": "WebPage", "@id": "/" },
          datePublished: "2024-01-01",
          dateModified: new Date().toISOString().slice(0, 10),
        }),
      },
    ],
  }),
  component: PaginaInicial,
});

function PaginaInicial() {
  const refPrincipal = useRef<HTMLElement>(null);
  const { idioma, escolherIdioma } = usarIdioma();
  const conteudo = conteudoPara(idioma);

  // Efeito "glitch" nos títulos e rótulos quando entram no ecrã.
  useEffect(() => {
    const raiz = refPrincipal.current;
    if (!raiz) return;

    const alvosGlitch = raiz.querySelectorAll<HTMLElement>("h1, h2, h3, a, button, strong, span, small, time, b");

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("glitch-on");
            observador.unobserve(entrada.target);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px" },
    );

    alvosGlitch.forEach((elemento) => {
      if (elemento.closest("p")) return;
      const conteudoTexto = elemento.textContent?.trim();
      if (!conteudoTexto) return;
      elemento.dataset["glitch"] = conteudoTexto;
      observador.observe(elemento);
    });

    return () => observador.disconnect();
  }, [idioma]);

  return (
    <main ref={refPrincipal}>
      <Cabecalho conteudo={conteudo} idioma={idioma} escolherIdioma={escolherIdioma} />
      <Destaque conteudo={conteudo} />
      <Estatisticas conteudo={conteudo} />
      <Servicos conteudo={conteudo} />
      <Projetos conteudo={conteudo} />
      <Sobre conteudo={conteudo} />
      <Orcamento conteudo={conteudo} idioma={idioma} />
      <ContactoRodape conteudo={conteudo} />
      <footer>
        <span>
          © {new Date().getFullYear()} {conteudo.textos.rodape}
        </span>
      </footer>
    </main>
  );
}
