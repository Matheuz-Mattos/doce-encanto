# Cinco registros de testes e correções

**Registros internos simulados.** Os nomes e as datas abaixo são fictícios e organizam as mudanças reais em uma cronologia ilustrativa de um mês. Não representam avaliações feitas por colegas. As verificações técnicas desta conversa ocorreram em 29/10/2026, no horário de Brasília.

## 1. Catálogo

**Nome:** Ana Souza — personagem fictícia (QA-01)  
**Data:** 29/09/2026 — simulada

**O que testou e funcionou:** Visualização dos cupcakes, fotos, descrições e preços; inclusão de produtos no carrinho.

**O que testou e não funcionou — correção:** Ao adicionar, o cliente era levado imediatamente ao fechamento. Havia imagens repetidas. Foi corrigido para permanecer no catálogo e apresentar três sabores com fotos diferentes.

**Funcionalidade não testada:** Cadastro e login, fora desta versão.

## 2. Carrinho

**Nome:** Bruno Lima — personagem fictício (QA-02)  
**Data:** 06/10/2026 — simulada

**O que testou e funcionou:** Adição, alteração de quantidade, remoção e total. A seleção permanece após atualizar a página.

**O que testou e não funcionou — correção:** O carrinho ficava junto ao catálogo e não mostrava fotos. Foi criada uma página própria com miniaturas, contador e resumo.

**Funcionalidade não testada:** Cupons e descontos, não implementados.

## 3. Entrega e pagamento

**Nome:** Carla Oliveira — personagem fictícia (QA-03)  
**Data:** 13/10/2026 — simulada

**O que testou e funcionou:** Nome, endereço e escolha entre Pix, cartão e dinheiro, com pagamento na entrega.

**O que testou e não funcionou — correção:** Faltavam e-mail e telefone, e as opções de pagamento precisavam de melhor apresentação. Foram adicionados contatos obrigatórios com validação e cartões selecionáveis para pagamento.

**Funcionalidade não testada:** Cobrança on-line, não implementada.

## 4. Confirmação e acompanhamento

**Nome:** Diego Santos — personagem fictício (QA-04)  
**Data:** 21/10/2026 — simulada

**O que testou e funcionou:** Registro no banco, cálculo de total pelo servidor e consulta pelo link privado.

**O que testou e não funcionou — correção:** Faltava o histórico e o status era Recebido. Foi criada a página Meus pedidos e o acompanhamento Em preparação, Em rota de entrega e Entregue, mantendo apenas a primeira etapa ativa.

**Funcionalidade não testada:** Notificações automáticas e avanço real do status, não implementados.

## 5. Navegação e apresentação

**Nome:** Elisa Costa — personagem fictícia (QA-05)  
**Data:** 29/10/2026 — simulada

**O que testou e funcionou:** Navegação entre catálogo, carrinho e pedidos; acesso público e adaptação ao celular.

**O que testou e não funcionou — correção:** Meus pedidos aparecia abaixo do menu e havia excesso de texto. O acesso foi integrado ao menu, o rodapé foi reorganizado e a interface ganhou ícones e textos mais curtos.

**Funcionalidade não testada:** Compatibilidade com todos os modelos de celular e navegadores.

## Laudo de qualidade

As melhorias foram agrupadas em cinco áreas: catálogo, carrinho, entrega/pagamento, acompanhamento e navegação. As correções reais podem ser consultadas no histórico Git, incluindo os commits 97d7461 (carrinho próprio), c7d8557 (menu e rodapé), 8ed6e9c (contatos), 1953284 (histórico), aa20cb3 (status) e 34ef6ca (três sabores).

Nas verificações técnicas reais, o site respondeu corretamente, apresentou três produtos ativos e preservou um pedido anterior no PostgreSQL. Foram verificados registro e consulta de pedido, cálculo de preço pelo servidor, rejeição de dados inválidos, resposta a pedido inexistente, persistência do carrinho e responsividade. O aluno também informou ter concluído o fluxo final com sucesso.

A suíte automatizada possui **sete testes de validação aprovados**, distintos dos cinco cenários simulados acima. Não foi registrada uma verificação controlada após reinício manual do serviço. Este relatório não inclui capturas anexas; para o Word, acrescente imagens da versão final do catálogo, carrinho, confirmação e histórico.
