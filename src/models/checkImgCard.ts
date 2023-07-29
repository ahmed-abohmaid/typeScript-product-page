import { imageSources } from '../interfaces/imagesInterface';

export function checkImgCard(
  currentItem: number,
  productImgsContainer: NodeListOf<HTMLDivElement>,
  mainImg: HTMLImageElement,
  popupImgId: number,
  removeAllActive: CallableFunction
) {

  mainImg.src = `${imageSources[currentItem]}`;
  mainImg.dataset.number = currentItem.toString();
  popupImgId = parseInt(mainImg.dataset.number);

  removeAllActive(productImgsContainer);
  productImgsContainer[currentItem - 1].classList.add('active');
}
