export function photoTemplate(obj) {
  return `<div class="gallery-item">
  <a href="${obj.largeImageURL}">
    <img src="${obj.webformatURL}" alt="${obj.tags}" loading="lazy"/>
  </a>
  <ul class="block-info">
    <li>
      <p class="title">Likes</p>
      <p class="text">${obj.likes}</p>
    </li>

    <li>
      <p class="title">Views</p>
      <p class="text">${obj.views}</p>
    </li>

    <li>
      <p class="title">Comments</p>
      <p class="text">${obj.comments}</p>
    </li>

    <li>
      <p class="title">Downloads</p>
      <p class="text">${obj.downloads}</p>
    </li>
  </ul>
</div>`;
}

export function photosTemplate(arr) {
  return arr.map(photoTemplate).join('');
}

export function renderPhotos(arr, gallery) {
  const markup = photosTemplate(arr);
  gallery.insertAdjacentHTML('beforeend', markup);
}
