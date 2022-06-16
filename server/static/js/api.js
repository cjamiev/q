const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const api = {
  post: (url, payload, options = {}) => {
    return fetch(url, {
      headers: options.headers || HEADERS,
      body: JSON.stringify(payload),
      method: 'POST',
      crossDomain: options.crossDomain || false
    })
      .then((resp) => {
        return options.sendFullResponse ? { response: resp, promise: resp.json() } : resp.json();
      })
      .catch((error) => console.error('error:', error));
  },
  get: (url, options = {}) => {
    return fetch(url, {
      headers: options.headers || HEADERS,
      method: 'GET',
      crossDomain: options.crossDomain || false
    })
      .then((resp) => {
        return options.sendFullResponse ? { response: resp, promise: resp.json() } : resp.json();
      })
      .catch((error) => console.error('error:', error));
  }
};