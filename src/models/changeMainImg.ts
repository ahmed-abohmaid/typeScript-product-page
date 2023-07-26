export function changeMainImage(
  mainImg: HTMLImageElement,
  div: HTMLDivElement,
  productImgsContainer: NodeListOf<HTMLDivElement>
): void {
  productImgsContainer.forEach((div: HTMLDivElement): void => {
    div.classList.remove('active');
  });

  div.classList.add('active');
  mainImg.style.opacity = '0.7';

  setTimeout(() => {
    mainImg.src = (div.children[0] as HTMLImageElement).dataset.src || '';
    mainImg.style.opacity = '1';
  }, 180);
}
