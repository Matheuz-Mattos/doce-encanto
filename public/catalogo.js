// Dados temporários: na etapa do back-end, virão do banco pela API.
const produtos = [
  { id: 1, nome: 'Brigadeiro intenso', descricao: 'Massa de chocolate, brigadeiro cremoso e granulado.', preco: 12.50, imagem: 'brigadeiro.png' },
  { id: 2, nome: 'Morango delicado', descricao: 'Massa de baunilha e cobertura cremosa de morango.', preco: 11.90, imagem: 'morango.png' },
  { id: 3, nome: 'Baunilha com caramelo', descricao: 'Baunilha macia, caramelo e um toque crocante.', preco: 12.90, imagem: 'caramelo.png' }
];

// Intl.NumberFormat mostra os valores no padrão brasileiro: R$ 12,50.
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const lista = document.querySelector('#lista-produtos');

// Cada objeto do catálogo se transforma em um cartão na página.
for (const produto of lista ? produtos : []) {
  const cartao = document.createElement('article');
  cartao.className = 'produto';

  const imagem = document.createElement('img');
  imagem.src = `imagens/${produto.imagem}`;
  imagem.alt = `Cupcake ${produto.nome.toLowerCase()}`;
  imagem.loading = 'lazy';
  imagem.width = 400;
  imagem.height = 350;

  const nome = document.createElement('h3');
  nome.textContent = produto.nome;
  const descricao = document.createElement('p');
  descricao.textContent = produto.descricao;
  const preco = document.createElement('strong');
  preco.className = 'preco';
  preco.textContent = moeda.format(produto.preco);

  const adicionar = document.createElement('button');
  adicionar.type = 'button';
  adicionar.className = 'botao adicionar';
  adicionar.textContent = '＋ Adicionar';
  adicionar.addEventListener('click', () => adicionarProduto(produto.id));
  cartao.append(imagem, nome, descricao, preco, adicionar);
  lista.append(cartao);
}

// O navegador guarda somente IDs e quantidades. Os dados salvos são validados ao carregar.
let carrinho = carregarCarrinho();
function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem('doce-encanto-carrinho') || '{}');
    const valido = {};
    if (!salvo || typeof salvo !== 'object' || Array.isArray(salvo)) return valido;
    for (const produto of produtos) {
      const quantidade = salvo[produto.id];
      if (Number.isInteger(quantidade) && quantidade >= 1 && quantidade <= 20) valido[produto.id] = quantidade;
    }
    return valido;
  } catch { return {}; }
}

let tempoMensagem;
function avisar(texto) {
  const mensagem = document.querySelector('#mensagem');
  mensagem.textContent = texto;
  clearTimeout(tempoMensagem);
  tempoMensagem = setTimeout(() => { mensagem.textContent = ''; }, 4000);
}

function salvarCarrinho() {
  try { localStorage.setItem('doce-encanto-carrinho', JSON.stringify(carrinho)); }
  catch { avisar('Seu navegador não permitiu salvar o carrinho. A seleção será mantida apenas nesta página.'); }
  mostrarCarrinho();
}

function adicionarProduto(id) {
  const atual = carrinho[id] || 0;
  if (atual >= 20) { avisar('O limite é de 20 unidades por sabor.'); return; }
  carrinho[id] = atual + 1;
  avisar(`${produtos.find(produto => produto.id === id).nome} adicionado ao carrinho.`);
  salvarCarrinho();
}

function mostrarCarrinho() {
  const listaCarrinho = document.querySelector('#itens-carrinho');
  document.querySelectorAll('.contador').forEach(contador => { contador.textContent = Object.values(carrinho).reduce((soma, quantidade) => soma + quantidade, 0); });
  if (!listaCarrinho) return;
  listaCarrinho.replaceChildren();
  let totalCentavos = 0;

  for (const produto of produtos) {
    const quantidade = carrinho[produto.id];
    if (!quantidade) continue;
    // Trabalhamos com centavos inteiros para evitar erros de arredondamento.
    const subtotal = Math.round(produto.preco * 100) * quantidade;
    totalCentavos += subtotal;
    const linha = document.createElement('div');
    linha.className = 'item-carrinho';
    const nome = document.createElement('strong');
    nome.textContent = produto.nome;

    const rotulo = document.createElement('label');
    rotulo.textContent = 'Quantidade ';
    const campo = document.createElement('input');
    campo.type = 'number'; campo.min = '1'; campo.max = '20'; campo.step = '1';
    campo.value = quantidade;
    campo.setAttribute('aria-label', `Quantidade de ${produto.nome}`);
    campo.addEventListener('change', () => {
      const novaQuantidade = Number(campo.value);
      if (!Number.isInteger(novaQuantidade) || novaQuantidade < 1 || novaQuantidade > 20) {
        campo.value = carrinho[produto.id];
        avisar('Informe uma quantidade inteira de 1 a 20.'); return;
      }
      carrinho[produto.id] = novaQuantidade;
      avisar('Quantidade atualizada.'); salvarCarrinho();
    });
    rotulo.append(campo);
    const valor = document.createElement('span');
    valor.textContent = moeda.format(subtotal / 100);
    const remover = document.createElement('button');
    remover.type = 'button'; remover.className = 'remover'; remover.textContent = 'Remover';
    remover.setAttribute('aria-label', `Remover ${produto.nome}`);
    remover.addEventListener('click', () => {
      delete carrinho[produto.id]; avisar('Produto removido.'); salvarCarrinho();
    });
    const foto = document.createElement('img');
    foto.src = `imagens/${produto.imagem}`; foto.alt = produto.nome;
    foto.className = 'miniatura'; foto.width = 76; foto.height = 76;
    linha.append(foto, nome, rotulo, valor, remover);
    listaCarrinho.append(linha);
  }
  if (!listaCarrinho.children.length) {
    const vazio = document.createElement('p');
    vazio.textContent = 'Seu carrinho está vazio. Escolha um sabor no cardápio!';
    listaCarrinho.append(vazio);
  }
  document.querySelector('#total-carrinho').textContent = moeda.format(totalCentavos / 100);
  const confirmar = document.querySelector('.confirmar');
  if (confirmar) confirmar.disabled = !Object.keys(carrinho).length;
}

mostrarCarrinho();

// Enviamos somente os IDs e as quantidades. O servidor determina o preço final.
document.querySelector('#formulario-pedido')?.addEventListener('submit', async evento => {
  evento.preventDefault();
  const formulario = evento.currentTarget;
  const retorno = document.querySelector('#retorno-pedido');
  if (!Object.keys(carrinho).length) { retorno.textContent = 'Adicione um cupcake ao carrinho.'; return; }
  const campos = new FormData(formulario);
  const botao = formulario.querySelector('button');
  botao.disabled = true; retorno.textContent = 'Salvando seu pedido...';
  try {
    const resposta = await fetch('/api/pedidos', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: campos.get('nome'), email: campos.get('email'), telefone: campos.get('telefone'), endereco: campos.get('endereco'), pagamento: campos.get('pagamento'), itens: Object.entries(carrinho).map(([id, quantidade]) => ({ id: Number(id), quantidade })) })
    });
    const dados = await resposta.json();
    if (!resposta.ok) throw new Error(dados.erro || 'Não foi possível salvar o pedido.');
    window.historicoPedidos.salvar(dados.token);
    carrinho = {}; salvarCarrinho(); formulario.reset();
    retorno.textContent = 'Pedido salvo! Guarde o link abaixo para consultar.';
    location.hash = `pedido=${dados.token}`;
  } catch (erro) { retorno.textContent = erro instanceof SyntaxError ? 'O servidor de pedidos ainda não está conectado.' : erro.message; }
  finally { botao.disabled = !Object.keys(carrinho).length; }
});

async function consultarPedido() {
  if (!location.hash.startsWith('#pedido=')) return;
  const token = location.hash.slice(8);
  const area = document.querySelector('#consulta-pedido');
  if (!area) { location.replace(`carrinho.html${location.hash}`); return; }
  area.hidden = false; area.textContent = 'Consultando pedido...';
  try {
    const resposta = await fetch(`/api/pedidos/${encodeURIComponent(token)}`);
    const pedido = await resposta.json();
    if (!resposta.ok) throw new Error(pedido.erro);
    window.historicoPedidos.salvar(token);
    area.replaceChildren();
    document.querySelector('#compra').hidden = true;
    const selo = document.createElement('div'); selo.className = 'sucesso'; selo.textContent = '✓'; area.append(selo);
    const titulo = document.createElement('h2'); titulo.textContent = 'Seu pedido chegou à nossa cozinha!'; area.append(titulo);
    const mensagem = document.createElement('p'); mensagem.textContent = 'Estamos preparando seus cupcakes com carinho.'; area.append(mensagem);
    const etapas = document.createElement('ol'); etapas.className = 'linha-status';
    for (const [indice, texto] of ['🧁 Em preparação', '🛵 Em rota de entrega', '✓ Entregue'].entries()) {
      const etapa = document.createElement('li'); etapa.textContent = texto;
      if (indice === 0) { etapa.className = 'ativa'; etapa.setAttribute('aria-current', 'step'); }
      etapas.append(etapa);
    }
    area.append(etapas);
    const status = document.createElement('p'); status.textContent = `Status: ${pedido.status} · Pagamento na entrega`; area.append(status);
    const contato = document.createElement('p'); contato.className = 'lembrete-contato'; contato.textContent = '✉ Fique de olho no e-mail e no WhatsApp informados para acompanhar possíveis atualizações sobre a saída para entrega.'; area.append(contato);
    if (pedido.email && pedido.telefone) {
      const dadosContato = document.createElement('p'); dadosContato.textContent = `${pedido.email} · ${pedido.telefone}`; area.append(dadosContato);
    }
    for (const texto of [`Cliente: ${pedido.nome}`, `📍 ${pedido.endereco}`, ...pedido.itens.map(item => `${item.quantidade} × ${item.nome}: ${moeda.format(item.quantidade * item.preco_centavos / 100)}`), `Total: ${moeda.format(pedido.total_centavos / 100)}`]) {
      const p = document.createElement('p'); p.textContent = texto; area.append(p);
    }
    const link = document.createElement('a'); link.href = location.href; link.textContent = 'Link privado deste pedido (copie e guarde)'; area.append(link);
    const aviso = document.createElement('p'); aviso.textContent = 'Quem tiver este link poderá consultar os dados do pedido.'; area.append(aviso);
    const voltar = document.createElement('a'); voltar.className = 'botao'; voltar.href = 'index.html'; voltar.textContent = 'Voltar ao cardápio'; area.append(voltar);
    const historico = document.createElement('a'); historico.className = 'botao'; historico.href = 'pedidos.html'; historico.textContent = 'Meus pedidos'; area.append(historico);
  } catch (erro) { area.textContent = erro.message; }
  area.scrollIntoView({ block: 'start' });
  area.focus();
}
window.addEventListener('hashchange', consultarPedido);
consultarPedido();
