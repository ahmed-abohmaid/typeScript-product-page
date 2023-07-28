import { CartItem } from '../interfaces/cartInterfaces';
import imageProduct1 from '../assets/imgs/image-product-1.jpg';
import deleteIconSvg from '../assets/icons/icon-delete.svg';

const cartItemsData = document.querySelector(
  '.cart-items .data'
) as HTMLDivElement;
const cartAmountPopup = document.querySelector(
  '.cart-amount'
) as HTMLDivElement;

export function addToCart(
  cartItem: CartItem,
  deleteCartItem: CallableFunction
): void {
  if (cartItem.quantity === 0) {
    cartAmountPopup.style.display = 'none';
    cartAmountPopup.innerHTML = '';
    cartItemsData.style.marginTop = '50px';
    cartItemsData.innerHTML = `<p class="empty">Your cart is empty.</p>`;
  } else {
    let productPrice = cartItem.products[0].price;
    let totalPrice: number | string = checkDecimal(
      productPrice * cartItem.quantity
    )
      ? productPrice * cartItem.quantity
      : `${productPrice * cartItem.quantity}.00`;

    cartAmountPopup.style.display = 'block';
    cartAmountPopup.innerHTML = cartItem.quantity.toString();
    cartItemsData.style.marginTop = 'auto';
    cartItemsData.innerHTML = `
    <div class="cart-item-container">
      <ul id="cart-item">
        <li>
          <img
            src="${imageProduct1}"
            alt="product image"
          />
          <div class="details">
            <p class="name">${cartItem.products[0].name}</p>
            <p>
              <span class="cart-price">$${
                checkDecimal(productPrice) ? productPrice : `${productPrice}.00`
              }</span> × <span id="quantity">${cartItem.quantity}</span>
              <span id="total-price">$${totalPrice}</span>
            </p>
          </div>
          <button id="delete">
            <img src="${deleteIconSvg}" alt="delete" />
          </button>
        </li>
      </ul>
      <div class="checkout">
        <button>Checkout</button>
      </div>
    </div>`;
  }

  const deleteIcon = document.getElementById('delete') as HTMLButtonElement;
  deleteIcon.addEventListener('click', (): void =>
    deleteCartItem(cartItemsData, cartAmountPopup)
  );
}

function checkDecimal(price: number): boolean {
  return price.toString().includes('.');
}
