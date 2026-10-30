// Guardamos apenas os links privados, nunca o endereço ou os contatos do cliente.
window.historicoPedidos = {
  listar() {
    try {
      const dados = JSON.parse(localStorage.getItem('doce-encanto-pedidos') || '[]');
      return Array.isArray(dados) ? [...new Set(dados.filter(token => typeof token === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(token)))].slice(0, 100) : [];
    } catch { return []; }
  },
  salvar(token) {
    try {
      localStorage.setItem('doce-encanto-pedidos', JSON.stringify([token, ...this.listar().filter(item => item !== token)].slice(0, 100)));
      return true;
    } catch { return false; }
  }
};
