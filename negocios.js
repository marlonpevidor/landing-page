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

   ATENÇÃO: este arquivo fica público. NÃO coloque aqui o telefone
   do pastor nem a mensagem de referência — guarde isso só com você.
*/

const CONFIG = {
  titulo: "Guia de Negócios dos Irmãos",
  subtitulo: "Antes de comprar em qualquer lugar, compre de um irmão. Serviços, comércios e empresas de irmãos de várias igrejas — todos com referência do seu pastor.",
  // WhatsApp de quem organiza o guia (recebe os pedidos de cadastro)
  whatsappResponsavel: "5511999999999",
};

const NEGOCIOS = [
  {
    nome: "Papelaria Pão da Vida",
    responsavel: "Irmã Maria Souza",
    categoria: "Papelaria",
    descricao: "Cadernos, material escolar, impressões, cópias e encadernação.",
    local: "Centro — Rua das Flores, 120",
    whatsapp: "5511999990001",
    instagram: "papelariapaodavida",
    igreja: "Igreja Batista Esperança",
    pastor: "Pr. Antônio Silva",
    referenciaEm: "11/2026",
  },
  {
    nome: "Montagem de Móveis do João",
    responsavel: "Irmão João Pereira",
    categoria: "Montagem de Móveis",
    descricao: "Montagem e desmontagem de guarda-roupas, cozinhas, camas e escritórios. Atendo em domicílio.",
    local: "Atende toda a cidade",
    whatsapp: "5511999990002",
    instagram: "",
    igreja: "Assembleia de Deus Ministério Vida",
    pastor: "Pr. Marcos Almeida",
    referenciaEm: "11/2026",
  },
  {
    nome: "Mercadinho Bom Pastor",
    responsavel: "Família Oliveira",
    categoria: "Mercado",
    descricao: "Hortifruti, padaria, frios e mercearia. Fazemos entrega no bairro.",
    local: "Jardim América",
    whatsapp: "5511999990003",
    instagram: "mercadinhobompastor",
    igreja: "Igreja Batista Esperança",
    pastor: "Pr. Antônio Silva",
    referenciaEm: "10/2026",
  },
  {
    nome: "Doces da Ana",
    responsavel: "Irmã Ana Lima",
    categoria: "Alimentação",
    descricao: "Bolos de aniversário, docinhos e salgados para festas. Encomendas com 3 dias de antecedência.",
    local: "Vila Nova",
    whatsapp: "5511999990004",
    instagram: "docesdaana",
    igreja: "Igreja Presbiteriana Central",
    pastor: "Rev. Paulo Mendes",
    referenciaEm: "11/2026",
  },
  {
    nome: "Elétrica Luz do Mundo",
    responsavel: "Irmão Carlos Santos",
    categoria: "Reformas e Manutenção",
    descricao: "Instalações elétricas, troca de chuveiro, quadro de luz e pequenos reparos.",
    local: "Atende toda a cidade",
    whatsapp: "5511999990005",
    instagram: "",
    igreja: "Assembleia de Deus Ministério Vida",
    pastor: "Pr. Marcos Almeida",
    referenciaEm: "09/2026",
  },
  {
    nome: "Studio Graça Beleza",
    responsavel: "Irmã Priscila Rocha",
    categoria: "Beleza",
    descricao: "Corte, escova, manicure e design de sobrancelhas.",
    local: "Centro",
    whatsapp: "5511999990006",
    instagram: "studiograca",
    igreja: "Comunidade Evangélica Renovo",
    pastor: "Pra. Débora Costa",
    referenciaEm: "11/2026",
  },
];
