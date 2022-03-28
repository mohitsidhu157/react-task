const API_URL = "http://localhost:8000";

const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const getRequest = (apiRoute, token = "") => {
  return new Promise((resolve, reject) => {
    try {
      fetch(API_URL + apiRoute, {
        method: "GET",
        headers: {
          ...defaultHeaders,
          access_token: token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const postRequest = (apiRoute, body = {}, token = "") => {
  return new Promise((resolve, reject) => {
    try {
      fetch(API_URL + apiRoute, {
        method: "POST",
        headers: {
          ...defaultHeaders,
          access_token: token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const putRequest = (apiRoute, body = {}, token = "") => {
  return new Promise((resolve, reject) => {
    try {
      fetch(API_URL + apiRoute, {
        method: "PUT",
        headers: {
          ...defaultHeaders,
          Authorization: token,
        },
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};

export const deleteRequest = (apiRoute, token = "") => {
  return new Promise((resolve, reject) => {
    try {
      fetch(API_URL + apiRoute, {
        method: "DELETE",
        headers: {
          ...defaultHeaders,
          access_token: token,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (err) {
      reject(err);
    }
  });
};
