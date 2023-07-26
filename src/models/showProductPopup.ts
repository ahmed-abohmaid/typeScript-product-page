import { changeMainImage } from './changeMainImg';

type DivEle = HTMLDivElement;

export function showProductPopup(
  popupContainer: DivEle,
  addOverlay: CallableFunction,
  removeOverlay: CallableFunction
): void {
  addOverlay();

  const popupComponent = `
    <div class="close">
      <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/>
      </svg>
    </div>

    <div class="current-img">
      <img
        src="./src/assets/imgs/image-product-1.jpg"
        alt="product image1"
        id="main-img"
      />

      <div class="next">
        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </div>

      <div class="prev">
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <div class="optional-imgs">
      <div class="single-option active">
        <img
          src="./src/assets/imgs/image-product-1-thumbnail.jpg"
          alt="product image1"
          data-src="./src/assets/imgs/image-product-1.jpg"
        />
      </div>
      <div class="single-option">
        <img
          src="./src/assets/imgs/image-product-2-thumbnail.jpg"
          alt="product image3"
          data-src="./src/assets/imgs/image-product-2.jpg"
        />
      </div>
      <div class="single-option">
        <img
          src="./src/assets/imgs/image-product-3-thumbnail.jpg"
          alt="product image4"
          data-src="./src/assets/imgs/image-product-3.jpg"
        />
      </div>
      <div class="single-option">
        <img
          src="./src/assets/imgs/image-product-4-thumbnail.jpg"
          alt="product image5"
          data-src="./src/assets/imgs/image-product-4.jpg"
        />
      </div>
    </div>
  `;
  popupContainer.innerHTML = popupComponent;

  const popupMainImg = document.querySelector(
    '.product-popup-container #main-img'
  ) as HTMLImageElement;
  const popupProductImgsContainer = document.querySelectorAll(
    '.product-popup-container .single-option'
  ) as NodeListOf<DivEle>;
  const closeIcon = document.querySelector(
    '.product-popup-container .close'
  ) as DivEle;

  popupProductImgsContainer.forEach((div: DivEle): void => {
    div.addEventListener('click', (): void =>
      changeMainImage(popupMainImg, div, popupProductImgsContainer)
    );
  });

  closeIcon.addEventListener('click', (): void => {
    popupContainer.innerHTML = '';
    removeOverlay();
  });
}
