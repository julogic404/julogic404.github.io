/**
 * ============================================================================
 *  FICHEIRO ÚNICO DE CONTEÚDO — JuLogic 404
 * ============================================================================
 *  Tudo o que aparece no site (cabeçalho, apresentação, serviços, projetos
 *  recentes, sobre, orçamento, contacto, rodapé e SEO) está aqui, em
 *  português e inglês. Alterar aqui atualiza o site inteiro — incluindo o
 *  HTML estático gerado no build (dist/client/index.html → docs/index.html).
 *
 *  Regra simples: NÃO é preciso mexer em nenhum componente para atualizar
 *  textos, imagens, links de download, contactos, redes sociais ou números.
 * ============================================================================
 */

import recursoHub from "../assets/julogic_hub.webp";
import recursoJulio from "../assets/julogic_studio.webp";
import recursoAvisport from "../assets/avisport_palpites.webp";
import recursoAngonurse from "../assets/angonurse_plus.webp";
import recursoMindgames from "../assets/angonurse_mindgames.webp";

export type Idioma = "pt" | "en";

/** Nomes de ícones aceites (mapeados em src/components/site/icones.tsx) */
export type NomeIcone =
  | "monitor"
  | "smartphone"
  | "palette"
  | "rocket"
  | "maleta"
  | "codigo"
  | "mensagem";

/* ---------------------------------------------------------------------------
 * 1. MARCA E CONTACTOS
 * ------------------------------------------------------------------------- */
export const marca = {
  nome: "JuLogic 404",
  nomeCurto: "JULOGIC404",
  email: "julogic404@gmail.com",
  telefone: "+244 957 154 238",
  whatsapp: "https://wa.me/244957154238",
  imagemDestaque: recursoHub,
} as const;

export const redesSociais = [
  { rotulo: "GitHub", url: "https://github.com/julogic404" },
  { rotulo: "Facebook", url: "https://facebook.com/julogic404" },
  { rotulo: "Instagram", url: "https://instagram.com/julogic404" },
  { rotulo: "TikTok", url: "https://tiktok.com/@julogic404" },
] as const;

/* ---------------------------------------------------------------------------
 * 2. ESTATÍSTICAS (números da barra abaixo da apresentação)
 * ------------------------------------------------------------------------- */
export const estatisticas = [
  { valor: "+25", icone: "maleta" as NomeIcone, pt: "Projetos Concluídos", en: "Projects Delivered" },
  { valor: "3+", icone: "codigo" as NomeIcone, pt: "Anos de Experiência", en: "Years of Experience" },
  { valor: "15+", icone: "mensagem" as NomeIcone, pt: "Clientes Satisfeitos", en: "Happy Clients" },
  { valor: "100%", icone: "rocket" as NomeIcone, pt: "Dedicação", en: "Dedication" },
];

/* ---------------------------------------------------------------------------
 * 3. SERVIÇOS
 * ------------------------------------------------------------------------- */
export const servicos = [
  {
    icone: "monitor" as NomeIcone,
    pt: { titulo: "Desenvolvimento Web", texto: "Sites, aplicações web e sistemas personalizados com as melhores tecnologias do mercado." },
    en: { titulo: "Web Development", texto: "Websites, web apps and custom systems built with the best technologies available." },
  },
  {
    icone: "smartphone" as NomeIcone,
    pt: { titulo: "Aplicativos Mobile", texto: "Apps nativos e híbridos para Android e iOS com foco em performance e usabilidade." },
    en: { titulo: "Mobile Apps", texto: "Native and hybrid apps for Android and iOS focused on performance and usability." },
  },
  {
    icone: "palette" as NomeIcone,
    pt: { titulo: "UI/UX Design", texto: "Interfaces modernas, intuitivas e centradas no usuário para uma experiência incrível." },
    en: { titulo: "UI/UX Design", texto: "Modern, intuitive and user-centred interfaces for an outstanding experience." },
  },
  {
    icone: "rocket" as NomeIcone,
    pt: { titulo: "SEO & Performance", texto: "Otimização para motores de busca e performance para garantir mais visibilidade e resultados." },
    en: { titulo: "SEO & Performance", texto: "Search engine and performance optimisation for more visibility and better results." },
  },
];

/* ---------------------------------------------------------------------------
 * 4. PROJETOS RECENTES
 *    Para adicionar um projeto: copiar um bloco, trocar título, imagem
 *    (ver src/assets) e o link do APK.
 * ------------------------------------------------------------------------- */
export const projetos = [
  {
    titulo: "JulogicStudio",
    imagem: recursoJulio,
    urlDownload:
      "https://github.com/julogic404/Apps-JuLogic404/releases/download/v1.1.1/JulogicStudio-v1.1.1-release.apk",
    pt: { etiquetas: "Android • Kotlin IDE", rotuloDownload: "Descarregar APK" },
    en: { etiquetas: "Android • Kotlin IDE", rotuloDownload: "Download APK" },
  },
  {
    titulo: "AngoNurse + Estudar Saúde",
    imagem: recursoAngonurse,
    urlDownload:
      "https://github.com/Angonurse/Apps/releases/download/v1.0.0/Angonurse_Plus_-_Estudar_Saude.apk",
    pt: { etiquetas: "Android • Kotlin Educação", rotuloDownload: "Descarregar APK" },
    en: { etiquetas: "Android • Kotlin Education", rotuloDownload: "Download APK" },
  },
  {
    titulo: "AviSport — Palpites Bantubet",
    imagem: recursoAvisport,
    urlDownload:
      "https://github.com/julogic404/Apps-JuLogic404/releases/download/v1.0/AviSport_-_Palpites_Bantubet.apk",
    pt: { etiquetas: "Android • Kotlin Palpites", rotuloDownload: "Descarregar APK" },
    en: { etiquetas: "Android • Kotlin Betting Tips", rotuloDownload: "Download APK" },
  },
  {
    titulo: "AngoNurse MindGames",
    imagem: recursoMindgames,
    urlDownload: "https://github.com/Angonurse/Apps/releases/download/v1.1.2/angonurse-mindgames.apk",
    pt: { etiquetas: "Android • Kotlin Jogos", rotuloDownload: "Descarregar APK" },
    en: { etiquetas: "Android • Kotlin Games", rotuloDownload: "Download APK" },
  },
];

/* ---------------------------------------------------------------------------
 * 5. SOBRE — habilidades, tecnologias e experiência
 * ------------------------------------------------------------------------- */
export const habilidades = [
  { pt: "JavaScript / TypeScript", en: "JavaScript / TypeScript", valor: 90 },
  { pt: "React / Next.js", en: "React / Next.js", valor: 85 },
  { pt: "Node.js", en: "Node.js", valor: 80 },
  { pt: "UI/UX Design", en: "UI/UX Design", valor: 75 },
  { pt: "Python", en: "Python", valor: 70 },
  { pt: "SQL / Banco de Dados", en: "SQL / Databases", valor: 75 },
  { pt: "App Mobile (Java; Kotlin)", en: "Mobile Apps (Java; Kotlin)", valor: 80 },
];

/** Ícones da pilha tecnológica (ver src/components/site/icones-tecnologia.tsx) */
export const tecnologias = ["JS", "TS", "React", "Next.js", "Python", "Java", "Kotlin", "SQL"];

export const experiencia = [
  {
    empresa: "AngoInove",
    data: { pt: "2023 - Atual", en: "2023 - Present" },
    pt: { cargo: "Desenvolvedor Full Stack", texto: "Desenvolvimento de plataformas web e mobile para a área da saúde com foco em performance." },
    en: { cargo: "Full Stack Developer", texto: "Building web and mobile healthcare platforms with a strong focus on performance." },
  },
  {
    empresa: "Freelancer",
    data: { pt: "2021 - 2023", en: "2021 - 2023" },
    pt: { cargo: "Desenvolvedor Frontend", texto: "Criação de interfaces modernas e responsivas para diversos clientes e startups." },
    en: { cargo: "Frontend Developer", texto: "Crafting modern, responsive interfaces for a range of clients and startups." },
  },
  {
    empresa: "Projetos Pessoais",
    data: { pt: "2020 - 2021", en: "2020 - 2021" },
    pt: { cargo: "Designer UI/UX", texto: "Desenvolvimento de conceitos visuais e experiências digitais centradas no usuário." },
    en: { cargo: "UI/UX Designer", texto: "Developing visual concepts and user-centred digital experiences." },
  },
];

/* ---------------------------------------------------------------------------
 * 6. SEO — títulos, descrições e perguntas frequentes do HTML estático
 * ------------------------------------------------------------------------- */
export const seo = {
  titulo: "JuLogic 404: Portfólio - Full Stack e Apps",
  descricao:
    "JuLogic 404: desenvolvimento de sites, aplicações web, apps Android em Kotlin e Java, UI/UX e SEO.",
  descricaoSocial:
    "Ajudamos empresas e pessoas a transformarem ideias em produtos digitais modernos, rápidos e que realmente fazem sentido para os usuários.",
  palavrasChave:
    "JuLogic 404, desenvolvimento web Angola, apps Android Java e Kotlin, UI/UX design Luanda, SEO Angola, programador full stack",
  ofertas: ["Desenvolvimento Web", "Aplicativos Mobile", "UI/UX Design", "SEO & Performance"],
  perguntasFrequentes: [
    {
      pergunta: "Que serviços a JuLogic 404 oferece?",
      resposta:
        "Desenvolvimento Web, Aplicativos Mobile para Android e iOS, UI/UX Design e otimização de SEO & Performance.",
    },
    {
      pergunta: "Como peço um orçamento?",
      resposta:
        "Preencha o formulário da secção Orçamento com nome, email, tipo de projeto, moeda, valor estimado, prazo e descrição. O pedido segue por email e respondemos em breve.",
    },
    {
      pergunta: "Onde a JuLogic 404 está localizada?",
      resposta: "Estamos em Luanda, Angola, e trabalhamos também com clientes remotos.",
    },
    {
      pergunta: "Posso descarregar os aplicativos do portefólio?",
      resposta:
        "Sim. Os projetos JulogicStudio, AngoNurse + Estudar Saúde, AviSport e AngoNurse MindGames têm o APK disponível para descarregar na secção Projetos.",
    },
  ],
} as const;

/* ---------------------------------------------------------------------------
 * 7. TEXTOS DA INTERFACE (rótulos, botões, formulário) — PT e EN
 * ------------------------------------------------------------------------- */
export const ROTULO_PERSONALIZADO = { pt: "Personalizar", en: "Custom" } as const;
export const moedas = ["AOA", "USD"] as const;
export type Moeda = (typeof moedas)[number];

export const textos = {
  pt: {
    navegacao: { inicio: "Home", sobre: "Sobre", servicos: "Serviços", projetos: "Projetos", orcamento: "Orçamento", contacto: "Contacto" },
    navegacaoRotulo: "Navegação principal",
    contratar: "Fale Conosco",
    apresentacaoChapeu: "Bem-vindo à",
    funcaoAntes: "Estúdio de ",
    funcaoDestaque: "Full Stack",
    funcaoDepois: " & Design de Experiência",
    introducao:
      "Ajudamos empresas e pessoas a transformarem ideias em produtos digitais modernos, rápidos e que realmente fazem sentido para os usuários.",
    verProjetos: "Ver Projetos",
    contactar: "Fale Conosco",
    redesSociais: "Redes sociais",
    disponivel: "Disponíveis",
    disponivelSub: "Para novos trabalhos",
    retratoAlt: "Imagem institucional da JuLogic 404",
    rotuloEstatisticas: "Estatísticas",
    servicosChapeu: "Nossos Serviços",
    servicosTitulo: "O que fazemos",
    projetosChapeu: "Projetos em Destaque",
    projetosTitulo: "Alguns trabalhos recentes",
    verTodosProjetos: "Ver Todos os Projetos",
    habilidadesTitulo: "Nossas Habilidades",
    rotuloTecnologias: "Tecnologias",
    experienciaTitulo: "Experiência",
    orcamentoChapeu: "Orçamento",
    orcamentoTitulo: "Peça um orçamento estimado",
    formulario: {
      nome: "Nome *",
      nomePlaceholder: "O seu nome",
      email: "Email *",
      emailPlaceholder: "voce@exemplo.com",
      tipoProjeto: "Tipo de projeto *",
      tipoProjetoPlaceholder: "Especifique o tipo de projeto",
      moeda: "Moeda *",
      orcamento: "Orçamento estimado *",
      orcamentoPlaceholder: "Especifique o valor estimado",
      prazo: "Prazo *",
      prazoPlaceholder: "Especifique o prazo desejado",
      mensagem: "Descrição do projeto *",
      mensagemPlaceholder: "Conte-nos a sua ideia, objetivos e funcionalidades desejadas…",
      selecionar: "Selecionar…",
      enviar: "Solicitar Orçamento",
      sucesso: "O seu pedido foi preparado no seu email — basta enviar. Responderemos em breve!",
      assunto: "Pedido de Orçamento",
      rotulos: { nome: "Nome", email: "Email", tipoProjeto: "Tipo de projeto", moeda: "Moeda", orcamento: "Orçamento estimado", prazo: "Prazo", descricao: "Descrição do projeto:" },
      erros: {
        nome: "Informe o seu nome.",
        nomeLongo: "O nome deve ter menos de 100 caracteres.",
        email: "Informe o seu email.",
        emailInvalido: "Informe um email válido.",
        tipoProjeto: "Selecione o tipo de projeto.",
        tipoProjetoPersonalizado: "Especifique o tipo de projeto.",
        moeda: "Selecione a moeda.",
        orcamento: "Selecione uma faixa de orçamento.",
        orcamentoPersonalizado: "Especifique o orçamento estimado.",
        prazo: "Selecione um prazo estimado.",
        prazoPersonalizado: "Especifique o prazo estimado.",
        mensagem: "Descreva brevemente o projeto.",
        mensagemLonga: "A descrição deve ter menos de 1000 caracteres.",
      },
    },
    tiposProjeto: ["Site / Landing Page", "Aplicação Web / Sistema", "Aplicativo Mobile", "UI/UX Design", "Outro"],
    faixasOrcamento: {
      AOA: ["Até 100.000 Kz", "100.000 – 300.000 Kz", "300.000 – 700.000 Kz", "Acima de 700.000 Kz"],
      USD: ["Até $300", "$300 – $900", "$900 – $2.000", "Acima de $2.000"],
    },
    prazos: ["Urgente (até 2 semanas)", "1 mês", "2 – 3 meses", "Flexível"],
    contactoTitulo: "Vamos trabalhar juntos?",
    contactoTexto: "Tem um projeto em mente ou precisa de ajuda para tirar sua ideia do papel? Vamos conversar!",
    contactoCta: "Entrar em Contato",
    rotuloEmail: "Email",
    rotuloTelefone: "Telefone",
    rotuloLocalizacao: "Localização",
    localizacao: "Luanda, Angola",
    rodape: "JuLogic 404. Todos os direitos reservados.",
    rotuloIdioma: "Idioma",
  },
  en: {
    navegacao: { inicio: "Home", sobre: "About", servicos: "Services", projetos: "Projects", orcamento: "Quote", contacto: "Contact" },
    navegacaoRotulo: "Main navigation",
    contratar: "Work With Us",
    apresentacaoChapeu: "Welcome to",
    funcaoAntes: "A ",
    funcaoDestaque: "Full Stack",
    funcaoDepois: " & Experience Design Studio",
    introducao:
      "We help companies and people turn ideas into modern, fast digital products that truly make sense for their users.",
    verProjetos: "View Projects",
    contactar: "Talk To Us",
    redesSociais: "Social networks",
    disponivel: "Available",
    disponivelSub: "For new projects",
    retratoAlt: "JuLogic 404 brand image",
    rotuloEstatisticas: "Statistics",
    servicosChapeu: "Our Services",
    servicosTitulo: "What we do",
    projetosChapeu: "Featured Projects",
    projetosTitulo: "Some recent work",
    verTodosProjetos: "View All Projects",
    habilidadesTitulo: "Our Skills",
    rotuloTecnologias: "Technologies",
    experienciaTitulo: "Experience",
    orcamentoChapeu: "Quote",
    orcamentoTitulo: "Request an estimated quote",
    formulario: {
      nome: "Name *",
      nomePlaceholder: "Your name",
      email: "Email *",
      emailPlaceholder: "you@example.com",
      tipoProjeto: "Project type *",
      tipoProjetoPlaceholder: "Describe the project type",
      moeda: "Currency *",
      orcamento: "Estimated budget *",
      orcamentoPlaceholder: "Enter your estimated budget",
      prazo: "Timeline *",
      prazoPlaceholder: "Enter your desired timeline",
      mensagem: "Project description *",
      mensagemPlaceholder: "Tell us about your idea, goals and the features you need…",
      selecionar: "Select…",
      enviar: "Request Quote",
      sucesso: "Your request is ready in your email app — just hit send. We'll reply shortly!",
      assunto: "Quote Request",
      rotulos: { nome: "Name", email: "Email", tipoProjeto: "Project type", moeda: "Currency", orcamento: "Estimated budget", prazo: "Timeline", descricao: "Project description:" },
      erros: {
        nome: "Please enter your name.",
        nomeLongo: "Name must be under 100 characters.",
        email: "Please enter your email.",
        emailInvalido: "Please enter a valid email.",
        tipoProjeto: "Please select a project type.",
        tipoProjetoPersonalizado: "Please describe the project type.",
        moeda: "Please select a currency.",
        orcamento: "Please select a budget range.",
        orcamentoPersonalizado: "Please enter your estimated budget.",
        prazo: "Please select a timeline.",
        prazoPersonalizado: "Please enter your desired timeline.",
        mensagem: "Please describe your project briefly.",
        mensagemLonga: "Description must be under 1000 characters.",
      },
    },
    tiposProjeto: ["Website / Landing Page", "Web App / System", "Mobile App", "UI/UX Design", "Other"],
    faixasOrcamento: {
      AOA: ["Up to 100,000 Kz", "100,000 – 300,000 Kz", "300,000 – 700,000 Kz", "Above 700,000 Kz"],
      USD: ["Up to $300", "$300 – $900", "$900 – $2,000", "Above $2,000"],
    },
    prazos: ["Urgent (up to 2 weeks)", "1 month", "2 – 3 months", "Flexible"],
    contactoTitulo: "Shall we work together?",
    contactoTexto: "Got a project in mind or need help bringing your idea to life? Let's talk!",
    contactoCta: "Get In Touch",
    rotuloEmail: "Email",
    rotuloTelefone: "Phone",
    rotuloLocalizacao: "Location",
    localizacao: "Luanda, Angola",
    rodape: "JuLogic 404. All rights reserved.",
    rotuloIdioma: "Language",
  },
};

export type Textos = typeof textos.pt;

/* ---------------------------------------------------------------------------
 * 8. CONTEÚDO PRONTO POR IDIOMA (usado pelos componentes)
 * ------------------------------------------------------------------------- */
export function conteudoPara(idioma: Idioma) {
  return {
    idioma,
    textos: textos[idioma],
    estatisticas: estatisticas.map((item) => ({ valor: item.valor, icone: item.icone, rotulo: item[idioma] })),
    servicos: servicos.map((item) => ({ icone: item.icone, ...item[idioma] })),
    projetos: projetos.map((item) => ({
      titulo: item.titulo,
      imagem: item.imagem,
      urlDownload: item.urlDownload,
      ...item[idioma],
    })),
    habilidades: habilidades.map((item) => ({ nome: item[idioma], valor: item.valor })),
    experiencia: experiencia.map((item) => ({
      empresa: item.empresa,
      data: item.data[idioma],
      ...item[idioma],
    })),
  };
}

export type ConteudoSite = ReturnType<typeof conteudoPara>;
export type ProjetoConteudo = ConteudoSite["projetos"][number];
