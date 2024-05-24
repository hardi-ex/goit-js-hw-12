import {
  photoTemplate,
  photosTemplate,
  renderPhotos,
} from './js/render-functions';

import { searchPhoto } from './js/pixabay-api';

import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from './img/error.svg';

import { userParams } from './js/pixabay-api';

const lightbox = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
});

const galleryEl = document.querySelector('.js-gallery');
const formEl = document.querySelector('.js-form');
const btnLoadEl = document.querySelector('.js-load-btn');
const loaderEl = document.querySelector('.js-loader');

formEl.addEventListener('submit', async evt => {
  evt.preventDefault();
  hideLoadMoreBtn();

  galleryEl.innerHTML = '';
  userParams.query = evt.target.elements.query.value.trim();
  userParams.currentPage = 1;

  if (!userParams.query) {
    warningAlert('Please enter a search term.');
    return;
  }

  loader.show();

  try {
    const photos = await searchPhoto(userParams.query);
    renderPhotos(photos.data.hits, galleryEl);
    lightbox.refresh();

    userParams.maxPage = Math.ceil(photos.data.totalHits / userParams.perPage);
    // userParams.maxPage = 3;

    if (photos.data.hits.length === 0) {
      warningAlert(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      evt.target.reset();
      loader.hide();
      return;
    }
  } catch (error) {
    warningAlert('Server error');
  }

  loader.hide();

  updateBtnStatus();
  evt.target.reset();
});

btnLoadEl.addEventListener('click', async () => {
  hideLoadMoreBtn();
  userParams.currentPage += 1;

  loader.show();

  try {
    const photos = await searchPhoto(userParams.query);
    renderPhotos(photos.data.hits, galleryEl);
    lightbox.refresh();
  } catch (error) {
    warningAlert('Server error');
  }

  loader.hide();
  updateBtnStatus();
  scrollPage();
});

// Functions

function hideLoadMoreBtn() {
  btnLoadEl.classList.add('hidden');
}

function showLoadMoreBtn() {
  btnLoadEl.classList.remove('hidden');
}

function updateBtnStatus() {
  if (userParams.currentPage >= userParams.maxPage) {
    hideLoadMoreBtn();
    messageAlert(`You've reached the end of search results.`);
  } else {
    showLoadMoreBtn();
  }
}

function scrollPage() {
  const divElem = galleryEl.firstElementChild;
  const height = divElem.getBoundingClientRect().height;

  window.scrollBy({
    top: height * 4,
    behavior: 'smooth',
  });
}

const loader = {
  hide() {
    loaderEl.classList.add('hidden');
  },
  show() {
    loaderEl.classList.remove('hidden');
  },
};

function warningAlert(message) {
  iziToast.warning({
    title: 'Warning',
    titleColor: '#FAFAFB',
    message: message,
    messageColor: '#FAFAFB',
    color: '#EF4040',
    position: 'topRight',
    timeout: 5000,
    iconUrl: iconError,
  });
}

function messageAlert(message) {
  iziToast.info({
    message: message,
    messageColor: 'black',
    color: 'yellow',
    position: 'topRight',
    timeout: 5000,
  });
}
