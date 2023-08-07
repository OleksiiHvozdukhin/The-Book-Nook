// Theme toggle
const themeSwitcher = document.getElementById('slider');
const body = document.body;
const header = document.getElementById('header');
const logo = document.getElementById('logo');
const mobileMenuButton = document.querySelector('[data-menu-open]');
const mobileMenuCloseButton = document.querySelector('[data-menu-close]');

const categoryList = document.getElementsByClassName('category_list')[0];
const headerLogo = document.getElementsByClassName('logo')[0];

function toggleTheme() {
  body.classList.toggle('dark-theme');
  categoryList.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    setDarkThemeStyles();
  } else {
    localStorage.setItem('theme', 'light');
    setLightThemeStyles();
  }
}

function setDarkThemeStyles() {
  header.style.setProperty('--header-bg-color-light', '#111111');
  header.style.setProperty('--header-border-color-light', '#fff');
  // logo.src = './images/1-Header/logo_dark.svg';
  // headerLogo.firstElementChild.innerHTML =
  //   '<img src="./images/1-Header/logo_dark.svg" alt="Logo" id="logo" />';
  // logo.parentNode.innerHTML =
  //   '<img src="./images/1-Header/logo_dark.svg" alt="Logo" id="logo" />';
  mobileMenuCloseButton.style.visibility = 'visible';

  // categoryList.style.setProperty();
}

function setLightThemeStyles() {
  header.style.setProperty('--header-bg-color-light', '#f9f9f9');
  header.style.setProperty('--header-border-color-light', '#000');
  // logo.src = './images/1-Header/logo_light.svg';
  // headerLogo.firstElementChild.innerHTML =
  //   '<img src="./images/1-Header/logo_light.svg" alt="Logo" id="logo" />';
}

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  categoryList.classList.add('dark-theme');
  themeSwitcher.checked = true;
  setDarkThemeStyles();
} else {
  body.classList.remove('dark-theme');
  categoryList.classList.remove('dark-theme');
  themeSwitcher.checked = false;
  setLightThemeStyles();
}

themeSwitcher.addEventListener('change', toggleTheme);

// Modal menu
(() => {
  const refs = {
    openMenuBtn: document.querySelectorAll('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.openMenuBtn.forEach(el => {
    el.addEventListener('click', toggleMenu);
  });

  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    refs.openMenuBtn.forEach(el => el.classList.toggle('is-hidden'));
    refs.closeMenuBtn.classList.toggle('is-hidden');
  }
})();
// --------------------------------Pawel--
const listBook = document.querySelector('.js-list');
const listCategory = document.querySelector('.js-container-category');
const titleCategory = document.querySelector('.js-title');
listBook.addEventListener('click', handlerClickBook);
// -----------------запит на всі категоріі-----
function serviceBook() {
  return fetch('https://books-backend.p.goit.global/books/top-books').then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}
// -------------------category list request-----

function serviceCategory() {
  return fetch('https://books-backend.p.goit.global/books/category-list').then(
    resp => {
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      return resp.json();
    }
  );
}
// -----------------------request for the selected category -----
function serviceThisCategory(res) {
  return fetch(
    `https://books-backend.p.goit.global/books/category?category=${res}`
  ).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}
// ----------------------- request for the selected book-------
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
serviceBook()
  .then(data => {
    listBook.insertAdjacentHTML('beforeend', createMarcup(data));
    const itemCategory = document.querySelectorAll('.js-add-list');
    for (let i = 0; i < data.length; i += 1) {
      itemCategory[i].insertAdjacentHTML(
        'beforeend',
        createBooks(data[i].books)
      );
    }
  })
  .catch(err => console.log(err));

serviceCategory()
  .then(data => {
    listCategory.insertAdjacentHTML('beforeend', createCategory(data));
    listCategory.addEventListener('click', onClick);
  })
  .catch(err => console.log(err));

function onClick(evt) {
  let result = evt.target.textContent;
  result = result.trimStart();
  console.log(result);
  serviceThisCategory(result)
    .then(data => {
      listBook.innerHTML = createBooks(data);
    })
    .catch(err => console.log(err));
}

function createMarcup(arr) {
  return arr
    .map(
      ({ books: [{ list_name }] }) => `
  <li class="js-item item-list">
        <h3 class="category-name">${list_name}</h3>
        <ul class="category-menu js-add-list"></ul>
        <button class="see-more-btn" type="button">See more</button>
      </li>`
    )
    .join('');
}

function createCategory(arr) {
  return arr
    .map(
      ({ list_name }) => `<li class="js-item-category category_item">
  ${list_name}</li>`
    )
    .join('');
}

function handlerClickBook(evt) {
  const bookItem = evt.target.closest('.js-book-item');
  if (bookItem) {
    const { id } = bookItem.dataset;
    servicesSelectedBook(id).then(({ _id, book_image, author, title }) => {
      const instance = basicLightbox.create(`<div class="modal">
               <img src="${book_image}" alt="${_id}"width="335" height="485">
                <h3>${title}</h3>
                <p>${author}</p>
              </div>`);
      instance.show();
    });
  }
}

function createBooks(arr) {
  return arr
    .map(
      ({ _id, book_image, author, title }) =>
        `<li class="item-image js-book-item" data-id="${_id}" >
        <img class="book-image"  src="${book_image}" width="335" height="485" alt="${title}">
    <h3 class="book-title">${title}</h3>
    <p class="author-name">${author}</p>
      </li>`
    )
    .join('');
}
