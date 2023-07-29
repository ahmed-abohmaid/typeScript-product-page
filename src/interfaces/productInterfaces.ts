export interface MainImgOptions {
  mainImg: HTMLImageElement;
  imgContainer: HTMLDivElement;
  productImgsContainer: NodeListOf<HTMLDivElement>;
  removeAllActive: CallableFunction;
}

export interface PopupOptions {
  popupContainer: HTMLDivElement;
  addOverlay: CallableFunction;
  removeOverlay: CallableFunction;
  removeAllActive: CallableFunction;
  popupImgId: number;
}