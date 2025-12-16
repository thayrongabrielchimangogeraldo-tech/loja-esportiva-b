const lista = document.getElementById('lista');
const totalP = document.getElementById('total');

const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

let total = 0;
lista.innerHTML = '';

carrinho.forEach(p => {
  const li = document.createElement('li');
  li.textContent = `${p.nome} - R$ ${Number(p.preco).toFixed(2)}`;
  lista.appendChild(li);
  total += Number(p.preco);
});

totalP.textContent = `Total: R$ ${total.toFixed(2)}`;

function finalizar() {
  localStorage.removeItem('carrinho');
  alert('Compra finalizada com sucesso!');
}
