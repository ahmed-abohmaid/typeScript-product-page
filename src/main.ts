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

productImgsContainer.forEach((div: DivEle): void => {
  div.addEventListener('click', (): void =>
    changeMainImage(mainImg, div, productImgsContainer)
  );
});

// Open product popup
const popupContainer = document.querySelector(
  '.product-popup-container'
) as DivEle;

mainImg.addEventListener('click', (): void => {
  showProductPopup(popupContainer, addOverlay, removeOverlay)
})

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
