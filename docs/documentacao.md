# Documentação — Doce Encanto

## Objetivo e metodologia

Meu objetivo foi dar continuidade à proposta da PIT I: uma loja de cupcakes com vendas on-line, pedidos e entrega. Fui montando o projeto por etapas, usando histórias de usuário, backlog e commits em português. Conforme testava, fui ajustando a interface.

## Histórias de usuário

| ID | Necessidade | Aceitação |
| --- | --- | --- |
| US01 | Como visitante, quero consultar sabores para escolher produtos. | Três cupcakes com nome, foto, descrição e preço. |
| US02 | Como cliente, quero adicionar vários sabores antes de comprar. | Permanecer no catálogo e atualizar o contador. |
| US03 | Como cliente, quero ajustar meu carrinho. | Alterar quantidades inteiras de 1 a 20 e remover itens. |
| US04 | Como cliente, quero manter minha seleção. | Recuperar o carrinho ao atualizar a página. |
| US05 | Como cliente, quero informar entrega e contatos. | Nome, e-mail, telefone com DDD e endereço obrigatórios. |
| US06 | Como cliente, quero escolher como pagar. | Pix, cartão ou dinheiro, sempre na entrega. |
| US07 | Como cliente, quero confirmar a compra. | Salvar pedido e itens juntos, exibindo confirmação e link. |
| US08 | Como cliente, quero consultar meus pedidos. | Histórico deste navegador e consulta pelo link privado. |
| US09 | Como cliente, quero entender o andamento. | Três etapas visuais, com Em preparação ativa nesta versão. |

## Backlog final

Primeiro organizei a pasta e o GitHub. Depois fiz o catálogo, carrinho, formulário de entrega e pagamento, servidor e banco. Em seguida, publiquei o site e acrescentei o histórico e os ajustes visuais. Também organizei os registros de qualidade. O preenchimento do Word e a gravação dos vídeos ficam comigo.

## Arquitetura

Usei HTML para estruturar as páginas, CSS para a aparência e adaptação ao celular e JavaScript para as interações. No back-end, coloquei Node.js e Express para receber os dados, validar e consultar o PostgreSQL. Trabalhei no VS Code, guardei o código no GitHub e publiquei no Render.

| Interface | Função |
| --- | --- |
| GET /api/produtos | Retornar produtos ativos |
| POST /api/pedidos | Validar, recalcular total e salvar |
| GET /api/pedidos/:token | Consultar pedido por UUID privado |

Respostas principais: 201 para criação, 400 para entrada inválida, 404 para pedido inexistente e 503 para indisponibilidade.

## Banco e regras de negócio

| Tabela | Campos principais |
| --- | --- |
| produtos | ID, nome, descrição, preço em centavos, imagem, ativo |
| pedidos | ID, token único, nome, e-mail, telefone, endereço, pagamento, status, total, data |
| itens_pedido | ID, pedido, produto, nome e preço preservados, quantidade |

Organizei o banco para cada pedido ter vários itens, ligados aos produtos. Usei consultas SQL com parâmetros. Deixei o servidor buscar os preços no banco e calcular em centavos, sem confiar no preço enviado pelo navegador. Também usei uma transação para salvar pedido e itens juntos. Mantive o nome e o preço de cada item no histórico, mesmo se o catálogo mudar depois.

## Manual do cliente

Montei o fluxo assim: o cliente escolhe os sabores, abre o carrinho, confere as quantidades e preenche os contatos e o endereço. Depois escolhe como pagar na entrega e confirma. Coloquei um link privado para consultar o pedido e a página Meus pedidos para reunir as compras deste navegador. Em outro aparelho, é preciso abrir o link de cada pedido.

## Limites e melhorias futuras

Nesta versão, não implementei login, painel administrativo, cobrança on-line ou mensagens automáticas de e-mail/WhatsApp. Deixei o status em Em preparação e o histórico vinculado ao navegador, com os pedidos salvos no banco. Quem tiver o link privado consegue consultar o pedido. Mantive o catálogo visual no JavaScript e os preços usados na compra no banco.

Como próximos passos, posso carregar o catálogo pela API e acrescentar autenticação, gestão dos pedidos, atualização de status e notificações. Essas funções ainda não foram implementadas.

## Qualidade

Organizei os resultados nos [cinco registros internos](testes-e-correcoes.md) e no [laudo de qualidade](laudo-de-qualidade.md). Os sete testes automatizados podem ser executados com `npm test`.
