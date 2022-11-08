import ServerRequest from './serverRequest';
import { refs } from './refs';
import { markupMovieCards } from './markupMovieCards';

const TRENDING_LIST = 'trending/movie/week'; // Уточнюючий шлях для запиту
const GENRES_LIST = 'genre/movie/list';

export const genreAPI = new ServerRequest(TRENDING_LIST); // Ініціалізує екземпляр класу для запитів на АРІ. При ініціалізації потрібно передати детальний шлях який додається до базової урли АРІ (БАЗОВА УРЛА ВЖЕ ПРИСУТНЯ В КЛАСІ!!!!!!), та обєкт конфігурацій

// const button = document.querySelector('.dropbtn');
// const dropdownContent = document.querySelector('.dropdown-content');
// const dropdown = document.querySelector('.dropdown');

// window.addEventListener('click', onClick);

// function onClick(event) {
//   event.preventDefault();

//   dropdownContent.classList.toggle('show');

//   if (!event.target.classList.contains('dropbtn')) {
//     const dropdowns = document.getElementsByClassName('dropdown-content');
//     console.log(dropdowns);

//     for (let i = 0; i < dropdowns.length; i++) {
//       let openDropdown = dropdowns[i];
//       console.log(openDropdown);
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
//   renderGenres();
//   console.log(event.target.value);
// }

const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');

dropdown.addEventListener('click', onClick);
renderGenres();
function onClick(event) {
  event.preventDefault();
  // const genre = dropdownContent.options[dropdownContent.selectedIndex].text;
  console.log(genre);
}

async function renderGenres() {
  try {
    const genres = await genreAPI.getGenres();
    console.log(genres);
    const markup = murkupFilterGenres(genres);
    dropdownContent.innerHTML = markup.join('');
  } catch (error) {
    error.message;
  }
}

function murkupFilterGenres(genres) {
  return genres.map(genre => {
    console.log(genre.name);
    // return ` <a href="">${genre.name}</a>`;
    return ` <option>${genre.name}</option>`;
  });

  //   dropdownContent.innerHTML = makrupFilterGenre;
}
