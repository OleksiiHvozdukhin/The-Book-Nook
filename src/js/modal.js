  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    selectedBook: document.querySelector('.selected-book'),
  };

  refs.openModalBtn.addEventListener('click', toggleModalOpen);
  refs.closeModalBtn.addEventListener('click', toggleModalClose);
  
//запит на книжку в бекенда

function toggleModalOpen() {
  refs.modal.classList.toggle('is-hidden');
  document.body.classList.toggle('no-scroll');
  
  const ID = refs.openModalBtn.getAttribute('id');
  const APIURL = `https://books-backend.p.goit.global/books/${ID}`;
   fetch(APIURL)
      .then(response => {
      // Перевіряємо, чи запит успішний (status код 200-299 вважається успішним)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Парсимо JSON з відповіді
      return response.json();
    })
    .then(data => {     
      refs.selectedBook.insertAdjacentHTML('beforeend',createBook(data));      
      })
      .catch(error => {
        // console.error('Error:', error);
      });
}

/*---------------!!!!!!!!!!!!!!!!!!!*Модуль 8. Занятие 15. Делегирование событий час 1:07:00*/
  /*розмітка під рендер модального вікна*/
function createBook({ book_image, title, author, description, buy_links}) {
     return `<img class="cover-book" src="${book_image}" alt="обкладинка книжки">     
          <div class="description-book">
            <h3 class="name-book">${title}</h3>
            <p class="author-book">${author}</p>
            <p class="abstract-book">${description}</p>
            <ul class="links-tradeplatforms">
              <li class="link-item" href="${buy_links[0].url}">
                <a href="${buy_links[0].url}">
                  <img src="./images/6-Pop Up/amazon@1x.png" alt="логотип Amazone">
                </a>            
              </li>
              <li class="link-item" href="${buy_links[1].url}">
                <a href="${buy_links[1].url}">
                  <img src="./images/6-Pop Up/book.png" alt="логотип AppleBooks">
                </a>
              </li>
              <li class="link-item" href="${buy_links[4].url}">
                <a href="${buy_links[4].url}">
                  <img src="./images/6-Pop Up/bookShop@1x.png" alt="логотип BookShop">
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
