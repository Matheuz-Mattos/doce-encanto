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

- Catálogo com seis cupcakes.
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
| 2 | Construir catálogo responsivo | A fazer |
| 3 | Implementar carrinho | A fazer |
| 4 | Implementar servidor, banco e pedidos | A fazer |
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

Esta é a preparação inicial. A aplicação e seus comandos de execução serão adicionados nas próximas etapas. Ainda não existe URL pública funcional.

## Hospedagem gratuita

O Render gratuito pode suspender o serviço após inatividade e demorar aproximadamente um minuto para reabrir. O PostgreSQL gratuito expira em 30 dias; a publicação deverá considerar o período de avaliação.
