!function(){if(localStorage.length>1){var o=document.querySelector(".empty-shopping-list-div"),n=document.querySelector(".shopping-book-list");for(var t in localStorage)"BOOK"==localStorage[t]&&(c=t,fetch("https://books-backend.p.goit.global/books/".concat(c)).then((function(o){if(!o.ok)throw new Error(o.statusText);return o.json()}))).then((function(o){var t=o._id,c=o.book_image,i=o.author,a=o.title,e=o.description,s=o.list_name;console.log(t),n.insertAdjacentHTML("beforeend",'<li class="shoping-book-card">\n      <div class="shoping-book-card-img">\n        <img src="'.concat(c,'" alt="').concat(t,'"width="335" height="485">\n      </div>\n      <div class="shoping-book-card-text">\n        <div class="shoping-book-card-title_and_ganre">\n            <h3 class="shoping-book-card-title">').concat(a,'</h3>\n            <h4 class="shoping-book-card-ganre">').concat(s,'</h4>\n            <p class="shoping-book-card-description">').concat(e,'</p>\n        </div>\n        <h4 class="shoping-book-card-author">').concat(i,"</h4>\n      </div>\n    </li>"))}));o.style.display="none"}else{document.querySelector(".empty-shopping-list-div").style.display="block"}var c}();
//# sourceMappingURL=shoping-list.a0b5ace8.js.map