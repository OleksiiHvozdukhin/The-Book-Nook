// Theme toggle
import logoLight from './images/1-Header/logo_light.svg';
import logoDark from './images/1-Header/logo_dark.svg';
const themeSwitcher = document.getElementById('slider');
const body = document.body;
const header = document.getElementById('header');
const logo = document.getElementById('logo');
const mobileMenuButton = document.querySelector('[data-menu-open]');
const mobileMenuCloseButton = document.querySelector('[data-menu-close]');
const categoryList = document.getElementsByClassName('category_list')[0];

function toggleTheme() {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
    setDarkThemeStyles();
  } else {
    localStorage.setItem('theme', 'light');
    setLightThemeStyles();
  }
}

console.log('Fqwe');

function setDarkThemeStyles() {
  header.style.setProperty('--header-bg-color-light', '#111111');
  header.style.setProperty('--header-border-color-light', '#fff');
  logo.src = logoDark;
  mobileMenuCloseButton.style.visibility = 'visible';
}

function setLightThemeStyles() {
  header.style.setProperty('--header-bg-color-light', '#F9F9F9');
  header.style.setProperty('--header-border-color-light', '#000');
  logo.src = logoLight;
}
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-theme');
  themeSwitcher.checked = true;
  setDarkThemeStyles();
} else {
  body.classList.remove('dark-theme');
  themeSwitcher.checked = false;
  setLightThemeStyles();
}

themeSwitcher.addEventListener('change', toggleTheme);

// Mobile menu
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
// const listCategory = document.querySelector('.js-container-category');
const listCategory = document.querySelector('.category_list');
// const titleCategory = document.querySelector('.js-title');
const newTitle = document.querySelector('.title');
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

function arrayOrName(data) {
  if (Array.isArray(data)) return 'Books';
  else return data.textContent;
}

serviceBook()
  .then(data => {
    listBook.insertAdjacentHTML('beforeend', createMarcup(data));
    const itemCategory = document.querySelectorAll('.js-add-list');
    const seeMore = document.querySelectorAll('.js-item');
    for (let i = 0; i < data.length; i += 1) {
      itemCategory[i].insertAdjacentHTML(
        'beforeend',
        createBooks(data[i].books)
      );
      seeMore[i].addEventListener('click', onClickBtn);
    }
  })
  .catch(err => console.log(err));

serviceCategory()
  .then(data => {
    listCategory.insertAdjacentHTML('beforeend', createCategory(data));
    listCategory.addEventListener('click', onClick);
  })
  .catch(err => console.log(err));

// КЛИК ПО КАТЕГОРИИ
function onClick(evt) {
  let result = evt.target.textContent;
  result = result.trimStart();
  console.log(result);
  serviceThisCategory(result)
    .then(data => {
      listBook.innerHTML = createBooks(data);
      const row = data[0].list_name;
      const textElement = row.split(' ');
      const titleCategory = textElement
        .splice(0, textElement.length - 1)
        .join(' ');
      const spanCategory = textElement[textElement.length - 1];
      newTitle.innerHTML = `${titleCategory} <span class="books">${spanCategory}</span>`;
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
        <button class="see-more-btn" type="button">SEE MORE</button>
      </li>`
    )
    .join('');
}

// СОЗДАНИЕ СПИСКА КАТЕГОРИЙ
function createCategory(arr) {
  console.log(arr);
  return arr
    .map(
      ({ list_name }) => `<li class="js-item-category category_item">
  ${list_name}</li>`
    )
    .join('');
}

// MODAL

function handlerClickBook(evt) {
  const bookItem = evt.target.closest('.js-book-item');
  if (bookItem) {
    const { id } = bookItem.dataset;
    servicesSelectedBook(id).then(({ book_image, title, author, description, buy_links }) => {
      const instance = basicLightbox.create(`
      <button type="button" class="btn-modal-close">
      <svg width="24" height="24">
        <use href="../images/icons-sprite/symbol-defs.svg#icon-x-closer"></use>
      </svg>
    </button>
      <div class="selected-book-modal">
      <img class="cover-book-modal" src="${book_image}" alt="обкладинка книжки">     
          <div>
            <h3 class="name-book-modal">${title}</h3>
            <p class="author-book-modal">${author}</p>
            <p class="abstract-book-modal">${description}</p>
            <ul class="links-tradeplatforms-modal">
              <li class="link-tradeplatform">
              <a href="${buy_links[0].url}" target="_blank">
                  <img src="./images/6-Pop Up/amazon.png" alt="логотип Amazone">
              </a>
              </li>
              <li class="link-tradeplatform">
                <a href="${buy_links[1].url}" target="_blank">
                  <img src="./images/6-Pop Up/book.png" alt="логотип AppleBooks">
                </a>
              </li>
              <li class="link-tradeplatform">
                <a href="${buy_links[4].url}" target="_blank">
                  <img src="./images/6-Pop Up/bookShop.png" alt="логотип BookShop">
                </a>
              </li>
            </ul>
          </div>
        </div>    
                
    <button class="add-remove-btn">Add to shoping list</button>
    <span class="congratulations-modal"
      >Сongratulations! You have added the book to the shopping list. To delete,
      press the button "Remove from the shopping list".</span
    >
              `);
      //no scroll по відкриттю модалки, на закриття треба повішати scroll
      // instance.visible(document.body.style.cssText = `overflow: hidden;`);
      instance.show();
    });       
  }
  // const closeModalBtn = evt.target.closest('btn-modal-close');
  // if (closeModalBtn)
  //   instance.close();
  // else instance.close();

  // console.log(12345);
  // const closeModal = document.instance.element.getElementsByClassName('btn-modal-close');
  // closeModal.addEventListener('click', console.log('click off'));
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

function newTitleName(res) {
  const textElement = res.split(' ');
  const titleCategory = textElement.splice(0, textElement.length - 1).join(' ');
  const spanCategory = textElement[textElement.length - 1];
  newTitle.innerHTML = `${titleCategory} <span class="books">${spanCategory}</span>`;
}

function onClickBtn(evt) {
  const btnItem = evt.target.closest('.see-more-btn');
  if (btnItem) {
    let res = evt.currentTarget.children[0].textContent;
    res = res.trimStart();
    serviceThisCategory(res)
      .then(data => {
        listBook.innerHTML = createBooks(data);
        newTitleName(res);
      })
      .catch(err => console.log(err));
  }
}
const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('btn-up_hiden');
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('btn-up_hiden');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 200 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector('.btn-up').onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    };
  },
};

btnUp.addEventListener();
