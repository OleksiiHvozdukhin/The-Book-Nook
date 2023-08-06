const refs = {
  supportUkraine: document.querySelector('.support-ukraine'),
  funds: document.querySelector('.funds.support-ukraine-container'),
  slider: document.querySelector('.slider-support-ukraine'),
};

refs.slider.addEventListener('click', onSliderClick);

function onSliderClick() {
  fundsList.classList.toggle('active');
  refs.supportUkraine.classList.toggle('active');
}
