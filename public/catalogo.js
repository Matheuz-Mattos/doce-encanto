// Dados temporários: na etapa do back-end, virão do banco pela API.
const produtos = [
  { id: 1, nome: 'Brigadeiro intenso', descricao: 'Massa de chocolate, brigadeiro cremoso e granulado.', preco: 12.50, imagem: 'brigadeiro.png' },
  { id: 2, nome: 'Morango delicado', descricao: 'Massa de baunilha e cobertura cremosa de morango.', preco: 11.90, imagem: 'morango.png' },
  { id: 3, nome: 'Baunilha com caramelo', descricao: 'Baunilha macia, caramelo e um toque crocante.', preco: 12.90, imagem: 'caramelo.png' },
  { id: 4, nome: 'Chocolate clássico', descricao: 'Massa e cobertura de chocolate para quem ama cacau.', preco: 10.90, imagem: 'brigadeiro.png' },
  { id: 5, nome: 'Morango com chocolate', descricao: 'Uma combinação de chocolate com creme de morango.', preco: 13.50, imagem: 'morango.png' },
  { id: 6, nome: 'Doce de leite', descricao: 'Massa de baunilha com cobertura de doce de leite.', preco: 12.00, imagem: 'caramelo.png' }
];

// Intl.NumberFormat mostra os valores no padrão brasileiro: R$ 12,50.
const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const lista = document.querySelector('#lista-produtos');

// Cada objeto do catálogo se transforma em um cartão na página.
for (const produto of produtos) {
  const cartao = document.createElement('article');
  cartao.className = 'produto';

  const imagem = document.createElement('img');
  imagem.src = `imagens/${produto.imagem}`;
  imagem.alt = `Imagem ilustrativa do cupcake ${produto.nome.toLowerCase()}`;
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
  adicionar.textContent = 'Adicionar ao carrinho';
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

function avisar(texto) { document.querySelector('#mensagem').textContent = texto; }

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
    linha.append(nome, rotulo, valor, remover);
    listaCarrinho.append(linha);
  }
  if (!listaCarrinho.children.length) {
    const vazio = document.createElement('p');
    vazio.textContent = 'Seu carrinho está vazio. Escolha um sabor no cardápio!';
    listaCarrinho.append(vazio);
  }
  document.querySelector('#total-carrinho').textContent = moeda.format(totalCentavos / 100);
}

mostrarCarrinho();
