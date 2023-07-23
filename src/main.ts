import './style.css';

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