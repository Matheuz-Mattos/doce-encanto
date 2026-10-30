# Doce Encanto

Projeto acadêmico de uma loja de cupcakes, desenvolvido por Matheus da Silva Mattos (RGM 36338770).

## Objetivo

Permitir que um visitante consulte cupcakes, monte um carrinho e registre um pedido demonstrativo. Os pedidos serão salvos no banco de dados e consultados por um link privado.

## Tecnologias escolhidas

- HTML: estrutura das páginas.
- CSS: cores, aparência e adaptação ao celular.
- JavaScript: interações no navegador e lógica do servidor.
- Node.js e Express: back-end e rotas da aplicação.
- PostgreSQL: persistência de produtos, pedidos e itens.
- VS Code: edição e apresentação do código.
- GitHub: versionamento do código.
- Render: publicação do site e do banco.

## Funcionalidades planejadas

- Catálogo com três cupcakes, cada um com sua própria imagem.
- Carrinho com inclusão, alteração de quantidade e remoção.
- Formulário com nome, endereço e pagamento simulado.
- Validação e cálculo de preços no servidor.
- Pedido salvo no banco e consulta por identificador aleatório.

Não haverá cobrança real, cadastro/login ou painel administrativo nesta versão.

## Histórias de usuário

| ID | História | Critério de aceitação |
| --- | --- | --- |
| US01 | Como visitante, quero ver os cupcakes para escolher meus sabores. | Catálogo apresenta nome, imagem, descrição e preço. |
| US02 | Como visitante, quero adicionar produtos ao carrinho para montar meu pedido. | Produto aparece no carrinho com quantidade e subtotal. |
| US03 | Como visitante, quero alterar quantidades para ajustar meu pedido. | São aceitas quantidades inteiras de 1 a 20. |
| US04 | Como visitante, quero remover produtos para corrigir minha seleção. | Item removido deixa de compor o total. |
| US05 | Como visitante, quero manter o carrinho ao atualizar a página. | Carrinho é recuperado do armazenamento do navegador. |
| US06 | Como cliente, quero informar meus dados de entrega para registrar o pedido. | Campos obrigatórios são validados no navegador e no servidor. |
| US07 | Como cliente, quero visualizar a confirmação para saber que o pedido foi salvo. | Confirmação mostra itens, total e status Recebido. |
| US08 | Como cliente, quero consultar o pedido em outro aparelho para acompanhar seu registro. | Link privado consulta o mesmo pedido no banco. |

## Backlog e etapas

| Ordem | Etapa | Situação |
| --- | --- | --- |
| 1 | Preparar ferramentas, pasta e documentação inicial | Concluída |
| 2 | Construir catálogo responsivo | Concluída |
| 3 | Implementar carrinho | Concluída |
| 4 | Implementar servidor, banco e pedidos | Código pronto; integração PostgreSQL pendente |
| 5 | Publicar e validar link público | A fazer |
| 6 | Executar cinco testes internos e registrar evidências | A fazer |

## Cinco testes internos planejados

1. Catálogo em computador e celular.
2. Inclusão, alteração, remoção e persistência do carrinho.
3. Rejeição de formulário incompleto, carrinho vazio e quantidades inválidas.
4. Registro e consulta de pedido em outro navegador, com preço calculado pelo servidor.
5. Fluxo público, persistência após reinício e resposta a identificador inexistente.

Os testes serão registrados apenas depois da execução. São testes internos, sem participação atribuída a colegas fictícios.

## Estado atual

O catálogo responsivo já pode ser aberto pelo arquivo `public/index.html`. Os próximos passos são carrinho, servidor e banco. Ainda não existe URL pública funcional.

## Entendendo o código no VS Code

- `public/index.html`: estrutura da página, cabeçalho, apresentação e espaço do catálogo.
- `public/estilo.css`: cores, tamanhos, grade de produtos e adaptação ao celular.
- `public/catalogo.js`: lista dos três cupcakes e criação dos cartões pelo JavaScript.
- `public/imagens/`: fotografias ilustrativas geradas para o projeto anterior e reaproveitadas nesta versão.

Os produtos usam dados temporários no JavaScript. Depois serão carregados do banco pelo servidor. O carrinho permite adicionar, alterar e remover produtos, com quantidades entre 1 e 20. A função `salvarCarrinho` grava IDs e quantidades no `localStorage`; `mostrarCarrinho` atualiza a tela e calcula os totais em centavos. Os dados locais são validados ao carregar. A finalização será implementada na próxima etapa.

## Hospedagem gratuita

## Servidor e banco de dados

Execute `npm install`, copie `.env.example` para `.env` e informe a conexão PostgreSQL em `DATABASE_URL`. Depois execute `npm start` e abra `http://localhost:3000`. O servidor cria as tabelas e carrega o catálogo automaticamente. Não publique o arquivo `.env`.

- `servidor.js`: rotas HTTP, registro transacional e consulta por link privado.
- `banco.js`: conexão PostgreSQL, tabelas e carga inicial.
- `dados.js`: catálogo inicial com preços em centavos.
- `validacao.js`: regras obrigatórias verificadas no servidor.
- `test/validacao.test.js`: testes automatizados; execute `npm test`.

O formulário envia somente os dados de entrega, IDs e quantidades. O preço do pedido é consultado no banco; mudanças no JavaScript do navegador não alteram esse preço. Pedido e itens são salvos juntos numa transação.

O arquivo `render.yaml` configura serviço e banco gratuitos por Blueprint. A integração real com PostgreSQL e os testes do fluxo publicado ainda precisam ser executados.

O Render gratuito pode suspender o serviço após inatividade e demorar aproximadamente um minuto para reabrir. O PostgreSQL gratuito expira em 30 dias; a publicação deverá considerar o período de avaliação.
