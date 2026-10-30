# Doce Encanto

Loja de cupcakes com catálogo, carrinho, pedidos e acompanhamento. Autor: **Matheus da Silva Mattos — RGM 36338770**, Projeto Integrador Transdisciplinar em Engenharia de Software II.

**[Acessar a loja](https://doce-encanto-simples.onrender.com)** · **[Código no GitHub](https://github.com/Matheuz-Mattos/doce-encanto)**

## Documentação para leitura

- [Objetivo, histórias de usuário, arquitetura, banco e manual](docs/documentacao.md)
- [Laudo de qualidade](docs/laudo-de-qualidade.md)

## Funcionalidades implementadas

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

Front-end: HTML, CSS e JavaScript. Back-end: JavaScript com Node.js e Express. Banco: PostgreSQL. Editor: VS Code. Versionamento: Git/GitHub. Hospedagem: Render.

## Executar localmente

1. Instale Node.js 22 ou superior e disponibilize um banco PostgreSQL.
2. Clone o repositório e abra a pasta no VS Code.
3. Execute `npm ci` no terminal integrado.
4. Copie `.env.example` para `.env` e configure `DATABASE_URL`.
5. Execute `npm start` e abra `http://localhost:3000`.

O servidor cria/atualiza as tabelas e carrega o catálogo inicial. `PORT` altera a porta. O arquivo `.env` guarda dados privados e não deve ser enviado ao GitHub.

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

Execute `npm test`. A suíte possui sete testes de validação, aprovados na verificação de 29/10/2026, horário de Brasília: contatos obrigatórios/válidos, normalização, dados do cliente, carrinho vazio, quantidades e itens repetidos.

O site público foi verificado quanto às páginas, produtos ativos, registro/consulta de pedido, cálculo de preço no servidor e respostas de erro. Um pedido anterior continuou disponível no banco. O aluno informou ter testado o fluxo final com sucesso. Não foi realizada uma verificação controlada após reinício manual.

Os cinco registros consolidam as verificações internas e as correções do projeto. São separados dos sete testes automatizados e identificados por QA-01 a QA-05.

## Publicação

No Render, conecte este repositório e crie um Blueprint com `render.yaml`. Ele configura serviço Node.js e PostgreSQL Free, instala com `npm ci` e executa `npm start`. A conexão é fornecida por `DATABASE_URL`. Confira os planos antes de confirmar. Com a integração automática habilitada, novos pushes para main iniciam a atualização.


## Limites desta versão

Não há login, painel administrativo, cobrança on-line ou envio automático de e-mail/WhatsApp. O status permanece Em preparação. O catálogo visual está no JavaScript; os preços usados para registrar pedidos vêm do banco.

O histórico local pode ser perdido ao limpar os dados do navegador, mas os pedidos permanecem no banco e podem ser consultados pelo link privado. Quem tem esse link pode ler os dados do pedido. Evite inserir informações pessoais sensíveis durante testes.
