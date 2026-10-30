# Cinco registros de testes e correções

Eu organizei aqui as mudanças e verificações internas do projeto, realizadas em 29/10/2026, horário de Brasília. Usei QA-01 a QA-05 para identificar os cenários. As datas do cronograma são referências de organização, separadas da data de verificação.

## 1. Catálogo

**Identificação:** QA-01 — Catálogo

**Cronograma de referência:** 29/09/2026

**Data:** 29/10/2026

**O que testei e funcionou:** Consegui visualizar os cupcakes, fotos, descrições e preços e adicionar produtos ao carrinho.

**O que precisei corrigir:** Quando adicionava um produto, o site já abria o fechamento. Também tinha foto repetida. Ajustei para continuar no catálogo e deixei três sabores com fotos diferentes.

**Funcionalidade não testada:** Cadastro e login, fora desta versão.

## 2. Carrinho

**Identificação:** QA-02 — Carrinho

**Cronograma de referência:** 09/10/2026

**Data:** 29/10/2026

**O que testei e funcionou:** Adicionei produtos, alterei quantidades e removi itens. O total foi atualizado e a seleção continuou salva depois de atualizar a página.

**O que precisei corrigir:** O carrinho ficava junto ao catálogo e não tinha fotos dos itens. Criei uma página própria e coloquei miniaturas, contador e resumo da compra.

**Funcionalidade não testada:** Cupons e descontos, não implementados.

## 3. Entrega e pagamento

**Identificação:** QA-03 — Entrega e pagamento

**Cronograma de referência:** 13/10/2026

**Data:** 29/10/2026

**O que testei e funcionou:** Preenchi nome e endereço e conferi as opções Pix, cartão e dinheiro, todas para pagamento na entrega.

**O que precisei corrigir:** Faltavam e-mail e telefone. Acrescentei os contatos obrigatórios com validação e organizei as opções de pagamento em cartões selecionáveis.

**Funcionalidade não testada:** Cobrança on-line, não implementada.

## 4. Confirmação e acompanhamento

**Identificação:** QA-04 — Confirmação e acompanhamento

**Cronograma de referência:** 23/10/2026

**Data:** 29/10/2026

**O que testei e funcionou:** Consegui registrar e consultar o pedido pelo link privado. Também foi verificado o cálculo do total pelo servidor.

**O que precisei corrigir:** Faltava o histórico e o status aparecia como Recebido. Criei Meus pedidos e coloquei as etapas Em preparação, Em rota de entrega e Entregue, deixando só a primeira ativa.

**Funcionalidade não testada:** Notificações automáticas e avanço real do status, não implementados.

## 5. Navegação e apresentação

**Identificação:** QA-05 — Navegação e apresentação

**Cronograma de referência:** 28/10/2026

**Data:** 29/10/2026

**O que testei e funcionou:** Naveguei entre catálogo, carrinho e pedidos e conferi o acesso pelo link público e a adaptação ao celular.

**O que precisei corrigir:** Meus pedidos aparecia abaixo do menu e tinha muito texto na página. Coloquei o acesso no menu, reorganizei o rodapé e usei ícones e textos mais curtos.

**Funcionalidade não testada:** Compatibilidade com todos os modelos de celular e navegadores.

## Laudo de qualidade

Agrupei as melhorias em cinco partes: catálogo, carrinho, entrega/pagamento, acompanhamento e navegação. Mantive as correções no histórico Git, incluindo os commits 97d7461 (carrinho próprio), c7d8557 (menu e rodapé), 8ed6e9c (contatos), 1953284 (histórico), aa20cb3 (status) e 34ef6ca (três sabores).

No site publicado, conferi os três produtos e completei o fluxo final de compra. Também foram feitas verificações de registro e consulta, cálculo pelo servidor, dados inválidos, pedido inexistente, persistência do carrinho e responsividade. Um pedido anterior continuou salvo no PostgreSQL.

Organizei **sete testes automatizados de validação**, que passaram, separados dos cinco cenários acima. Não fiz uma verificação controlada depois de reiniciar o serviço manualmente. Deixei as capturas da versão final no [laudo de qualidade](laudo-de-qualidade.md).
