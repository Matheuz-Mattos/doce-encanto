// Validação independente do navegador: o servidor nunca confia no preço recebido.
function validarPedido(dados) {
  if (!dados || typeof dados !== 'object') throw new Error('Dados do pedido inválidos.');
  const { nome, endereco, pagamento, itens } = dados;
  if (typeof nome !== 'string' || nome.trim().length < 3 || nome.length > 100) throw new Error('Informe seu nome com 3 a 100 caracteres.');
  if (typeof endereco !== 'string' || endereco.trim().length < 10 || endereco.length > 400) throw new Error('Informe o endereço completo com 10 a 400 caracteres.');
  if (!['pix', 'cartao', 'dinheiro'].includes(pagamento)) throw new Error('Escolha uma forma de pagamento válida.');
  if (!Array.isArray(itens) || itens.length < 1 || itens.length > 6) throw new Error('Escolha de 1 a 6 sabores.');
  const ids = new Set();
  for (const item of itens) {
    if (!item || !Number.isInteger(item.id) || ids.has(item.id)) throw new Error('Produto inválido ou repetido.');
    if (!Number.isInteger(item.quantidade) || item.quantidade < 1 || item.quantidade > 20) throw new Error('A quantidade deve ser de 1 a 20.');
    ids.add(item.id);
  }
  return { nome: nome.trim(), endereco: endereco.trim(), pagamento, itens };
}
module.exports = { validarPedido };
