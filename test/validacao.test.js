const { test } = require('node:test');
const assert = require('node:assert/strict');
const { validarPedido } = require('../validacao');
const valido = () => ({ nome: 'Matheus', endereco: 'Rua de teste, 123, Centro', pagamento: 'pix', itens: [{ id: 1, quantidade: 2 }] });
test('aceita dados válidos e retira espaços do nome', () => { const d = valido(); d.nome = ' Matheus '; assert.equal(validarPedido(d).nome, 'Matheus'); });
test('rejeita pedido vazio', () => assert.throws(() => validarPedido({ ...valido(), itens: [] })));
test('rejeita quantidades inválidas', () => { for (const quantidade of [0,21,1.5,'2']) assert.throws(() => validarPedido({ ...valido(), itens: [{ id: 1, quantidade }] })); });
test('rejeita produtos repetidos', () => assert.throws(() => validarPedido({ ...valido(), itens: [{ id: 1, quantidade: 1 },{ id: 1, quantidade: 2 }] })));
test('rejeita dados pessoais e pagamento inválidos', () => { for (const mudanca of [{ nome: '' },{ endereco: '' },{ pagamento: 'real' }]) assert.throws(() => validarPedido({ ...valido(), ...mudanca })); });
