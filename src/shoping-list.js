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

if (localStorage.length > 1) {
  const clearShopList = document.querySelector('.empty-shopping-list-div');
  const bookList = document.querySelector('.shopping-book-list');
  for (const key in localStorage) {
    if (localStorage[key] == 'BOOK')
      servicesSelectedBook(key).then(
        ({ _id, book_image, author, title, description, list_name }) => {
          bookList.insertAdjacentHTML(
            'beforeend',
            `<li class="shoping-book-card">
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
      <button class="shoping-list-btn">
      
    </button>
    </li>`
          );
        }
      );
  }

  clearShopList.style.display = 'none';
} else {
  const clearShopList = document.querySelector('.empty-shopping-list-div');
  clearShopList.style.display = 'block';
}
