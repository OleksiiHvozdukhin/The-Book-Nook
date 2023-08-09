  const refs = {
    openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    selectedBook: document.querySelector('.selected-book-modal'),
    addRemoveBtn: document.querySelector('add-remove-btn'),
  };

  refs.openModal.addEventListener('click', toggleModalOpen);
  refs.closeModal.addEventListener('click', toggleModalClose);
  
//запит на книжку в бекенда

function toggleModalOpen() {
  refs.modal.classList.toggle('is-hidden');
  document.body.classList.toggle('no-scroll');
  
  const ID = refs.openModal.getAttribute('id');
  const APIURL = `https://books-backend.p.goit.global/books/${ID}`;

   fetch(APIURL)
      .then(response => {      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }     
      return response.json();
    })
    .then(data => {     
      refs.selectedBook.insertAdjacentHTML('beforeend', createBook(data));  
      // if (data._id == localStorage.getItem('list', _id)) {
      //   refs.addRemoveBtn.textContent = "Add to shopping list";
      //   refs.addRemoveBtn.getAttribute('data-add', data._id);
      // }
      // else {
      //   refs.addRemoveBtn.textContent = "remove from the shopping list";
      //   refs.addRemoveBtn.getAttribute('data-remove', data._id);
      // }
      })
      .catch(error => {
        // console.error('Error:', error);
      });
}


/*---------------!!!!!!!!!!!!!!!!!!!*Модуль 8. Занятие 15. Делегирование событий час 1:07:00*/
  /*розмітка під рендер модального вікна*/
function createBook({ book_image, title, author, description, buy_links}) {
     return `<img class="cover-book-modal" src="${book_image}" alt="обкладинка книжки">     
          <div>
            <h3 class="name-book-modal">${title}</h3>
            <p class="author-book-modal">${author}</p>
            <p class="abstract-book-modal">${description}</p>
            <ul class="links-tradeplatforms-modal">
              <li class="link-tradeplatform">
                <a href="${buy_links[0].url}" target="_blank">
                  <img src="/images/6-Pop Up/amazon.png" alt="логотип Amazone">
                </a>            
              </li>
              <li class="link-tradeplatform">
                <a href="${buy_links[1].url}" target="_blank">
                  <img src="../images/6-Pop Up/amazon.png" alt="логотип AppleBooks">
                </a>
              </li>
              <li class="link-tradeplatform">
                <a href="${buy_links[4].url}" target="_blank">
                  <img src="./images/6-Pop Up/bookShop.png" alt="логотип BookShop">
                </a>
              </li>
            </ul>
          </div>
          `;
}

function toggleModalClose() {
    refs.modal.classList.toggle('is-hidden');
    document.body.classList.toggle('no-scroll');  
  
    refs.selectedBook.innerHTML = '';
  }
