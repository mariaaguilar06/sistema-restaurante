let menuItems = [];
let currentCategory = 'Entradas';
let categories = ['Entradas', 'Sopas', 'Carne', 'Peixe', 'Sobremesa'];
let mesa = ""; // Requisito: Selecionar número da mesa [cite: 55]
let carrinho = [];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(255);
  desenharCategorias();
  
  // Mostrar mesa selecionada [cite: 55]
  fill(0);
  textSize(16);
  text("Mesa: " + (mesa || "Nenhum"), 20, 70);
  
  desenharBotaoSubmeter();
}

function desenharCategorias() {
  for (let i = 0; i < categories.length; i++) {
    fill(categories[i] === currentCategory ? 200 : 240);
    rect(i * 160, 0, 160, 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text(categories[i], i * 160 + 80, 25);
  }
}

function desenharBotaoSubmeter() {
  // Botão de submissão claramente identificado 
  fill(0, 150, 0);
  rect(600, 530, 180, 50);
  fill(255);
  text("SUBMETER PEDIDO", 690, 555);
}

// Função para simular o reset após submeter 
function finalizarPedido() {
  alert("Pedido enviado com sucesso!");
  mesa = "";
  carrinho = [];
  // Reset da interface para novo pedido 
}
