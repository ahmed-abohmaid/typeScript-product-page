import { changeMainImage } from './changeMainImg';
import imageProductThumb1 from '../assets/imgs/image-product-1-thumbnail.jpg';
import imageProductThumb2 from '../assets/imgs/image-product-2-thumbnail.jpg';
import imageProductThumb3 from '../assets/imgs/image-product-3-thumbnail.jpg';
import imageProductThumb4 from '../assets/imgs/image-product-4-thumbnail.jpg';
import { imageSources } from '../interfaces/imagesInterface';

interface PopupOptions {
  popupContainer: HTMLDivElement;
  addOverlay: CallableFunction;
  removeOverlay: CallableFunction;
  removeAllActive: CallableFunction;
  popupImgId: number;
}

const imageSourcesThumb: Record<number, string> = {
  1: imageProductThumb1,
  2: imageProductThumb2,
  3: imageProductThumb3,
  4: imageProductThumb4,
};

export function showProductPopup(options: PopupOptions): void {
  const {
    popupContainer,
    addOverlay,
    removeOverlay,
    removeAllActive,
    popupImgId,
  } = options;

  addOverlay();

  const popupComponent = `
    <div class="close">
      <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
        <path d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z" fill="#69707D" fill-rule="evenodd"/>
      </svg>
    </div>

    <div class="current-img">
      <img
        src="${imageSources[popupImgId]}"
        alt="product image1"
        id="main-img"
      />

      <button class="next" id="popup-next">
        <svg width="13" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>

      <button class="prev" id="popup-prev">
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="#1D2026"
            stroke-width="3"
            fill="none"
            fill-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <div class="optional-imgs">
      <div class="single-option active" id="1">
        <img
          src="${imageSourcesThumb[1]}"
          alt="product image1"
          data-src="${imageSources[1]}"
        />
      </div>
      <div class="single-option" id="2">
        <img
          src="${imageSourcesThumb[2]}"
          alt="product image3"
          data-src="${imageSources[2]}"
        />
      </div>
      <div class="single-option" id="3">
        <img
          src="${imageSourcesThumb[3]}"
          alt="product image4"
          data-src="${imageSources[3]}"
        />
      </div>
      <div class="single-option" id="4">
        <img
          src="${imageSourcesThumb[4]}"
          alt="product image5"
          data-src="${imageSources[4]}"
        />
      </div>
    </div>
  `;

  popupContainer.innerHTML = popupComponent;
  popupContainer.style.opacity = '1';

  const popupMainImg = document.querySelector(
    '.product-popup-container #main-img'
  ) as HTMLImageElement;
  const popupProductImgsContainer = document.querySelectorAll(
    '.product-popup-container .single-option'
  ) as NodeListOf<HTMLDivElement>;
  const closeIcon = document.querySelector(
    '.product-popup-container .close'
  ) as HTMLDivElement;
  const nextIcon = document.getElementById('popup-next') as HTMLDivElement;
  const prevIcon = document.getElementById('popup-prev') as HTMLDivElement;
  let currentItem: number = popupImgId;

  popupProductImgsContainer.forEach((imgContainer: HTMLDivElement): void => {
    imgContainer.addEventListener('click', (): void => {
      currentItem = parseInt(imgContainer.id);

      changeMainImage({
        mainImg: popupMainImg,
        imgContainer,
        productImgsContainer: popupProductImgsContainer,
        removeAllActive,
      });
    });
  });

  closeIcon.addEventListener('click', (): void => {
    closePopup();
  });

  // Toggling with icons
  nextIcon.addEventListener('click', (): void => {
    popupMainImg.style.opacity = '0';
    setTimeout((): void => {
      popupMainImg.style.opacity = '1';
      currentItem++;
      checker();
    }, 180);
  });

  prevIcon.addEventListener('click', (): void => {
    popupMainImg.style.opacity = '0';
    setTimeout((): void => {
      popupMainImg.style.opacity = '1';
      currentItem--;
      checker();
    }, 180);
  });

  function checker(): void {
    if (currentItem > popupProductImgsContainer.length) {
      currentItem = 1;
    }

    if (currentItem === 0) {
      currentItem = popupProductImgsContainer.length;
    }

    popupMainImg.src = `${imageSources[currentItem]}`;

    removeAllActive(popupProductImgsContainer);
    popupProductImgsContainer[currentItem - 1].classList.add('active');
  }
  checker();

  function closePopup(): void {
    popupContainer.style.opacity = '0';
    setTimeout(() => {
      popupContainer.innerHTML = '';
      removeOverlay();
    }, 150);
  }
}
