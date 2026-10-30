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

  cartao.append(imagem, nome, descricao, preco);
  lista.append(cartao);
}
