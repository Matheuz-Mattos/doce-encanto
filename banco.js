require('dotenv').config({ quiet: true });
const { Pool } = require('pg');
const produtos = require('./dados');
const banco = new Pool({ connectionString: process.env.DATABASE_URL });

async function prepararBanco() {
  await banco.query(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY, nome TEXT NOT NULL, descricao TEXT NOT NULL,
      preco_centavos INTEGER NOT NULL CHECK (preco_centavos > 0), imagem TEXT NOT NULL, ativo BOOLEAN NOT NULL DEFAULT TRUE
    );
    CREATE TABLE IF NOT EXISTS pedidos (
      id SERIAL PRIMARY KEY, token UUID UNIQUE NOT NULL, nome TEXT NOT NULL,
      endereco TEXT NOT NULL, pagamento TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'Recebido',
      total_centavos INTEGER NOT NULL, criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
    CREATE TABLE IF NOT EXISTS itens_pedido (
      id SERIAL PRIMARY KEY, pedido_id INTEGER NOT NULL REFERENCES pedidos(id),
      produto_id INTEGER NOT NULL REFERENCES produtos(id), nome TEXT NOT NULL,
      preco_centavos INTEGER NOT NULL, quantidade INTEGER NOT NULL CHECK (quantidade BETWEEN 1 AND 20)
    );
    ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS email TEXT;
    ALTER TABLE pedidos ADD COLUMN IF NOT EXISTS telefone TEXT;
    ALTER TABLE pedidos ALTER COLUMN status SET DEFAULT 'Em preparação';
    UPDATE pedidos SET status = 'Em preparação' WHERE status = 'Recebido';
    UPDATE produtos SET ativo = FALSE WHERE id IN (4, 5, 6);
  `);
  for (const p of produtos) {
    await banco.query('INSERT INTO produtos (id,nome,descricao,preco_centavos,imagem) VALUES ($1,$2,$3,$4,$5) ON CONFLICT (id) DO NOTHING', [p.id,p.nome,p.descricao,p.preco_centavos,p.imagem]);
  }
}
module.exports = { banco, prepararBanco };
