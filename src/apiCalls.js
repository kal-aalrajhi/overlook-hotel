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

const custFetch = (url, requestType, data) => { // data is optional param, it's just for POST and PUT requests
    fetch(url, {
        method: "POST",
        headers: {
            "Content-type" : "application/json",
        },
        body: JSON.stringify({name: "Kal"}),
    })
    .then(response => {
        if (!response.ok) {
            console.log("HTTP request unsuccessful");
            throw new Error(`status ${response.status} at URL: ${response.url}`);
        } else {
            console.log("HTTP request successful");
        }
        return response;
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}


// fetch(url, {
//     method: "POST",
//     headers: {
//         "Content-type" : "application/json",
//     },
//     body: JSON.stringify({name: "Kal"}),
// })
// .then(response => {
//     if (!response.ok) {
//         console.log("HTTP request unsuccessful");
//         throw new Error(`status ${response.status} at URL: ${response.url}`);
//     } else {
//         console.log("HTTP request successful");
//     }
//     return response;
// })
// .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.log(error));

