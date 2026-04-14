export const BASE_URL = "https://mern-project-1-delta.vercel.app/api/v1";


export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: token } : {}), 
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.msg || data.error || "An error occurred");
  }

  return data;
};
