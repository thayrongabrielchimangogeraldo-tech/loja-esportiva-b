// 🔐 SUPABASE
const supabaseUrl = "https://jbpiyrfmeadrigcybbaq.supabase.co";
const supabaseKey = "SUA_CHAVE_PUBLICAVEL_AQUI";
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 🔹 ELEMENTOS
const btnCadastrar = document.getElementById("btnCadastrar");
const listaUsuarios = document.getElementById("listaUsuarios");
const produtosDiv = document.getElementById("produtos");

// ==================
// 👤 USUÁRIOS
// ==================

btnCadastrar.addEventListener("click", cadastrarUsuario);

async function cadastrarUsuario() {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!nome || !email) {
    alert("Preencha nome e email");
    return;
  }

  const { data, error } = await supabase
    .from("usuarios")
    .insert([{ nome, email }])
    .select();

  if (error) {
    alert("Erro ao cadastrar usuário");
    console.error(error);
    return;
  }

  localStorage.setItem("usuario", JSON.stringify(data[0]));
  alert("Usuário cadastrado com sucesso!");

  document.getElementById("nome").value = "";
  document.getElementById("email").value = "";

  carregarUsuarios();
}

async function carregarUsuarios() {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .order("criado_em", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  listaUsuarios.innerHTML = "";

  data.forEach(usuario => {
    const li = document.createElement("li");
    li.textContent = `${usuario.nome} (${usuario.email})`;
    listaUsuarios.appendChild(li);
  });
}

// ==================
// 🛒 PRODUTOS
// ==================

const produtos = [
  { id: 1, nome: "Luvas de Goleiro", preco: 149.9 },
  { id: 2, nome: "Mochila Esportiva", preco: 199.9 },
  { id: 3, nome: "Bola Oficial", preco: 99.9 }
];

function carregarProdutos() {
  produtosDiv.innerHTML = "";

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${p.nome}</h3>
      <p>R$ ${p.preco.toFixed(2)}</p>
      <button onclick="addCarrinho(${p.id}, '${p.nome}', ${p.preco})">
        Comprar
      </button>
    `;

    produtosDiv.appendChild(card);
  });
}

// ==================
// 🧺 CARRINHO
// ==================

function addCarrinho(id, nome, preco) {
  if (!localStorage.getItem("usuario")) {
    alert("Cadastre um usuário primeiro");
    return;
  }

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ id, nome, preco });
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  alert("Produto adicionado ao carrinho");
}

// ==================
// 🚀 INICIALIZA
// ==================

carregarUsuarios();
carregarProdutos();
