// import './scripts.js';

export const fetchResponse = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            } else {
                return response;
            }
        })
        .then(response => response.json());
};