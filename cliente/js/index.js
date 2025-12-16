const supabaseUrl = 'https://jbpiyrfmeadrigcybbaq.supabase.co';
const supabaseKey = 'sb_publishable_AK4U9Oz68DNVX9Rf-MytrQ_a5qVQW9z';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);



// Usuário
const btn = document.getElementById('btnCadastrar');
const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');

btn.onclick = async () => {
  const nome = nomeInput.value;
  const email = emailInput.value;

  if (!nome || !email) {
    alert('Preencha nome e email!');
    return;
  }

  const { data, error } = await supabase
    .from('usuarios')
    .insert([{ nome, email }])
    .select();

  if (error) {
    alert('Erro ao cadastrar usuário');
    console.error(error);
    return;
  }

  localStorage.setItem('usuario', JSON.stringify(data[0]));
  alert('Usuário cadastrado com sucesso!');
};


// Produtos
async function carregarProdutos() {
const { data, error } = await supabase.from('produtos').select('*');
if (error) return alert('Erro ao buscar produtos');


const grid = document.getElementById('produtos');
grid.innerHTML = '';


data.forEach(p => {
grid.innerHTML += `
<div class="card">
<h3>${p.nome}</h3>
<p>${p.descricao || ''}</p>
<strong>R$ ${Number(p.preco).toFixed(2)}</strong>
<button onclick="addCarrinho('${p.id}','${p.nome}',${p.preco})">Comprar</button>
</div>`;
});
}


function addCarrinho(id, nome, preco) {
if (!localStorage.getItem('usuario')) {
alert('Cadastre um usuário primeiro');
return;
}
const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
carrinho.push({ id, nome, preco });
localStorage.setItem('carrinho', JSON.stringify(carrinho));
alert('Produto adicionado');
}


carregarProdutos();