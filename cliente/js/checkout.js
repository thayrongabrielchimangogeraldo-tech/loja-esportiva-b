const lista = document.getElementById('lista');
const totalEl = document.getElementById('total');
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];


let total = 0;
carrinho.forEach(p => {
total += p.preco;
lista.innerHTML += `<li>${p.nome} - R$ ${p.preco}</li>`;
});


totalEl.innerText = `Total: R$ ${total.toFixed(2)}`;


function finalizar() {
alert('Compra finalizada com sucesso!');
localStorage.removeItem('carrinho');
window.location.href = 'index.html';
}