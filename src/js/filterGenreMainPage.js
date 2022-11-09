//

// ------не копироватть-------------------

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
// -------------------------------------------------------------------

// import ServerRequest from './serverRequest';
// import { refs } from './refs';
// import axios from 'axios';
// import { KEY } from './constants';

// const BASE_URL = 'https://api.themoviedb.org/3/';
// const TRENDING_LIST = 'trending/movie/week'; // Уточнюючий шлях для запиту
// const GENRES_LIST = 'genre/movie/list';
// // let genre = [];

// export const genreAPI = new ServerRequest(TRENDING_LIST); // Ініціалізує екземпляр класу для запитів на АРІ. При ініціалізації потрібно передати детальний шлях який додається до базової урли АРІ (БАЗОВА УРЛА ВЖЕ ПРИСУТНЯ В КЛАСІ!!!!!!), та обєкт конфігурацій

// const button = document.querySelector('.dropbtn');
// const dropdownContent = document.querySelector('.dropdown-content');
// const dropdown = document.querySelector('.dropdown');

// window.addEventListener('click', onClick);

// function onClick(event) {
//   event.preventDefault();

//   if (!event.target.classList.contains('dropbtn')) {
//     dropdownContent.classList.remove('show');
//     return;
//   }
//   dropdownContent.classList.toggle('show');
//   renderGenres();
// }

// dropdownContent.addEventListener('click', onGenre);

// function onGenre(event) {
//   const genre = event.target.textContent;
//   console.log(genre);
//   searchGenres(genre);
// }

// async function searchGenres(genre) {
//   const params = {
//     movie_genre: genre,
//     // language: 'en-US',
//     api_key: KEY,
//   };
//   const url = `BASE_URL${params.movie_genre}/movie/list?api_key=${params.api_key}&language=en-US`; // Тут додає ться базова урла і більш детальний шлях
//   const response = await axios.get(url); // Запит на АРІ за жанрами
//   const genreMovie = response.data.genres;
//   console.log(genreMovie);
//   return genreMovie; // Повертає проміс із жанрами
// }

// async function renderGenres() {
//   try {
//     const genres = await genreAPI.getGenres();
//     // console.log(genres);
//     const markup = murkupFilterGenres(genres);
//     dropdownContent.innerHTML = markup.join('');
//   } catch (error) {
//     error.message;
//   }
// }

// function murkupFilterGenres(genres) {
//   return genres.map(genre => {
//     // console.log(genre.name);

//     return ` <li class ="genre-name">${genre.name}</li>`;
//   });
// }

// --------------------------------версия 3-------------------------------------

import ServerRequest from './serverRequest';
import { refs } from './refs';
import axios from 'axios';
import { KEY } from './constants';

const BASE_URL = 'https://api.themoviedb.org/3/';
const TRENDING_LIST = 'trending/movie/week'; // Уточнюючий шлях для запиту
const GENRES_LIST = 'genre/movie/list';
// let genre = [];

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

dropdownContent.addEventListener('click', onGenre);

function onGenre(event) {
  // const genre = event.target.textContent;
  // console.log(genre);
  const target = event.target;
  const genreEl = target.closest('.genre-name');
  console.log(genreEl);
  if (!genreEl) {
    return;
  }
  const genreId = genreEl.dataset.movieid;

  searchGenres(genreId);
}

async function searchGenres(genreId) {
  const params = {
    // movie_genre: genre,
    // language: 'en-US',
    api_key: KEY,
    movie_id: genreId,
  };
  const url =
    BASE_URL +
    `discover/movie?api_key=${params.api_key}&language=en-US&sort_by=popularity.desc&with_genre=${params.movie_id}`; // Тут додає ться базова урла і більш детальний шлях
  const response = await axios.get(url);
  console.log(response);
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
    // console.log(genre.name, genre.id);

    return ` <li class ="genre-name" data-movieid="${genre.id}" >${genre.name}</li>`;
  });
}
