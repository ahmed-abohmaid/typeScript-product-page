import './style.css';
import { changeMainImage } from './models/changeMainImg';
import { showProductPopup } from './models/showProductPopup';

type DivEle = HTMLDivElement;

/* Header with small devices */
const toggleIcon = <DivEle>document.querySelector('.toggle-icon');
const closeIcon = <DivEle>document.getElementById('close');
const navBar = <HTMLMenuElement>document.querySelector('.navbar');

toggleIcon.addEventListener('click', (): void => {
  navBar.classList.add('open');
  addOverlay();
});

closeIcon.addEventListener('click', (): void => {
  navBar.classList.remove('open');
  removeOverlay();
});

/*  - Toggling between product images
    - Show Popup
*/
const mainImg = document.getElementById('main-img') as HTMLImageElement;
const productImgsContainer = document.querySelectorAll(
  '.single-option'
) as NodeListOf<DivEle>;
const nextIcon = document.getElementById('next') as DivEle;
const prevIcon = document.getElementById('prev') as DivEle;
let currentItem: number = 1;

productImgsContainer.forEach((imgContainer: DivEle): void => {
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
) as DivEle;

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
    checker();
  }, 180);
});

prevIcon.addEventListener('click', (): void => {
  mainImg.style.opacity = '0';
  setTimeout((): void => {
    mainImg.style.opacity = '1';
    currentItem--;
    checker();
  }, 180);
});

function checker(): void {
  if (currentItem > productImgsContainer.length) {
    currentItem = 1;
  }

  if (currentItem === 0) {
    currentItem = productImgsContainer.length;
  }

  mainImg.src = `./src/assets/imgs/image-product-${currentItem}.jpg`;
  mainImg.dataset.number = currentItem.toString();
  popupImgId = parseInt(mainImg.dataset.number);

  removeAllActive(productImgsContainer);
  productImgsContainer[currentItem - 1].classList.add('active');
}
checker();

/* 
    Global
*/
function addOverlay(): void {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  document.documentElement.append(overlay);
}

function removeOverlay(): void {
  const overlay = document.querySelector('.overlay') as DivEle;
  if (overlay) {
    overlay.remove();
  }
}

function removeAllActive(target: NodeListOf<HTMLElement>) {
  target.forEach((div: HTMLElement): void => {
    div.classList.remove('active');
  });
}
