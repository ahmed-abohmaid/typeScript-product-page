import './style.css';
import { changeMainImage } from './models/changeMainImg';

/* Header with small devices */
let toggleIcon = <HTMLDivElement>document.querySelector('.toggle-icon');
let closeIcon = <HTMLDivElement>document.getElementById('close');
let navBar = <HTMLMenuElement>document.querySelector('.navbar');

toggleIcon.addEventListener('click', (): void => {
  navBar.classList.add('open');
});

closeIcon.addEventListener('click', (): void => {
  navBar.classList.remove('open');
});

/* Toggling between product images */
let mainImg = document.getElementById('main-img') as HTMLImageElement;
let productImgsContainer = document.querySelectorAll(
  '.single-option'
) as NodeListOf<HTMLDivElement>;

productImgsContainer.forEach((div: HTMLDivElement): void => {
  div.addEventListener('click', (): void => {
    changeMainImage(mainImg, div, productImgsContainer);
  });
});
