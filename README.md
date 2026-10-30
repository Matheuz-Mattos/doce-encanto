# Doce Encanto

Eu sou **Matheus da Silva Mattos — RGM 36338770**. Neste projeto, desenvolvi a Doce Encanto, uma loja de cupcakes com catálogo, carrinho, pedidos e acompanhamento, dando continuidade ao Projeto Integrador Transdisciplinar em Engenharia de Software II.

**[Acessar a loja](https://doce-encanto-simples.onrender.com)** · **[Código no GitHub](https://github.com/Matheuz-Mattos/doce-encanto)**

## Documentação para leitura

- [Objetivo, histórias de usuário, arquitetura, banco e manual](docs/documentacao.md)
- [Laudo de qualidade](docs/laudo-de-qualidade.md)

## O que eu coloquei no projeto

- Três sabores com fotos diferentes: brigadeiro, morango e baunilha com caramelo.
- Adicionar produtos sem sair do catálogo; contador no menu.
- Página de carrinho com fotos, remoção, quantidades de 1 a 20 e total.
- Carrinho preservado ao atualizar o navegador.
- Nome, e-mail, telefone/WhatsApp e endereço obrigatórios.
- Pix, cartão ou dinheiro, com pagamento na entrega.
- Validação no servidor, cálculo com os preços do banco e registro transacional.
- Confirmação, consulta por link privado e Meus pedidos neste navegador.
- Etapas Em preparação, Em rota de entrega e Entregue; primeira etapa permanece ativa.
- Interface responsiva para computador e celular.

## Tecnologias

Eu usei HTML, CSS e JavaScript no front-end e Node.js com Express no back-end. Para salvar os dados, usei PostgreSQL. Organizei o código no VS Code, mantive as versões no GitHub e publiquei a aplicação no Render.

## Como rodar no computador

Deixei abaixo os passos para quem quiser abrir e executar o projeto:

1. Instale Node.js 22 ou superior e disponibilize um banco PostgreSQL.
2. Clone o repositório e abra a pasta no VS Code.
3. Execute `npm ci` no terminal integrado.
4. Copie `.env.example` para `.env` e configure `DATABASE_URL`.
5. Execute `npm start` e abra `http://localhost:3000`.

Configurei o servidor para criar ou atualizar as tabelas e carregar o catálogo inicial. Usei `PORT` para definir a porta e `.env` para guardar a conexão do banco fora do GitHub.

## Entendendo os arquivos

| Arquivo | Função |
| --- | --- |
| servidor.js | Rotas, cálculo do pedido, transação e consulta |
| banco.js | Conexão PostgreSQL, tabelas e carga inicial |
| dados.js | Catálogo inicial e preços em centavos |
| validacao.js | Validação dos dados recebidos |
| public/index.html | Página inicial e catálogo |
| public/carrinho.html | Carrinho, entrega, pagamento e confirmação |
| public/catalogo.js | Interações e comunicação com o servidor |
| public/historico.js | Links privados salvos neste navegador |
| public/pedidos.html e pedidos.js | Histórico e acompanhamento |
| public/estilo.css | Aparência e adaptação ao celular |
| test/validacao.test.js | Testes automatizados |

## Testes e resultados

Organizei sete testes de validação, que passaram na verificação de 29/10/2026, horário de Brasília. Eles cobrem contatos obrigatórios e válidos, normalização, dados do cliente, carrinho vazio, quantidades e itens repetidos. Para rodar, basta executar `npm test`.

No site publicado, conferi as páginas e testei o fluxo final de compra. Também foram feitas verificações dos produtos ativos, registro e consulta de pedidos, cálculo no servidor e respostas de erro. Um pedido anterior continuou salvo no banco. Não fiz um teste controlado depois de reiniciar o serviço manualmente.

Separei as mudanças e verificações internas em cinco registros, de QA-01 a QA-05. Esses registros são diferentes dos sete testes automatizados.

## Publicação

Para publicar, conectei o repositório ao Render e usei um Blueprint com o arquivo `render.yaml`. Nele, deixei o serviço Node.js e o PostgreSQL no plano Free, a instalação com `npm ci` e a execução com `npm start`. A conexão fica em `DATABASE_URL`. Com a integração automática habilitada, quando envio um commit para main, o Render inicia a atualização.


