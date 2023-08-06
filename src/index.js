// Theme toggle
const themeSwitcher = document.getElementById("slider");
const body = document.body;
const header = document.getElementById('header');
const logo = document.getElementById('logo');
const mobileMenuButton = document.querySelector('[data-menu-open]');
const mobileMenuCloseButton = document.querySelector('[data-menu-close]');


function toggleTheme() {
  body.classList.toggle("dark-theme");
  if (body.classList.contains("dark-theme")) {
    localStorage.setItem("theme", "dark");
    setDarkThemeStyles();
  } else {
    localStorage.setItem("theme", "light");
    setLightThemeStyles();
  }
}

function setDarkThemeStyles() {
  header.style.setProperty('--header-bg-color-light', '#111111');
  header.style.setProperty('--header-border-color-light', '#fff');
  // logo.src = "./images/1-Header/logo_dark.svg";
  mobileMenuCloseButton.style.visibility = "visible";
}


function setLightThemeStyles() {
  header.style.setProperty('--header-bg-color-light', '#f9f9f9');
  header.style.setProperty('--header-border-color-light', '#000');
  // logo.src = "./images/1-Header/logo_light.svg";
}


if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-theme");
  themeSwitcher.checked = true;
  setDarkThemeStyles();
} else {
  body.classList.remove("dark-theme");
  themeSwitcher.checked = false;
  setLightThemeStyles();
}

themeSwitcher.addEventListener("change", toggleTheme);


// Modal menu
(() => {
  const refs = {
    openMenuBtn: document.querySelectorAll('[data-menu-open]'),
    closeMenuBtn: document.querySelector('[data-menu-close]'),
    menu: document.querySelector('[data-menu]'),
  };

  refs.openMenuBtn.forEach((el) => {
    el.addEventListener('click', toggleMenu);
  });

  refs.closeMenuBtn.addEventListener('click', toggleMenu);

  function toggleMenu() {
    refs.menu.classList.toggle('is-hidden');
    refs.openMenuBtn.forEach((el) => el.classList.toggle('is-hidden'));
    refs.closeMenuBtn.classList.toggle('is-hidden');
  }
})();
