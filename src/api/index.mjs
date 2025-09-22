import axios from 'axios';

const API = axios.create({
  // Указываем базовый URL нашего бэкенда.
  baseURL: 'https://peacedeal-back.onrender.com',
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
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

export const deletePromise = (id) => {
    return API.delete(`/promises/${id}`).then(response => {
        console.log('Successfully deleted:', response.data);
        return response;
    })
    .catch(error => {
        console.error('Error deleting promise:', error);
        throw error;
    });
};

export const updatePromise = (id, data) => {
    return API.put(`/promises/${id}`, data).then(response => {
        console.log('Successfully updated:', response.data);
        return response;
    })
    .catch(error => {
        console.error('Error updating promise:', error);
        throw error;
    });
};