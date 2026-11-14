# Manual de operação — Guia de Negócios da Igreja

Site: https://guia-de-negocios-da-igreja.pages.dev
Código: GitHub, repositório `marlonpevidor/landing-page`, ramo `claude/focused-cerf-4mgf48`

---

## 1. Contas que o guia usa (ative a verificação em duas etapas em todas)

| Conta | Para quê |
|---|---|
| **Cloudflare** (dash.cloudflare.com) | Hospeda o site. Projeto: `guia-de-negocios-da-igreja` |
| **Google** | Formulário de referência do pastor, planilha do andamento |
| **GitHub** | Cópia de segurança de todo o código |
| **GoatCounter** (marlonpevidor.goatcounter.com) | Contagem de visitas e cliques |
| **WhatsApp** | Recebe os cadastros; canal de avisos semanais |

---

## 2. Quando chega um cadastro novo

A mensagem chega no WhatsApp do responsável com todos os dados, o **código de acompanhamento** e o link **ENVIAR AO PASTOR**.

1. **Confira o número do pastor** no Instagram ou no site da igreja (a mensagem traz a rede social da igreja). Nunca aceite print ou mensagem encaminhada pelo próprio irmão.
2. Toque no link **ENVIAR AO PASTOR** e envie. O formulário chega com o nome do irmão, do pastor e da igreja já preenchidos.
3. Na **planilha do andamento**, acrescente uma linha: `código | 2`.
4. Quando o pastor responder (as respostas ficam na planilha do Google Forms), mude a etapa para `3`.
   - Entra no guia apenas quem receber **"Sim, recomendo"**.
   - Quem receber "Não conheço esta pessoa" ou "Prefiro não recomendar" não entra. Apague a mensagem do cadastro em até 30 dias.

---

## 3. Colocar o negócio no site

**Com o Claude:** cole a mensagem do cadastro (como chegou no WhatsApp) e diga "a referência foi confirmada, pode cadastrar". O Claude devolve um zip pronto. Vários cadastros podem ir juntos em uma única mensagem.

**Sozinho:** abra `negocios.js` em um editor de texto, copie um bloco `{ ... },` da lista `NEGOCIOS`, cole **no fim da lista** e troque os dados. Campos:

- `nome`, `responsavel`, `categoria`, `descricao`
- `local` (bairro ou região que atende), `cidade`, `estado` (sigla: DF, GO, SP…)
- `endereco` (opcional, apenas para loja ou escritório; nunca residencial)
- `whatsapp` (apenas números: 55 + DDD + número), `instagram` (sem @)
- `tratamento` ("irmão" ou "irmã"), `igreja`, `preposicaoIgreja` ("na" ou "no")
- `pastor` (ex.: "Pr. Fulano"), `referenciaEm` (mês/ano, ex.: "11/2026")
- `fixado: true` (opcional: fica sempre em primeiro, com alfinete)

Ordem no site: fixados primeiro; depois do cadastro mais recente para o mais antigo.

Depois de publicar, marque na planilha do andamento a etapa `4`.

---

## 4. Publicar o site (Cloudflare)

1. dash.cloudflare.com → **Workers & Pages** → **guia-de-negocios-da-igreja**
2. **Create deployment** → **Production**
3. Arraste o **zip** (sem descompactar; os arquivos ficam soltos na raiz do zip)
4. **Save and deploy**
5. Abra o site e recarregue (no celular, puxe a tela para baixo).

Se a página abrir com `404`, os arquivos foram para dentro de uma pasta. Gere o zip com os arquivos soltos.

---

## 5. Rotina semanal

- [ ] Responder os cadastros e mandar os formulários aos pastores
- [ ] Atualizar a planilha do andamento (etapas 2, 3 e 4)
- [ ] Publicar os aprovados (em um único zip)
- [ ] Postar no **canal do WhatsApp**, apenas se entrou alguém. Modelo:
  > 📋 *Novidades da semana no Guia*
  > Entraram *N novos negócios* de irmãos: …
  > Agora são *X negócios* de *Y igrejas* no guia.
  > 🔗 https://guia-de-negocios-da-igreja.pages.dev
- [ ] Olhar o GoatCounter

---

## 6. Pedidos de correção ou remoção (LGPD)

O rodapé do site tem "Quer corrigir ou remover seu cadastro?". Ao receber um pedido:

1. Remova o bloco da pessoa em `negocios.js` (ou peça ao Claude) e publique **o quanto antes, em até 15 dias** (é o que a página de Privacidade promete).
2. Apague a linha dela na planilha do andamento e as respostas do pastor no Google Forms.
3. Responda à pessoa confirmando a remoção.

---

## 7. Testemunhos

Publique apenas com autorização por escrito (guarde a conversa no WhatsApp).
Em `negocios.js`, lista `TESTEMUNHOS`: `{ texto: "…", nome: "…", detalhe: "igreja ou cidade (opcional)" }`.

---

## 8. Oferta por Pix

Dados em `negocios.js` → `CONFIG.pix` (chave, nome, cidade, valores).
Para destacar o valor mais escolhido: `maisEscolhido: 20` (use `null` para nenhum).
Descubra o valor pelo extrato do banco (ofertas com a descrição "Oferta") ou pelo GoatCounter ("Pix copiado").

---

## 9. Manutenção anual

- Renovar as referências com mais de um ano (`referenciaEm`).
- Conferir se os WhatsApps e Instagrams dos negócios ainda funcionam.
- Se uma empresa pagar para ficar fixada, identificar como **"Destaque"** (publicidade paga deve ser identificada).

---

## 10. Arquivos do site

| Arquivo | O que é |
|---|---|
| `negocios.js` | **Dados**: configurações, negócios e testemunhos |
| `index.html`, `app.js` | Página inicial (busca, filtros, cartões) |
| `cadastro.html` | Formulário de cadastro |
| `cadastro-enviado.html`, `andamento.js` | Acompanhamento do cadastro e oferta |
| `pix.js`, `qrcode.js` | Geração do Pix e do QR Code |
| `privacidade.html` | Página de privacidade |
| `estilo.css` | Aparência |
| `icone.png`, `apple-touch-icon.png`, `compartilhar.jpg` | Ícones e imagem do WhatsApp |
| `_headers` | Faz o navegador sempre buscar a versão mais nova |

---

## 11. Continuar com o Claude em uma conversa nova

Diga: *"O site do Guia de Negócios da Igreja está no repositório `marlonpevidor/landing-page`, ramo `claude/focused-cerf-4mgf48`. Leia o MANUAL.md."*
O Claude também mantém uma prévia (artifact) para testar antes de publicar.
