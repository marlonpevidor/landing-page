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
   - cidade e estado: usados no filtro "Região". Estado sempre com a
     sigla (DF, GO, SP...). Escreva a cidade sempre do mesmo jeito.
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
  subtitulo: "Antes de comprar em qualquer lugar, compre de um irmão em Cristo. Serviços, comércios e empresas de irmãos de várias igrejas — todos com referência pastoral.",
  // WhatsApp de quem organiza o guia (recebe os pedidos de cadastro)
  whatsappResponsavel: "5561984366777",
  // Canal do WhatsApp (1 aviso por semana com os novos cadastros)
  canalWhatsApp: "https://whatsapp.com/channel/0029Vb9X1p384OmL2EIjET2W",

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
    cidade: "Taguatinga",
    estado: "DF",
    whatsapp: "5561984366777",
    instagram: "marlonpevidor",
    igreja: "Igreja Batista Central de Taguatinga",
    pastor: "Pr. Matheus Guimarães Guerra Gama",
    referenciaEm: "11/2026",
  },
];
