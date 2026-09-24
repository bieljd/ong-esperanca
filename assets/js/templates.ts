export interface Projeto {
  id: string;
  categoria: "educacao" | "ambiente" | "renda" | "saude";
  categoriaLabel: string;
  titulo: string;
  resumo: string;
  imagem: string;
  altImagem: string;
  metas: string[];
  descricao: string;
  impacto: string;
}

export const projetos: Projeto[] = [
  {
    id: "guardaes-do-mar",
    categoria: "educacao",
    categoriaLabel: "Educação",
    titulo: "Guardiões do Mar",
    resumo: "Educação ambiental para jovens de escolas públicas costeiras, conectando conhecimento e ação.",
    imagem: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80&auto=format&fit=crop",
    altImagem: "Crianças em sala de aula com material educativo sobre o oceano",
    metas: ["12 escolas parceiras", "480 estudantes por ano", "36 oficinas realizadas"],
    descricao: "Levamos oficinas práticas de educação ambiental para escolas públicas do litoral paulista. Os alunos aprendem sobre ecossistemas marinhos, ciclo da água, resíduos e cidadania — e colocam a mão na massa em saídas de campo monitoradas por biólogos voluntários.",
    impacto: "Formamos uma geração que enxerga o oceano como parte da sua história.",
  },
  {
    id: "mutirao-praia-limpa",
    categoria: "ambiente",
    categoriaLabel: "Meio ambiente",
    titulo: "Mutirão Praia Limpa",
    resumo: "Ações mensais de limpeza em praias com triagem e destinação correta dos resíduos recolhidos.",
    imagem: "assets/img/projeto-mutirao.jpg",
    altImagem: "Voluntários recolhendo resíduos em praia durante mutirão de limpeza",
    metas: ["128 toneladas recolhidas", "42 praias atendidas", "1.850 voluntários"],
    descricao: "Todo mês mobilizamos voluntários para limpar praias do litoral. Além da coleta, fazemos a triagem dos resíduos, pesamos e registramos os dados em parceria com universidades — gerando informação para políticas públicas de gestão de resíduos.",
    impacto: "Cada quilo retirado é um respiro para o oceano.",
  },
  {
    id: "renda-do-mar",
    categoria: "renda",
    categoriaLabel: "Geração de renda",
    titulo: "Renda do Mar",
    resumo: "Capacitação de pescadores e catadores para o turismo sustentável e a economia circular.",
    imagem: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&q=80&auto=format&fit=crop",
    altImagem: "Pescador artesanal trabalhando em sua rede ao amanhecer",
    metas: ["240 famílias beneficiadas", "8 cursos profissionalizantes", "R$ 1,2 mi em renda gerada"],
    descricao: "Oferecemos formação técnica e apoio na criação de cooperativas para pescadores artesanais e catadores. O foco é diversificar a renda com turismo de base comunitária, artesanato sustentável e venda direta de pescado.",
    impacto: "Preservar o mar também é garantir o sustento de quem vive dele.",
  },
  {
    id: "rio-vivo",
    categoria: "ambiente",
    categoriaLabel: "Meio ambiente",
    titulo: "Rio Vivo",
    resumo: "Monitoramento contínuo da qualidade da água e recuperação de mata ciliar em rios urbanos.",
    imagem: "assets/img/projeto-rio-vivo.jpg",
    altImagem: "Rio de água limpa cercado por vegetação nativa",
    metas: ["18 km de rio monitorados", "4 mil mudas plantadas", "3 municípios parceiros"],
    descricao: "Analisamos mensalmente a qualidade da água de rios que deságuam no mar, em parceria com laboratórios universitários. Também realizamos o plantio de mudas nativas para recuperar a mata ciliar e reduzir o assoreamento.",
    impacto: "Rio limpo é praia limpa. Tudo está conectado.",
  },
  {
    id: "clinica-costeira",
    categoria: "saude",
    categoriaLabel: "Saúde",
    titulo: "Clínica Costeira",
    resumo: "Atendimento médico e odontológico gratuito para comunidades ribeirinhas e pesqueiras.",
    imagem: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&q=80&auto=format&fit=crop",
    altImagem: "Profissional de saúde atendendo moradores em comunidade costeira",
    metas: ["6 mil atendimentos/ano", "12 profissionais voluntários", "4 unidades móveis"],
    descricao: "Levamos unidades móveis de saúde para comunidades distantes dos grandes centros. Oferecemos consultas clínicas, odontologia, exames básicos e orientação sobre saúde preventiva — tudo gratuito e adaptado à rotina de quem vive do mar.",
    impacto: "Saúde é o primeiro passo para qualquer transformação.",
  },
  {
    id: "jovens-pescadores",
    categoria: "renda",
    categoriaLabel: "Geração de renda",
    titulo: "Jovens Pescadores",
    resumo: "Formação técnica para jovens de comunidades pesqueiras, com foco em manejo sustentável.",
    imagem: "assets/img/projeto-jovens-pescadores.jpg",
    altImagem: "Jovens pescadores em formação profissional em comunidade costeira",
    metas: ["180 jovens formados", "9 comunidades atendidas", "92% de inserção no mercado"],
    descricao: "Programa de 6 meses que forma jovens de 16 a 24 anos em técnicas de pesca sustentável, navegação, segurança no mar e gestão de pequenos negócios. Ao final, recebem certificação e apoio para iniciar sua própria atividade.",
    impacto: "O futuro da pesca artesanal está nas mãos de quem aprende a respeitar o mar.",
  },
];

export function criarCardProjeto(projeto: Projeto): HTMLElement {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <article class="project-card" data-projeto="${projeto.id}" data-categoria="${projeto.categoria}" data-titulo="${projeto.titulo}" data-imagem="${projeto.imagem}" data-resumo="${projeto.resumo}" data-descricao="${projeto.descricao}" data-metas="${projeto.metas.join("|")}" data-impacto="${projeto.impacto}">
      <figure class="project-figura">
        <img src="${projeto.imagem}" alt="${projeto.altImagem}" loading="lazy">
        <span class="project-tag">${projeto.categoriaLabel}</span>
      </figure>
      <div class="project-corpo">
        <h3>${projeto.titulo}</h3>
        <p>${projeto.resumo}</p>
        <ul class="project-metas" role="list">
          ${projeto.metas.map((meta) => `<li>${meta}</li>`).join("")}
        </ul>
        <a href="#" class="project-link">Saiba mais <span aria-hidden="true">→</span></a>
      </div>
    </article>
  `.trim();

  const card = wrapper.firstElementChild;
  if (!(card instanceof HTMLElement)) {
    throw new Error("Não foi possível criar o card do projeto.");
  }

  return card;
}

export function renderizarProjetos(lista: Projeto[]): void {
  const grade = document.querySelector<HTMLElement>(".projects-grid");
  if (!grade) return;

  grade.replaceChildren();
  const fragmento = document.createDocumentFragment();
  lista.forEach((projeto) => fragmento.append(criarCardProjeto(projeto)));
  grade.append(fragmento);
}