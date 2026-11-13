/* =========================================================
   ARQUIVO DE DADOS — É SÓ ESTE ARQUIVO QUE VOCÊ PRECISA EDITAR
   =========================================================

   Só adicione um negócio DEPOIS de confirmar a referência com o pastor.

   Para adicionar, copie um bloco { ... } da lista abaixo, cole no
   final (antes do "]") e troque os dados.

   - whatsapp: só números, com 55 + DDD + número. Ex.: "5561999999999"
   - instagram: só o nome do perfil, sem o "@". Ex.: "papelariadamaria"
   - Se a pessoa não tiver algum contato, deixe "" (vazio).
   - categoria e igreja: escreva sempre do MESMO jeito para que os
     filtros juntem tudo certinho.
   - endereco (opcional): só para quem atende em local fixo, ex.:
     "Rua das Flores, 120, Loja 2 - Centro". Com ele, a cidade no cartão
     vira link para o mapa. Nunca coloque endereço residencial.
   - cidade e estado: usados no filtro "Região". Estado sempre com a
     sigla (DF, GO, SP...). Escreva a cidade sempre do mesmo jeito.
   - tratamento ("irmão" ou "irmã") e preposicaoIgreja ("na" ou "no"):
     montam a frase "O irmão Marlon congrega na" acima da igreja.
     Sem eles, aparece "Marlon congrega em".
   - pastor: nome de quem deu a referência (aparece no site).
   - fixado: true deixa o negócio sempre em primeiro, com o ícone de alfinete.
   - Ordem no site: fixados primeiro; depois, do cadastro mais recente
     (o último desta lista) para o mais antigo. Sempre acrescente no fim.
   - referenciaEm: mês/ano em que a referência foi confirmada.
   - exemplo: true marca um negócio FICTÍCIO (aparece o aviso
     "Exemplo fictício"). Nos cadastros reais, não use esta linha.
     Quando entrarem os cadastros reais, apague os exemplos.

   ATENÇÃO: este arquivo fica público. NÃO coloque aqui o telefone
   do pastor nem a mensagem de referência — guarde isso só com você.
*/

const CONFIG = {
  titulo: "Guia de Negócios da Igreja",
  subtitulo: "Antes de comprar em qualquer lugar, compre de um irmão em Cristo. Serviços, comércios e empresas de irmãos de várias igrejas — todos com referência pastoral.",
  // WhatsApp de quem organiza o guia (recebe os pedidos de cadastro)
  whatsappResponsavel: "5561984366777",
  // Endereço oficial do site (usado nos links de acompanhamento)
  siteUrl: "https://guia-de-negocios-da-igreja.pages.dev",

  // Planilha do andamento dos cadastros (Google Planilhas publicada como CSV).
  // Colunas: codigo | etapa (2 = pedido ao pastor, 3 = pastor respondeu, 4 = publicado).
  // Enquanto estiver vazio, a página de acompanhamento mostra só a etapa 1.
  planilhaAndamento: "https://docs.google.com/spreadsheets/d/1RkOVeutxmQbFa44LY12k7AkYhmQuHSsPblbh0YZJDU0/gviz/tq?tqx=out:csv",

  // Quem assina a mensagem enviada ao pastor
  nomeResponsavel: "Marlon",
  // Formulário de referência do pastor (link pré-preenchido do Google Forms;
  // IRMAO, PASTOR e IGREJA são trocados pelos dados de cada cadastro)
  formularioPastor: "https://docs.google.com/forms/d/e/1FAIpQLSfNbKPUKw_ReS4m2MAaRpkyXAHCq-mOUdq3tEPMZjaYVvWWjg/viewform?usp=pp_url&entry.911691460=IRMAO&entry.1140995583=PASTOR&entry.1955880514=IGREJA",

  // Canal do WhatsApp (1 aviso por semana com os novos cadastros)
  canalWhatsApp: "https://whatsapp.com/channel/0029Vb9X1p384OmL2EIjET2W",

  // Oferta por Pix (página "Cadastro enviado")
  pix: {
    chave: "+5561984366777",     // chave Pix (telefone no formato +55 DDD número)
    nome: "Marlon Pevidor Meira", // nome do recebedor (até 25 letras)
    cidade: "Brasília",          // cidade do recebedor (até 15 letras)
    valores: [10, 20, 50],       // valores dos botões, em reais
    maisEscolhido: null,         // ex.: 20 → botão azul com "valor mais escolhido" (null = sem destaque)
  },
};

// Registra um clique no painel do GoatCounter (marlonpevidor.goatcounter.com)
function registrarClique(nome) {
  try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: nome, title: nome, event: true }); } catch (e) {}
}

const NEGOCIOS = [
  {
    fixado: true,
    nome: "DECC — Davi Educação Cristã Clássica",
    responsavel: "Marlon Pevidor",
    categoria: "Educação",
    descricao: "Mentoria individual de carreira em Educação Cristã Clássica e consultoria para abertura de escolas ou transição de escolas cristãs para cristãs clássicas.",
    local: "Taguatinga, DF",
    cidade: "Taguatinga",
    estado: "DF",
    whatsapp: "5561984366777",
    instagram: "marlonpevidor",
    tratamento: "irmão",
    igreja: "Igreja Batista Central de Taguatinga",
    preposicaoIgreja: "na",
    pastor: "Pr. Matheus Guimarães Guerra Gama",
    referenciaEm: "11/2026",
  },
{
    nome: "Carol Sá Semijoias de Luxo",
    responsavel: "Carol Sá",
    categoria: "Semijoias",
    descricao: "Semijoias de luxo com significado, elegância e propósito: colares, brincos, anéis e pulseiras para usar no dia a dia ou presentear. Atendimento em Brasília.",
    local: "Atende todo o DF",
    cidade: "Águas Claras",
    estado: "DF",
    whatsapp: "5561984310004",
    instagram: "carol_sa_semijoias",
    tratamento: "irmã",
    igreja: "Igreja Batista Central de Taguatinga",
    preposicaoIgreja: "na",
    pastor: "Pr. Matheus Guimarães Guerra Gama",
    referenciaEm: "11/2026",
  },
];

/* =========================================================
   TESTEMUNHOS — só publique com a autorização da pessoa
   (guarde a autorização no WhatsApp).
   ========================================================= */
const TESTEMUNHOS = [
  {
    texto: "Que excelente iniciativa! De muito valor!",
    nome: "Luísa Jesus",
  },
];
