// Variáveis globais
let cartCount = 0; // Contador de itens
let cartItems = []; // Lista de produtos no carrinho

// Função para adicionar produtos ao carrinho
function adicionarProdutoCarrinho(nome, preco) {
  // Atualiza a contagem de itens no carrinho    
  cartCount++;
  document.getElementById('cart-count').textContent = cartCount;

  // Adiciona o produto à lista de itens
  cartItems.push({ nome: nome, preco: preco });

  // (Opcional) Exibir mensagem no console para ver os itens
  console.log('Itens no carrinho:', cartItems);
}

// Função para calcular o valor total do carrinho
function calcularTotal() {
  let total = 0;
  cartItems.forEach(item => {
    total += item.preco;
  });
  return total;
}

// Função para formatar o telefone
document.getElementById("phone").addEventListener("input", function(event) {
  let phone = event.target.value.replace(/\D/g, ''); // Remove tudo o que não é número

  // Aplica a formatação automática
  if (phone.length <= 2) {
    phone = `${phone}`; // Remove os parênteses
  } else if (phone.length <= 6) {
    phone = `${phone.slice(0, 2)} ${phone.slice(2)}`; // Adiciona espaço após o DDD
  } else {
    phone = `${phone.slice(0, 2)} ${phone.slice(2, 6)}-${phone.slice(6, 10)}`; // Adiciona o traço após 6 dígitos
  }

  event.target.value = phone; // Atualiza o valor do campo
});

// Função para finalizar o pedido e abrir o WhatsApp com os detalhes
function finalizarPedido() {
  // Pegando os dados do formulário
  const nome = document.getElementById('name').value;
  const telefone = document.getElementById('phone').value;
  const rua = document.getElementById('street').value;
  const numero = document.getElementById('number').value;
  const bairro = document.getElementById('neighborhood').value;

  // Criar o endereço completo
  const endereco = `${rua}, ${numero} - ${bairro}`;

  // Criar os detalhes do pedido
  let detalhesPedido = `Pedido de ${nome}\nTelefone: ${telefone}\n\nEndereço: ${endereco}\n\n`;

  cartItems.forEach(item => {
    detalhesPedido += `${item.nome} - R$${item.preco.toFixed(2)}\n`;
  });

  // Calcula o total
  const total = calcularTotal();
  detalhesPedido += `\nTotal: R$${total.toFixed(2)}`;

  // Formata a mensagem para WhatsApp
  const mensagem = encodeURIComponent(detalhesPedido);

  // Número do WhatsApp da lanchonete (substitua pelo número correto)
  const numeroLanchonete = "5522981048500"; // Exemplo: +55 22 98104-8500

  // Redireciona para o WhatsApp com os detalhes do pedido
  window.location.href = `https://wa.me/${numeroLanchonete}?text=${mensagem}`;
}

// Função para pegar os detalhes do carrinho como texto
function pegarDetalhesCarrinho() {
  let detalhesCarrinho = 'Itens no carrinho:\n\n';

  cartItems.forEach(item => {
    detalhesCarrinho += `${item.nome} - R$${item.preco.toFixed(2)}\n`;
  });

  // Calcula o total
  const total = calcularTotal();
  detalhesCarrinho += `\nTotal: R$${total.toFixed(2)}`;

  return detalhesCarrinho;
}

// Modal - Abrir o modal com os detalhes do carrinho
document.addEventListener('DOMContentLoaded', () => {
  const openCartBtn = document.getElementById('open-cart-btn'); // Botão para abrir o carrinho
  const modal = document.getElementById('modal'); // Modal do carrinho
  const modalOverlay = document.getElementById('modal-overlay'); // Overlay
  const closeModalBtn = document.getElementById('close-modal'); // Botão para fechar o modal do carrinho
  const nextModalBtn = document.getElementById('next-modal'); // Botão para abrir o modal de entrega
  const deliveryModal = document.getElementById('delivery-modal'); // Modal de entrega
  const closeDeliveryModalBtn = document.getElementById('close-delivery-modal'); // Botão para fechar o modal de entrega
  const cartDetails = document.getElementById('cart-details'); // Container dos detalhes do carrinho
  const totalPrice = document.getElementById('total-price'); // Elemento do total no modal
  const submitOrderBtn = document.getElementById('submit-order'); // Botão Finalizar Pedido

  // Abrir modal ao clicar no botão "Veja meu carrinho"
  openCartBtn.addEventListener('click', () => {
    cartDetails.innerHTML = ''; // Limpa os detalhes antigos

    if (cartItems.length === 0) {
      cartDetails.innerHTML = '<p>Seu carrinho está vazio.</p>';
    } else {
      cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<p>${item.nome} - R$${item.preco.toFixed(2)}</p>`;
        cartDetails.appendChild(itemDiv);
      });
    }

    // Exibe o valor total
    totalPrice.textContent = calcularTotal().toFixed(2);

    // Mostra o modal e o overlay
    modal.style.display = 'block';
    modalOverlay.style.display = 'block';
  });

  // Função para fechar o modal do carrinho
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });

  // Função para abrir o modal de entrega (quando o botão "Próximo" for clicado)
  nextModalBtn.addEventListener('click', () => {
    // Fecha o modal do carrinho
    modal.style.display = 'none';
    modalOverlay.style.display = 'none';

    // Exibe o modal de entrega
    deliveryModal.style.display = 'block';
    modalOverlay.style.display = 'block';
  });

  // Função para fechar o modal de entrega
  closeDeliveryModalBtn.addEventListener('click', () => {
    deliveryModal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });

  // Fechar modal ao clicar fora do conteúdo (overlay)
  modalOverlay.addEventListener('click', () => {
    modal.style.display = 'none';
    deliveryModal.style.display = 'none';
    modalOverlay.style.display = 'none';
  });

  // Chama a função de finalizar pedido ao clicar no botão "Finalizar Pedido"
  submitOrderBtn.addEventListener('click', finalizarPedido);
});