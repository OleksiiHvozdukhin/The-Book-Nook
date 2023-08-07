const refs = {
  supportUkraine: document.querySelector('.support-ukraine'),
  allCategoties: document.querySelector('.all_categories'),
  body: document.body,
  funds: document.querySelector('.funds.support-ukraine-container'),
  slider: document.querySelector('.slider-support-ukraine'),
};

refs.slider.addEventListener('click', onSliderClick);

function onSliderClick() {
  fundsList.classList.toggle('active');
  refs.supportUkraine.classList.toggle('active');
  if (refs.body.offsetWidth >= 768 && refs.body.offsetWidth <= 1440)
    refs.allCategoties.classList.toggle('active');
}
