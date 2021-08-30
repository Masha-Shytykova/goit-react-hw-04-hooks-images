const API_KEY = '22954093-157d8252386abbab9843eb1e8';

export const getImagesAPI = ({ nextQuery, page }) => {
  return fetch(
    `https://pixabay.com/api/?q=${nextQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(r => {
    if (r.ok) {
      return r.json();
    }
    return Promise.reject(
      new Error(`по запросу ${nextQuery} ничего не найдено`),
    );
  });
};
