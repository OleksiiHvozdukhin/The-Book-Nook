  const refs = {
    openModal: document.querySelector('[data-modal-open]'),
    closeModal: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
    selectedBook: document.querySelector('.selected-book-modal'),
    addRemoveBtn: document.querySelector('add-remove-btn'),
  };

  refs.openModal.addEventListener('click', toggleModalOpen);
  refs.closeModal.addEventListener('click', toggleModalClose);
  

localStorage.setItem('list', JSON.stringify([]));

let bookList = localStorage.getItem('list');
console.log(bookList);
// Функція для додавання ID книги до списку
function addBookToList(bookId) {
    bookList.push(bookId);
  localStorage.setItem('list', JSON.stringify(bookList));

  toggleModalClose();
  refs.addRemoveBtn.addEventListener.clear();
}
 
// Функція для видалення ID книги зі списку
function removeBookFromList(bookId) {
    bookList = bookList.filter(id => id !== bookId);
    localStorage.setItem('list', JSON.stringify(bookList));
}
  

function toggleModalOpen() {
  refs.modal.classList.toggle('is-hidden');
  document.body.classList.toggle('no-scroll');
  
  const ID = refs.openModal.getAttribute('id');
  const APIURL = `https://books-backend.p.goit.global/books/${ID}`;

  //запит на книжку в бекенда
   fetch(APIURL)
      .then(response => {      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }     
      return response.json();
    })
    .then(data => {     
      refs.selectedBook.insertAdjacentHTML('beforeend', createBook(data)); 
      // Отримуємо список книжок з LocalStorage або встановлюємо за замовчуванням
     
      if (bookList.includes(data._id)) {
        refs.addRemoveBtn.innerHTML = "Remove";
        refs.addRemoveBtn.addEventListener('click', addBookToList(data._id));
      }
      else {
        console.log(bookList);
        refs.addRemoveBtn.innerHTML = "Add";
         }
      
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
  localStorage.clear();
  }
