import ServerRequest from './serverRequest';
import { refs } from './refs';

const TRENDING_LIST = 'trending/movie/week'; // Уточнюючий шлях для запиту
const GENRES_LIST = 'genre/movie/list';
let genre = [];

export const genreAPI = new ServerRequest(TRENDING_LIST); // Ініціалізує екземпляр класу для запитів на АРІ. При ініціалізації потрібно передати детальний шлях який додається до базової урли АРІ (БАЗОВА УРЛА ВЖЕ ПРИСУТНЯ В КЛАСІ!!!!!!), та обєкт конфігурацій

const button = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');

window.addEventListener('click', onClick);

function onClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('dropbtn')) {
    dropdownContent.classList.remove('show');
    return;
  }
  dropdownContent.classList.toggle('show');
  renderGenres();
}

// const genreName = document.querySelector('.genre-name');
dropdownContent.addEventListener('click', onGenre);

function onGenre(event) {
  console.log(event.target.textContent);
}

async function renderGenres() {
  try {
    const genres = await genreAPI.getGenres();
    // console.log(genres);
    const markup = murkupFilterGenres(genres);
    dropdownContent.innerHTML = markup.join('');
  } catch (error) {
    error.message;
  }
}

function murkupFilterGenres(genres) {
  return genres.map(genre => {
    // console.log(genre.name);

    return ` <li class ="genre-name">${genre.name}</li>`;
  });
}

// function onClick(event) {
//   event.preventDefault();

//   dropdownContent.classList.toggle('show');

//   // if (!event.target.classList.contains('dropbtn')) {
//   //   const dropdowns = document.getElementsByClassName('dropdown-content');
//   //   console.log(dropdowns);

//   //   for (let i = 0; i < dropdowns.length; i++) {
//   //     let openDropdown = dropdowns[i];
//   //     console.log(openDropdown);
//   //     if (openDropdown.classList.contains('show')) {
//   //       openDropdown.classList.remove('show');
//   //     }
//   //   }
//   // }
//   renderGenres();
//   console.log(genreName.innerText);
// }
