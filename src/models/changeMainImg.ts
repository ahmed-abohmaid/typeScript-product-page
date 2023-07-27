interface Options {
  mainImg: HTMLImageElement;
  imgContainer: HTMLDivElement;
  productImgsContainer: NodeListOf<HTMLDivElement>;
  removeAllActive: CallableFunction;
}

export function changeMainImage(options: Options): void {
  const { mainImg, imgContainer, productImgsContainer, removeAllActive } =
    options;

  removeAllActive(productImgsContainer);

  imgContainer.classList.add('active');
  mainImg.style.opacity = '0.7';
  mainImg.dataset.number = imgContainer.id;

  setTimeout(() => {
    mainImg.src =
      (imgContainer.children[0] as HTMLImageElement).dataset.src || '';
    mainImg.style.opacity = '1';
  }, 180);
}
