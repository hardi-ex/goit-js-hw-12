import axios from 'axios';

export const userParams = {
  query: '',
  currentPage: 1,
  maxPage: 1,
  perPage: 15,
};

export async function searchPhoto() {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const API_KEY = '44013925-160a3698223f11c3c7b6b04f2';

  const url = BASE_URL + END_POINT;

  const params = new URLSearchParams({
    key: API_KEY,
    q: userParams.query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 15,
    page: userParams.currentPage,
    lang: 'en',
  });

  const response = await axios.get(url, { params });
  return response;
}
