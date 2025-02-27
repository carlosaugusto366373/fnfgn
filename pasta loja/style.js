const cartItems = [];
const cartTotal = document.getElementById('cart-total');
const cartItemsContainer = document.getElementById('cart-items');

// Função para adicionar item ao carrinho
function addToCart(name, price, imgUrl) {
    const item = { name, price, imgUrl };
    cartItems.push(item);
    updateCart();
}

// Função para remover item do carrinho
function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Função para atualizar o carrinho
function updateCart() {
    cartItemsContainer.innerHTML = '';

    let total = 0;

    cartItems.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');

        cartItemElement.innerHTML = `
            <img src="${item.imgUrl}" alt="${item.name}">
            <div>
                <p class="item-name">${item.name}</p>
                <p class="item-price">${item.price}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${index})">Remover</button>
        `;

        cartItemsContainer.appendChild(cartItemElement);

        const priceValue = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        total += priceValue;
    });

    cartTotal.innerText = `Total: R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Função para redirecionar para o WhatsApp com os detalhes da compra
function redirectToWhatsApp() {
    const orderDetails = cartItems.map(item => `${item.name} - ${item.price}`).join('%0A');
    const totalAmount = cartTotal.innerText.replace('Total: ', '').replace('R$', '').replace(',', '.');
    
    const whatsappUrl = `https://wa.me/554499694564?text=Eu%20quero%20finalizar%20minha%20compra%0A${orderDetails}%0ATotal:%20R$%20${totalAmount}`;
    window.location.href = whatsappUrl;
}
