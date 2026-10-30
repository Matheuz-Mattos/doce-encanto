const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validarPedido } = require('../validacao');
const valido = () => ({ nome: 'Matheus', email: 'teste@example.com', telefone: '(11) 99999-9999', endereco: 'Rua de teste, 123, Centro', pagamento: 'pix', itens: [{ id: 1, quantidade: 2 }] });
test('exige e-mail e telefone válidos', () => {
  for (const mudanca of [{ email: '' }, { email: 'invalido' }, { telefone: '' }, { telefone: '123' }, { telefone: 'abcdefghijk' }]) assert.throws(() => validarPedido({ ...valido(), ...mudanca }));
});
test('normaliza os contatos e aceita número internacional brasileiro', () => {
  const d = validarPedido({ ...valido(), email: ' TESTE@EXAMPLE.COM ', telefone: '+55 (11) 99999-9999' });
  assert.equal(d.email, 'teste@example.com'); assert.equal(d.telefone, '5511999999999');
});
test('aceita dados válidos e retira espaços do nome', () => { const d = valido(); d.nome = ' Matheus '; assert.equal(validarPedido(d).nome, 'Matheus'); });
test('rejeita pedido vazio', () => assert.throws(() => validarPedido({ ...valido(), itens: [] })));
test('rejeita quantidades inválidas', () => { for (const quantidade of [0,21,1.5,'2']) assert.throws(() => validarPedido({ ...valido(), itens: [{ id: 1, quantidade }] })); });
test('rejeita produtos repetidos', () => assert.throws(() => validarPedido({ ...valido(), itens: [{ id: 1, quantidade: 1 },{ id: 1, quantidade: 2 }] })));
test('rejeita dados pessoais e pagamento inválidos', () => { for (const mudanca of [{ nome: '' },{ endereco: '' },{ pagamento: 'real' }]) assert.throws(() => validarPedido({ ...valido(), ...mudanca })); });
