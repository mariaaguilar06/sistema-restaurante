// --- CONFIGURAÇÃO E ESTADO ---
let menuItems = [];
let categorias = ['Entradas', 'Sopas', 'Carne', 'Peixe', 'Sobremesa'];
let colunasCozinha = ['Order Preview', 'Preparing', 'Cooling Down', 'Ready to Serve', 'Concluded'];

let currentCategory = 'Entradas';
let mesaSelecionada = "";
let carrinho = [];
let vistaAtual = 'CLIENTE'; // Alterna entre 'CLIENTE' e 'COZINHA'
let pedidosNaCozinha = []; // Simulação de pedidos recebidos

function setup() {
  createCanvas(850, 650);
  // Simulação de dados iniciais (Requisito: Menu com pratos [cite: 47])
  console.log("Sistema O Moelas Iniciado");
}

function draw() {
  background(255);
  
  // Botão para alternar vistas (Só para facilitar a tua demonstração)
  desenharAlternadorVistas();

  if (vistaAtual === 'CLIENTE') {
    desenharInterfaceCliente();
  } else {
    desenharDashboardCozinha();
  }
}

// --- INTERFACE DO CLIENTE ---
function desenharInterfaceCliente() {
  // 1. Categorias Horizontais [cite: 41, 61]
  for (let i = 0; i < categorias.length; i++) {
    fill(categorias[i] === currentCategory ? 180 : 240);
    rect(i * 170, 50, 170, 50);
    fill(0);
    textAlign(CENTER, CENTER);
    text(categorias[i], i * 170 + 85, 75);
  }

  // 2. Seleção de Mesa [cite: 55, 67]
  fill(0);
  textAlign(LEFT);
  textSize(16);
  text("Mesa Atual: " + (mesaSelecionada || "Por favor, clique para definir"), 20, 130);

  // 3. Listagem de Pratos (Exemplo visual) [cite: 50, 71]
  fill(100);
  rect(20, 150, 400, 300);
  fill(255);
  text("Lista de Pratos da Categoria: " + currentCategory, 40, 180);
  textSize(12);
  text("- Prato Exemplo 1 (Clique + para adicionar)", 40, 210);

  // 4. Botão Submeter [cite: 57, 58]
  fill(0, 150, 0);
  rect(650, 580, 180, 50, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text("SUBMETER PEDIDO", 740, 605);
}

// --- DASHBOARD DA COZINHA ---
function desenharDashboardCozinha() {
  let larguraCol = width / colunasCozinha.length;
  
  // 1. Desenhar as 5 Colunas 
  for (let i = 0; i < colunasCozinha.length; i++) {
    stroke(200);
    fill(250);
    rect(i * larguraCol, 50, larguraCol, 500);
    
    fill(50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(colunasCozinha[i], i * larguraCol + larguraCol/2, 75);
  }

  // 2. Botão de Refresh Manual [cite: 74, 97]
  fill(100, 100, 255);
  rect(20, 580, 120, 40, 5);
  fill(255);
  text("REFRESH", 80, 600);
  
  fill(0);
  textAlign(LEFT);
  text("Dica: Clique nos cartões para ver ingredientes [cite: 71]", 160, 605);
}

// --- INTERAÇÕES ---
function mousePressed() {
  // Trocar Vista
  if (mouseY < 40) {
    if (mouseX < width/2) vistaAtual = 'CLIENTE';
    else vistaAtual = 'COZINHA';
  }

  // Simular Submissão (Interface Cliente)
  if (vistaAtual === 'CLIENTE' && mouseX > 650 && mouseY > 580) {
    if (mesaSelecionada === "") {
      mesaSelecionada = prompt("Insira o número da mesa: ");
    } else {
      alert("Pedido enviado para a cozinha com sucesso! ");
      mesaSelecionada = ""; // Reset 
    }
  }

  // Simular Refresh (Interface Cozinha)
  if (vistaAtual === 'COZINHA' && mouseX > 20 && mouseX < 140 && mouseY > 580) {
    alert("A carregar novos pedidos da API... ");
  }
}

function desenharAlternadorVistas() {
  stroke(0);
  fill(vistaAtual === 'CLIENTE' ? 100 : 200);
  rect(0, 0, width/2, 40);
  fill(vistaAtual === 'COZINHA' ? 100 : 200);
  rect(width/2, 0, width/2, 40);
  fill(255);
  textAlign(CENTER, CENTER);
  text("VISTA CLIENTE", width/4, 20);
  text("VISTA COZINHA", 3*width/4, 20);
}
