import './style.css';
import { changeMainImage } from './models/changeMainImg';
import { showProductPopup } from './models/showProductPopup';
import { addToCart } from './models/addToCart';
import { Product } from './interfaces/cartInterfaces';
import { imageSources } from './interfaces/imagesInterface';
import { checkImgCard } from './models/checkImgCard';

/* Header with small devices */
const toggleIcon = <HTMLDivElement>document.querySelector('.toggle-icon');
const closeIcon = <HTMLDivElement>document.getElementById('close');
const navBar = <HTMLMenuElement>document.querySelector('.navbar');
const mainImg = document.getElementById('main-img') as HTMLImageElement;
const productImgsContainer = document.querySelectorAll(
  '.single-option'
) as NodeListOf<HTMLDivElement>;
const nextIcon = document.getElementById('next') as HTMLDivElement;
const prevIcon = document.getElementById('prev') as HTMLDivElement;

toggleIcon.addEventListener('click', (): void => {
  navBar.classList.add('open');
  addOverlay();
});

closeIcon.addEventListener('click', (): void => {
  navBar.classList.remove('open');
  removeOverlay();
});

/**
 * Adding data-src to all thumbnal imgs
 */
productImgsContainer.forEach(
  (imgContainer: HTMLDivElement, i: number): void => {
    (imgContainer.children[0] as HTMLElement).dataset.src = `${
      imageSources[i + 1]
    }`;
  }
);

/*  - Toggling between product images
    - Show Popup
*/
let currentItem: number = 1;

productImgsContainer.forEach((imgContainer: HTMLDivElement): void => {
  imgContainer.addEventListener('click', (): void =>
    changeMainImage({
      mainImg,
      imgContainer,
      productImgsContainer,
      removeAllActive,
    })
  );
});

// Open product popup
const popupContainer = document.querySelector(
  '.product-popup-container'
) as HTMLDivElement;

let popupImgId: number = parseInt(mainImg.dataset.number ?? '0');

mainImg.addEventListener('click', (): void => {
  popupImgId = parseInt(mainImg.dataset.number ?? '0');

  showProductPopup({
    popupContainer,
    addOverlay,
    removeOverlay,
    removeAllActive,
    popupImgId,
  });
});

// Toggle with icons in small devices
nextIcon.addEventListener('click', (): void => {
  mainImg.style.opacity = '0';
  setTimeout((): void => {
    mainImg.style.opacity = '1';
    currentItem++;

    if (currentItem > productImgsContainer.length) {
      currentItem = 1;
    }

    checkImgCard(
      currentItem,
      productImgsContainer,
      mainImg,
      popupImgId,
      removeAllActive
    );
  }, 180);
});

prevIcon.addEventListener('click', (): void => {
  mainImg.style.opacity = '0';
  setTimeout((): void => {
    mainImg.style.opacity = '1';
    currentItem--;

    if (currentItem === 0) {
      currentItem = productImgsContainer.length;
    }

    checkImgCard(
      currentItem,
      productImgsContainer,
      mainImg,
      popupImgId,
      removeAllActive
    );
  }, 180);
});

checkImgCard(
  currentItem,
  productImgsContainer,
  mainImg,
  popupImgId,
  removeAllActive
);

/* 
    Global
*/
function addOverlay(): void {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  document.documentElement.append(overlay);
}

function removeOverlay(): void {
  const overlay = document.querySelector('.overlay') as HTMLDivElement;
  if (overlay) {
    overlay.remove();
  }
}

function removeAllActive(target: NodeListOf<HTMLElement>) {
  target.forEach((div: HTMLElement): void => {
    div.classList.remove('active');
  });
}

/**
 * Cart Functionality
 */
const cartIcon = document.querySelector('.cart_icon') as HTMLDivElement;
const cartItems = document.querySelector('.cart-items') as HTMLDivElement;
const increaseBtn = document.getElementById('increase') as HTMLButtonElement;
const decreaseBtn = document.getElementById('decrease') as HTMLButtonElement;
const addToCartBtn = document.querySelector(
  '.add-to-cart'
) as HTMLButtonElement;
const productName = document.getElementById(
  'product-name'
) as HTMLHeadingElement;
const productPrice = document.getElementById(
  'product-price'
) as HTMLSpanElement;
const productOldPrice = document.querySelector(
  '.old-price-number'
) as HTMLSpanElement;
const productDiscount = document.getElementById(
  'product-discount'
) as HTMLSpanElement;

let quantity = 0;

// Adding product price after discount
calcProductPrice();

cartIcon.addEventListener('click', (): void => {
  cartItems.classList.toggle('active');
});

increaseBtn.addEventListener('click', (): void => {
  increaseBtn.disabled = false;
  decreaseBtn.disabled = false;
  addToCartBtn.disabled = false;

  quantity++;

  if (quantity > 50) {
    quantity = 50;
    increaseBtn.disabled = true;
  }

  changeAmount(quantity);
});

decreaseBtn.addEventListener('click', (): void => {
  decreaseBtn.disabled = false;
  addToCartBtn.disabled = false;

  quantity--;

  if (quantity <= 0) {
    quantity = 0;
    decreaseBtn.disabled = true;
    addToCartBtn.disabled = true;
  }

  changeAmount(quantity);
});

// Add Product To The Cart
const product: Product = {
  name: productName.innerHTML,
  price: parseFloat(productPrice.innerHTML),
};

addToCartBtn.addEventListener('click', (): void =>
  addToCart({ products: [product], quantity }, deleteCartItem)
);

function calcProductPrice(): void {
  let productNewPrice: number =
    parseFloat(productOldPrice.innerHTML) *
    (parseFloat(productDiscount.innerHTML) / 100);

  productPrice.innerHTML = productNewPrice.toString().includes('.')
    ? productNewPrice.toString()
    : `${productNewPrice.toString()}.00`;
}

function changeAmount(quantity: number): void {
  const amountNumber = document.getElementById(
    'amount-number'
  ) as HTMLParagraphElement;

  amountNumber.innerHTML = `${quantity}`;
}

function deleteCartItem(
  cartData: HTMLDivElement,
  cartAmountPopup: HTMLDivElement
): void {
  quantity = 0;
  cartAmountPopup.style.display = 'none';
  cartAmountPopup.innerHTML = '';
  cartData.style.marginTop = '50px';
  cartData.innerHTML = `<p class="empty">Your cart is empty.</p>`;
  changeAmount(quantity);
}
