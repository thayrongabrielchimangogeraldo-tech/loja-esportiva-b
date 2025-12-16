const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

const lista = document.getElementById('lista');
const totalEl = document.getElementById('total');

function render() {
  lista.innerHTML = "";
  let total = 0;

  carrinho.forEach((item) => {
    const preco = Number(item.preco) || 0;
    total += preco;

    const li = document.createElement("li");
    li.textContent = `${item.nome} - R$ ${preco.toFixed(2)}`;
    lista.appendChild(li);
  });

  totalEl.textContent = `Total: R$ ${total.toFixed(2)}`;
}

function finalizar() {
  // aqui tu pode salvar no Supabase depois, se teu professor pedir
  localStorage.removeItem("carrinho");
  alert("Compra finalizada com sucesso!");
  window.location.href = "./index.html";
}

render();
