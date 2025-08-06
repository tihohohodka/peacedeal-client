import axios from 'axios';

const API = axios.create({
  // Указываем базовый URL нашего бэкенда.
  baseURL: 'http://localhost:5001/api'
});

// Экспортируем функции для каждого типа запроса
export const fetchPromises = (tag, searchTerm) => {
    let url = '/promises';
    const params = new URLSearchParams();
    if (tag) {
        params.append('tag', tag);
    }
    if (searchTerm) {
        params.append('search', searchTerm);
    }

    const queryString = params.toString();
    if (queryString) {
        url += `?${queryString}`;
    }

    return API.get(url);
};
export const postPromises= (data) => {
    let url = '/promises';


    return API.post(url, data).then(response => {
    console.log('Success:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

export const fetchTags = () => API.get('/tags');