// Os dados atuais de cada pedido vêm do servidor; o navegador guarda só o token.
const script = document.createElement('script');
script.src = 'historico.js';
script.onload = carregarPedidos;
document.head.append(script);

async function carregarPedidos() {
  const lista = document.querySelector('#lista-pedidos');
  const tokens = window.historicoPedidos.listar();
  if (!tokens.length) {
    lista.innerHTML = '<section class="painel vazio-historico"><span aria-hidden="true">🧁</span><h2>Seu próximo doce momento começa aqui.</h2><p>Você ainda não tem pedidos salvos neste navegador.</p><a class="botao" href="index.html#cardapio">Escolher cupcakes</a></section>';
    return;
  }
  lista.textContent = 'Consultando seus pedidos...';
  const cartoes = await Promise.all(tokens.map(async token => {
    const cartao = document.createElement('article'); cartao.className = 'painel pedido-historico';
    try {
      const resposta = await fetch(`/api/pedidos/${encodeURIComponent(token)}`);
      const pedido = await resposta.json();
      if (!resposta.ok) throw new Error(pedido.erro || 'Não foi possível consultar este pedido.');
      const data = new Date(pedido.criado_em).toLocaleString('pt-BR');
      const titulo = document.createElement('h2'); titulo.textContent = `Pedido #${pedido.id}`;
      const status = document.createElement('span'); status.className = 'status-pedido'; status.textContent = pedido.status;
      const detalhes = document.createElement('p'); detalhes.textContent = `${data} · ${pedido.itens.reduce((soma, item) => soma + item.quantidade, 0)} cupcake(s)`;
      const sabores = document.createElement('p'); sabores.textContent = pedido.itens.map(item => `${item.quantidade} × ${item.nome}`).join(' · ');
      const total = document.createElement('strong'); total.textContent = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(pedido.total_centavos / 100);
      cartao.append(titulo, status, detalhes, sabores, total);
    } catch (erro) { const aviso = document.createElement('p'); aviso.textContent = erro.message; cartao.append(aviso); }
    const link = document.createElement('a'); link.href = `carrinho.html#pedido=${token}`; link.className = 'botao'; link.textContent = 'Acompanhar pedido'; cartao.append(link);
    return cartao;
  }));
  lista.replaceChildren(...cartoes);
}
