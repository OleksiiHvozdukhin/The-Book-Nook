
function handlerClickBook(evt) {
  const bookItem = evt.target.closest('.js-book-item');
  console.dir(evt.target);
  if (bookItem) {
    const { id } = bookItem.dataset;
    servicesSelectedBook(id).then(({ book_image, title, author, description, buy_links }) => {
      const instance = basicLightbox.create(`<img class="cover-book" src="${book_image}" alt="обкладинка книжки">     
          <div class="description-book">
            <h3 class="name-book">${title}</h3>
             <p class="author-book">${author}</p>
             <p class="abstract-book">${description}</p>
             <ul class="links-tradeplatforms">
               <li class="link-item">
                 <a href="${buy_links[0].url}">
                   <img src="./images/6-Pop Up/amazon@1x.png" alt="логотип Amazone">
                 </a>            
               </li>
               <li class="link-item">
                <a href="${buy_links[1].url}">
                  <img src="./images/6-Pop Up/book.png" alt="логотип AppleBooks">
                </a>
              </li>
              <li class="link-item">
                <a href="${buy_links[4].url}">
                  <img src="./images/6-Pop Up/bookShop@1x.png" alt="логотип BookShop">
                </a>
              </li>
            </ul>
          </div>`);
      instance.show();
    });
  }
}













// const refs = {
//   openModal: document.querySelector('[data-modal-open]'),
//   closeModal: document.querySelector('[data-modal-close]'),
//   modal: document.querySelector('[data-modal]'),
//   selectedBook: document.querySelector('selected-book'),  
// };

// refs.openModal.addEventListener('click', toggleModalOpen);
// refs.closeModal.addEventListener('click', toggleModalClose);

// //запит на книжку в бекенда

// function toggleModalOpen() {
//   refs.modal.classList.toggle('is-hidden');
//   document.body.classList.toggle('no-scroll');

//   // refs.backdropClick.addEventListener('click', toggleModalClose);

//   const ID = refs.openModal.getAttribute('id');
//   const APIURL = `https://books-backend.p.goit.global/books/${ID}`;

//   fetch(APIURL)
//     .then(response => {
//       // Перевіряємо, чи запит успішний (status код 200-299 вважається успішним)
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       // Парсимо JSON з відповіді
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);      
//       refs.selectedBook.innerHTML = createBookMarkup(data);
//       console.log(data);
//     })
//     .catch(error => {
//       // console.error('Error:', error);
//     });
// }

// function createBookMarkup(arr) {
//     return arr
//       .map(
//         ({ book_image, title, author, description, buy_links }) => `
//       <img class="cover-book" src="${book_image}" alt="обкладинка книжки">     
//           <div class="description-book">
//             <h3 class="name-book">${title}</h3>
//             <p class="author-book">${author}</p>
//             <p class="abstract-book">${description}</p>
//             // <ul class="links-tradeplatforms">
//             //   <li class="link-item">
//             //     <a href="${buy_links[0].url}">
//             //       <img src="./images/6-Pop Up/amazon@1x.png" alt="логотип Amazone">
//             //     </a>            
//             //   </li>
//             //   <li class="link-item">
//             //     <a href="${buy_links[1].url}">
//             //       <img src="./images/6-Pop Up/book.png" alt="логотип AppleBooks">
//             //     </a>
//             //   </li>
//             //   <li class="link-item">
//             //     <a href="${buy_links[4].url}">
//             //       <img src="./images/6-Pop Up/bookShop@1x.png" alt="логотип BookShop">
//             //     </a>
//             //   </li>
//             // </ul>
//           </div>
//       `).join('');
// }

// /*-----------------!!!!!!!!!!!!!!!!*/

// function toggleModalClose() {
//   refs.modal.classList.toggle('is-hidden');
//   document.body.classList.toggle('no-scroll');
// }
