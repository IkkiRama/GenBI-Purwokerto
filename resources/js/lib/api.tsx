const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const request = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    Accept: "application/json",
    ...(options.headers || {}),
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw {
      status: response.status,
      data,
    };
  }

    if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

  return data;
};

const api = {
  get: (url) => request(url, { method: "GET" }),

  post: (url, body) =>
    request(url, {
      method: "POST",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  put: (url, body) =>
    request(url, {
      method: "PUT",
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),

  delete: (url) =>
    request(url, {
      method: "DELETE",
    }),
};

export default api;
