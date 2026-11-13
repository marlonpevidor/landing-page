/* =========================================================
   ARQUIVO DE DADOS — É SÓ ESTE ARQUIVO QUE VOCÊ PRECISA EDITAR
   =========================================================

   Só adicione um negócio DEPOIS de confirmar a referência com o pastor.

   Para adicionar, copie um bloco { ... } da lista abaixo, cole no
   final (antes do "]") e troque os dados.

   - whatsapp: só números, com 55 + DDD + número. Ex.: "5511987654321"
   - instagram: só o nome do perfil, sem o "@". Ex.: "papelariadamaria"
   - Se a pessoa não tiver algum contato, deixe "" (vazio).
   - categoria e igreja: escreva sempre do MESMO jeito para que os
     filtros juntem tudo certinho.
   - pastor: nome de quem deu a referência (aparece no site).
   - referenciaEm: mês/ano em que a referência foi confirmada.
   - exemplo: true marca um negócio FICTÍCIO (aparece o aviso
     "Exemplo fictício"). Nos cadastros reais, não use esta linha.
     Quando entrarem os cadastros reais, apague os exemplos.

   ATENÇÃO: este arquivo fica público. NÃO coloque aqui o telefone
   do pastor nem a mensagem de referência — guarde isso só com você.
*/

const CONFIG = {
  titulo: "Guia de Negócios da Igreja",
  subtitulo: "Antes de comprar em qualquer lugar, compre de um irmão. Serviços, comércios e empresas de irmãos de várias igrejas — todos com referência pastoral.",
  // WhatsApp de quem organiza o guia (recebe os pedidos de cadastro)
  whatsappResponsavel: "5561984366777",

  // Oferta por Pix (página "Cadastro enviado")
  pix: {
    chave: "+5561984366777",     // chave Pix (telefone no formato +55 DDD número)
    nome: "Marlon Pevidor Meira", // nome do recebedor (até 25 letras)
    cidade: "Brasília",          // cidade do recebedor (até 15 letras)
    valores: [10, 20, 50],       // valores dos botões, em reais
  },
};

// Registra um clique no painel do GoatCounter (marlonpevidor.goatcounter.com)
function registrarClique(nome) {
  try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: nome, title: nome, event: true }); } catch (e) {}
}

const NEGOCIOS = [
  {
    nome: "DECC — Davi Educação Cristã Clássica",
    responsavel: "Marlon Pevidor",
    categoria: "Educação",
    descricao: "Mentoria individual de carreira em Educação Cristã Clássica e consultoria para abertura de escolas ou transição de escolas cristãs para cristãs clássicas.",
    local: "Taguatinga, DF",
    whatsapp: "5561984366777",
    instagram: "marlonpevidor",
    igreja: "Igreja Batista Central de Taguatinga",
    pastor: "Pr. Matheus Guimarães Guerra Gama",
    referenciaEm: "11/2026",
  },

  /* ----- EXEMPLOS FICTÍCIOS (apagar quando houver mais cadastros reais) ----- */
  {
    nome: "Papelaria Pão da Vida",
    responsavel: "Irmã Maria Souza",
    categoria: "Papelaria",
    descricao: "Cadernos, material escolar, impressões, cópias e encadernação.",
    local: "Centro — Rua das Flores, 120",
    whatsapp: "",
    instagram: "",
    igreja: "Igreja Batista Esperança",
    pastor: "Pr. Antônio Silva",
    exemplo: true,
    referenciaEm: "11/2026",
  },
  {
    nome: "Montagem de Móveis do João",
    responsavel: "Irmão João Pereira",
    categoria: "Montagem de Móveis",
    descricao: "Montagem e desmontagem de guarda-roupas, cozinhas, camas e escritórios. Atendo em domicílio.",
    local: "Atende toda a cidade",
    whatsapp: "",
    instagram: "",
    igreja: "Assembleia de Deus Ministério Vida",
    pastor: "Pr. Marcos Almeida",
    exemplo: true,
    referenciaEm: "11/2026",
  },
  {
    nome: "Mercadinho Bom Pastor",
    responsavel: "Família Oliveira",
    categoria: "Mercado",
    descricao: "Hortifruti, padaria, frios e mercearia. Fazemos entrega no bairro.",
    local: "Jardim América",
    whatsapp: "",
    instagram: "",
    igreja: "Igreja Batista Esperança",
    pastor: "Pr. Antônio Silva",
    exemplo: true,
    referenciaEm: "10/2026",
  },
  {
    nome: "Doces da Ana",
    responsavel: "Irmã Ana Lima",
    categoria: "Alimentação",
    descricao: "Bolos de aniversário, docinhos e salgados para festas. Encomendas com 3 dias de antecedência.",
    local: "Vila Nova",
    whatsapp: "",
    instagram: "",
    igreja: "Igreja Presbiteriana Central",
    pastor: "Rev. Paulo Mendes",
    exemplo: true,
    referenciaEm: "11/2026",
  },
  {
    nome: "Elétrica Luz do Mundo",
    responsavel: "Irmão Carlos Santos",
    categoria: "Reformas e Manutenção",
    descricao: "Instalações elétricas, troca de chuveiro, quadro de luz e pequenos reparos.",
    local: "Atende toda a cidade",
    whatsapp: "",
    instagram: "",
    igreja: "Assembleia de Deus Ministério Vida",
    pastor: "Pr. Marcos Almeida",
    exemplo: true,
    referenciaEm: "09/2026",
  },
  {
    nome: "Studio Graça Beleza",
    responsavel: "Irmã Priscila Rocha",
    categoria: "Beleza",
    descricao: "Corte, escova, manicure e design de sobrancelhas.",
    local: "Centro",
    whatsapp: "",
    instagram: "",
    igreja: "Comunidade Evangélica Renovo",
    pastor: "Pra. Débora Costa",
    exemplo: true,
    referenciaEm: "11/2026",
  },
];
