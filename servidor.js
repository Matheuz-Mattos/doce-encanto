require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('node:path');
const { randomUUID } = require('node:crypto');
const { banco, prepararBanco } = require('./banco');
const { validarPedido } = require('./validacao');
const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.use((req, res, next) => { res.set('Referrer-Policy', 'no-referrer'); next(); });
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/produtos', async (req, res, next) => {
  try { res.json((await banco.query('SELECT * FROM produtos WHERE ativo = TRUE ORDER BY id')).rows); }
  catch (erro) { next(erro); }
});

app.post('/api/pedidos', async (req, res, next) => {
  let dados;
  try { dados = validarPedido(req.body); }
  catch (erro) { return res.status(400).json({ erro: erro.message }); }
  let conexao;
  try {
    conexao = await banco.connect();
    // A transação garante que pedido e itens sejam salvos juntos.
    await conexao.query('BEGIN');
    const ids = dados.itens.map(item => item.id);
    const produtos = (await conexao.query('SELECT * FROM produtos WHERE id = ANY($1::int[]) AND ativo = TRUE FOR SHARE', [ids])).rows;
    if (produtos.length !== ids.length) {
      await conexao.query('ROLLBACK');
      return res.status(400).json({ erro: 'Um produto não está disponível. Atualize o catálogo.' });
    }
    const itens = dados.itens.map(item => ({ ...produtos.find(p => p.id === item.id), quantidade: item.quantidade }));
    const total = itens.reduce((soma, item) => soma + item.preco_centavos * item.quantidade, 0);
    const token = randomUUID();
    const pedido = (await conexao.query('INSERT INTO pedidos (token,nome,endereco,pagamento,total_centavos) VALUES ($1,$2,$3,$4,$5) RETURNING id', [token,dados.nome,dados.endereco,dados.pagamento,total])).rows[0];
    for (const item of itens) {
      await conexao.query('INSERT INTO itens_pedido (pedido_id,produto_id,nome,preco_centavos,quantidade) VALUES ($1,$2,$3,$4,$5)', [pedido.id,item.id,item.nome,item.preco_centavos,item.quantidade]);
    }
    await conexao.query('COMMIT');
    res.status(201).json({ token });
  } catch (erro) {
    if (conexao) await conexao.query('ROLLBACK').catch(() => {});
    next(erro);
  } finally { if (conexao) conexao.release(); }
});

app.get('/api/pedidos/:token', async (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(req.params.token)) return res.status(404).json({ erro: 'Pedido não encontrado.' });
  try {
    const pedido = (await banco.query('SELECT * FROM pedidos WHERE token = $1', [req.params.token])).rows[0];
    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado.' });
    pedido.itens = (await banco.query('SELECT nome,preco_centavos,quantidade FROM itens_pedido WHERE pedido_id = $1 ORDER BY id', [pedido.id])).rows;
    res.json(pedido);
  } catch (erro) { next(erro); }
});

app.use((erro, req, res, next) => {
  console.error('Falha no servidor:', erro.code || erro.name);
  res.status(erro.status === 400 ? 400 : 503).json({ erro: erro.status === 400 ? 'Dados inválidos.' : 'Serviço indisponível. Tente novamente em instantes.' });
});

async function iniciar() {
  if (!process.env.DATABASE_URL) throw new Error('Configure DATABASE_URL no arquivo .env para conectar o PostgreSQL.');
  await prepararBanco();
  app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log('Doce Encanto iniciado. Porta:', process.env.PORT || 3000));
}
if (require.main === module) iniciar().catch(erro => { console.error(erro.message); process.exitCode = 1; });
module.exports = app;
