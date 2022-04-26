export const custFetchResponse = (url, requestType, data) => { 
    if (requestType === 'GET') {
        return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log('HTTP GET request unsuccessful');
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            } else {
                console.log('HTTP GET request successful');
            }
            return response;
        })
        .then(response => response.json());
    }
    
    if (requestType === 'POST') {
        return fetch(url, {
            method: requestType,
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                console.log('HTTP POST request unsuccessful');
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            } else {
                console.log('HTTP POST request successful');
            }
            return response;
        })
        .then(response => response.json());
    }

    if (requestType === 'DELETE') {
        return fetch(url, {
            method: requestType,
            headers: {
                'Content-Type' : 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                console.log('HTTP DELETE request unsuccessful');
                throw new Error(`status ${response.status} at URL: ${response.url}`);
            } else {
                console.log('HTTP DELETE request successful');
            }
            return response;
        })
    }
}