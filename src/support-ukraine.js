const refs = {
  supportUkraine: document.querySelector('.support-ukraine'),
  funds: document.querySelector('.funds'),
  slider: document.querySelector('.slider'),
};

refs.slider.addEventListener('click', onSliderClick);

function onSliderClick() {
  fundsList.classList.toggle('active');
  refs.supportUkraine.classList.toggle('active');
}
