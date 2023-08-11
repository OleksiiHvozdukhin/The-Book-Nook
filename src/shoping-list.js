function servicesSelectedBook(idBook) {
  return fetch(`https://books-backend.p.goit.global/books/${idBook}`).then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const booksPerPage = 3; // Количество книг на одной странице
const bookList = document.querySelector('.shopping-book-list');

const firstBtn = document.querySelector('.first-btn');
const prevBtn = document.querySelector('.prev-btn');
const prevNumerBtn = document.querySelector('.prev-numer-btn');
const nowBtn = document.querySelector('.now-btn');
const nextNumerBtn = document.querySelector('.next-numer-btn');
const nextBtn = document.querySelector('.next-btn');
const lastBtn = document.querySelector('.last-btn');

function secondToLastKeyFromLocalStorage() {
  const keys = Object.keys(localStorage);

  if (keys.length >= 2) {
    if (keys[keys.length - 2] == 'theme') return keys[keys.length - 1];
    else return keys[keys.length - 2];
  }
}

function searchMoreElement() {
  const keys = Object.keys(localStorage);
  const existingIds = Array.from(
    document.querySelectorAll('.shoping-book-card')
  ).map(element => element.classList[1]);

  for (const key of keys) {
    if (localStorage[key] === 'BOOK') {
      const idFromKey = key.slice(-5);

      if (!existingIds.includes(idFromKey)) {
        return key; // Возвращаем первый найденный отсутствующий id
      }
    }
  }
}

function renderingLiElement(key) {
  servicesSelectedBook(key).then(
    ({ _id, book_image, author, title, description, list_name }) => {
      bookList.insertAdjacentHTML(
        'beforeend',
        `<li class="shoping-book-card ${_id.slice(-5)}">
              <div class="shoping-book-card-img">
        <img src="${book_image}" alt="${_id}"width="335" height="485">
      </div>
      <div class="shoping-book-card-text">
        <div class="shoping-book-card-title_and_ganre">
            <h3 class="shoping-book-card-title">${title}</h3>
            <h4 class="shoping-book-card-ganre">${list_name}</h4>
            <p class="shoping-book-card-description">${description}</p>
        </div>
        <h4 class="shoping-book-card-author">${author}</h4>
      </div>
       <div class="shoping-list-images">
          <ul class="list-images">
            <li><a href="https://www.amazon.com/" class="image-link image-link-amazon"></a></li>
            <li><a href="https://www.openebooks.org/" class="image-link image-link-openBook"></a></li>
            <li><a href="https://bookshop.org/" class="image-link image-link-bookShop"></a></li>
          </ul>
        </div>
      <button class="shoping-list-btn shoping-list-btn${title
        .toLowerCase()
        .replace(/\s/g, '')
        .replace(/[.,';!&:]/g, '')}">
      
    </button>
            </li>`
      );
      const deleteButton = document.querySelector(
        `.shoping-list-btn${title
          .toLowerCase()
          .replace(/\s/g, '')
          .replace(/[.,;!&:]/g, '')}`
      );
      // КНОПКА УДАЛЕНИЯ
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      deleteButton.addEventListener('click', () => {
        const listItem = deleteButton.closest('.shoping-book-card');
        if (listItem) {
          bookList.removeChild(listItem);
          localStorage.removeItem(_id);

          const remainingItems =
            document.querySelectorAll('.shoping-book-card');
          if (remainingItems.length === 0) {
            const clearShopList = document.querySelector(
              '.empty-shopping-list-div'
            );
            const pagination = document.querySelector('.pagination');

            clearShopList.style.display = 'block';
            pagination.style.display = 'none';
          }
          if (remainingItems.length < 3 && localStorage.length > 3) {
            renderingLiElement(searchMoreElement());
            numerationButton();
          }
        }
      });
      // КОНЕЦ КНОПКИ УДАЛЕНИЯ
    }
  );
}

function displayPage(pageNumber) {
  const startIndex = (pageNumber - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const keys = Object.keys(localStorage);

  bookList.innerHTML = ''; // Очищаем список перед добавлением новых элементов
  if (localStorage.length > 1) {
    for (let i = startIndex; i < endIndex && i < keys.length; i++) {
      let key;

      if (keys.length > 3) {
        if (keys[i] === 'theme')
          if (keys[keys.lendth - 1] == 'theme') key = keys[keys.length - 2];
          else key = keys[keys.length - 1];
        else key = keys[i];
      } else key = keys[i];

      if (localStorage[key] === 'BOOK') {
        const clearShopList = document.querySelector(
          '.empty-shopping-list-div'
        );

        renderingLiElement(key);

        const pagination = document.querySelector('.pagination');

        const totalBooks = Object.keys(localStorage).filter(
          key => localStorage[key] === 'BOOK'
        ).length;

        if (totalBooks <= 3) pagination.style.display = 'none';
        else pagination.style.display = 'flex';

        clearShopList.style.display = 'none';
      }
    }
  } else {
    const clearShopList = document.querySelector('.empty-shopping-list-div');
    clearShopList.style.display = 'block';

    const pagination = document.querySelector('.pagination');
    pagination.style.display = 'none';
  }
}

let currentPage = 1;
function numerationButton() {
  const totalBooks = Object.keys(localStorage).filter(
    key => localStorage[key] === 'BOOK'
  ).length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);

  prevNumerBtn.textContent = currentPage - 1;
  nowBtn.textContent = currentPage;
  nextNumerBtn.textContent = currentPage + 1;

  if (currentPage == 1) prevNumerBtn.textContent = '-';
  if (currentPage == totalPages) nextNumerBtn.textContent = '-';

  const pagination = document.querySelector('.pagination');
  if (totalBooks <= 3) pagination.style.display = 'none';
}

firstBtn.addEventListener('click', () => {
  currentPage = 1;
  numerationButton();
  displayPage(currentPage);
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    numerationButton();
    displayPage(currentPage);
  }
});

prevNumerBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    numerationButton();
    displayPage(currentPage);
  }
});

nextNumerBtn.addEventListener('click', () => {
  const totalBooks = Object.keys(localStorage).filter(
    key => localStorage[key] === 'BOOK'
  ).length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    numerationButton();
    displayPage(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  const totalBooks = Object.keys(localStorage).filter(
    key => localStorage[key] === 'BOOK'
  ).length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    numerationButton();
    displayPage(currentPage);
  }
});

lastBtn.addEventListener('click', () => {
  const totalBooks = Object.keys(localStorage).filter(
    key => localStorage[key] === 'BOOK'
  ).length;
  const totalPages = Math.ceil(totalBooks / booksPerPage);
  currentPage = totalPages;
  numerationButton();
  displayPage(currentPage);
});

numerationButton();
displayPage(currentPage);
