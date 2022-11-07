import ServerRequest from './serverRequest';
import { refs } from './refs';
import { markupMovieCards } from './markupMovieCards';

const button = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');
const dropdown = document.querySelector('.dropdown');

window.addEventListener('click', onClick);

function onClick(event) {
  dropdownContent.classList.toggle('show');
  if (!event.target.classList.contains('dropbtn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content');
    console.log(dropdowns);

    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      console.log(openDropdown);
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
