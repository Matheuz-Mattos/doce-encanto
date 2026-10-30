# Documentação — Doce Encanto

## Objetivo e metodologia

Dar continuidade à proposta da PIT I: uma loja de cupcakes com vendas on-line, pedidos e entrega. A solução foi desenvolvida incrementalmente, com histórias de usuário, backlog, commits em português e revisão da interface após testes.

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

Preparação e GitHub; catálogo; carrinho; entrega e pagamento; servidor e PostgreSQL; publicação; histórico e ajustes visuais: implementados. Registros de qualidade: disponíveis em relatório interno simulado. Word e vídeos: preenchimento e gravação pelo aluno.

## Arquitetura

HTML estrutura as páginas, CSS define aparência e responsividade e JavaScript controla a interface. Node.js e Express recebem requisições, validam dados e consultam PostgreSQL. GitHub guarda o código; Render hospeda servidor e banco. VS Code é o editor utilizado.

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

Um pedido possui vários itens; cada item referencia um produto. As consultas SQL usam parâmetros. O servidor consulta os preços no banco e calcula em centavos, ignorando preços recebidos do navegador. A transação garante que pedido e itens sejam salvos juntos. Produtos inativos não podem ser comprados; nomes e preços históricos são preservados.

## Manual do cliente

Escolha os sabores, abra Carrinho, revise quantidades, preencha contatos e endereço, selecione pagamento na entrega e confirme. Guarde o link privado. Meus pedidos reúne compras deste navegador. Em outro aparelho, abra o link de cada pedido.

## Limites e melhorias futuras

Não há login, painel administrativo, cobrança on-line ou disparo automático de e-mail/WhatsApp. O status permanece Em preparação. O histórico é local ao navegador; os pedidos permanecem no banco. Quem possui o link privado pode consultar o pedido. O catálogo visual ainda está definido no JavaScript, enquanto os preços de compra vêm do banco.

Melhorias futuras: catálogo carregado pela API, autenticação, gestão protegida de pedidos, atualização de status e notificações. Essas funções não estão implementadas.

## Qualidade

Consulte [os cinco cenários simulados e o laudo](testes-e-correcoes.md). Execute `npm test` para os sete testes automatizados. Os registros simulados não representam avaliações de colegas reais.
