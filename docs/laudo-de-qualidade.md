# Laudo de qualidade — Doce Encanto

**Responsável pelo projeto:** Matheus da Silva Mattos  
**RGM:** 36338770  
**Data da avaliação interna:** 29/10/2026  
**Aplicação:** https://doce-encanto-simples.onrender.com

## Objetivo

Eu fiz esta avaliação para conferir o fluxo de compra e registrar o que precisei corrigir para deixar o sistema mais fácil de usar.

## Procedimentos

Conferi o catálogo, carrinho, formulário, confirmação e consulta de pedidos. Também verifiquei como a página se adapta ao celular. Foram executados sete testes automatizados de validação, e eu testei o fluxo final de compra com sucesso.

## Problemas encontrados e correções

| Registro | Problema observado | Correção realizada | Resultado |
| --- | --- | --- | --- |
| QA-01 | A inclusão abria o fechamento imediatamente e o catálogo repetia imagens. | Manter o cliente no catálogo e reduzir para três sabores com fotos diferentes. | Seleção de vários sabores sem interrupção; catálogo organizado. |
| QA-02 | Carrinho junto ao catálogo, sem fotos dos itens. | Criar página própria com miniaturas, quantidades, remoção e resumo. | Carrinho mais claro, com total atualizado e persistência no navegador. |
| QA-03 | Ausência de e-mail e telefone e apresentação pouco clara dos pagamentos. | Adicionar validação dos contatos e opções Pix, cartão e dinheiro na entrega. | Dados obrigatórios validados e pagamento selecionável. |
| QA-04 | Ausência de histórico e apresentação insuficiente do andamento. | Criar Meus pedidos, links privados e etapas visuais com Em preparação ativa. | Cliente consegue localizar e consultar suas compras neste navegador. |
| QA-05 | Atalho de pedidos fora do menu e excesso de textos na interface. | Integrar o acesso ao menu, reorganizar rodapé e reduzir textos. | Navegação mais direta e melhor organização visual. |

## Resultados técnicos

Na versão publicada, consegui abrir o catálogo, o carrinho e os pedidos. O banco retornou os três produtos e manteve um pedido anterior salvo. Também foram conferidos o registro de pedidos, a consulta pelo link privado, o cálculo do total no servidor e as mensagens para dados inválidos ou pedido inexistente. Os sete testes automatizados passaram sem falhas.

## Limites verificados

Deixei o status em Em preparação, como defini para esta versão. Salvei e-mail e WhatsApp, mas não implementei mensagens automáticas. O histórico fica neste navegador e o link privado permite consultar em outro aparelho. Não fiz uma verificação controlada após reiniciar o serviço manualmente, nem testei todos os navegadores existentes.

## Conclusão

Com os ajustes, deixei a escolha dos produtos, o fechamento da compra e a consulta de pedidos mais organizados. Consegui colocar no ar o fluxo que planejei: catálogo, carrinho, pagamento na entrega e pedidos salvos no banco. Registrei aqui o que foi verificado e o que ainda não faz parte desta versão.

## Evidências da versão final

Separei abaixo as capturas do site publicado, feitas em 29/10/2026 (Brasília), usando dados de teste. Elas mostram como ficou a versão final depois das correções.

### Catálogo, menu e rodapé

![Catálogo com três sabores, menu e rodapé](imagens/01-catalogo.png)

### Carrinho com fotos e resumo

![Carrinho com miniatura, quantidade e valor total](imagens/02-carrinho.png)

### Contatos, endereço e pagamento

![Formulário de entrega e pagamento preenchido com dados de teste](imagens/03-entrega.png)

### Confirmação e etapas de acompanhamento

![Pedido confirmado com etapa Em preparação ativa](imagens/04-confirmacao.png)

### Histórico de pedidos

![Página Meus pedidos com acesso ao acompanhamento](imagens/05-historico.png)

