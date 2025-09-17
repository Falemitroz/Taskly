import axios from "axios";

const baseURL =
  process.env.REACT_APP_USE_MOCK === "true"
    ? "/users"
    : process.env.REACT_APP_ENV === "mobile"
    ? process.env.REACT_APP_API_URL_MOBILE
    : process.env.REACT_APP_API_URL_LOCAL;

const api = axios.create({
  baseURL: `${baseURL}/users`,
  withCredentials: process.env.REACT_APP_USE_MOCK !== "true",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

// ========================
// Users
// ========================
export const registration = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

export const login = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

export const logout = async () => {
  return await api.post("/logout");
};

export const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.post(`/avatar`, formData);
  return res.data;
};

export const deleteAvatar = async () => {
  return await api.delete("/avatar");
};

export const getUserInfo = async () => {
  const res = await api.get("/me");
  return res.data;
};

export const deleteUser = async () => {
  return await api.delete("/me");
};

// ========================
// Lists
// ========================
export const createList = async (data) => {
  const res = await api.post(`/lists`, data);
  return res.data;
};

export const getAllLists = async () => {
  const res = await api.get(`/lists`);
  return res.data;
};

export const getList = async (id) => {
  const res = await api.get(`/lists/${id}`);
  return res.data;
};

export const updateList = async (id, data) => {
  const res = await api.patch(`/lists/${id}`, { name: data.name });
  return res;
};

export const deleteList = async (id) => {
  const res = await api.delete(`/lists/${id}`);
  return res;
};

export const uploadListImage = async (listId, file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await api.post(`/lists/${listId}/image`, formData);
  return res.data;
};

export const deleteListImage = async (listId) => {
  const res = await api.delete(`/lists/${listId}/image`);
  return res.data;
};

// ========================
// Tasks
// ========================
export const createTask = async (listId, data) => {
  const res = await api.post(`/lists/${listId}/tasks`, data);
  return res.data;
};

export const getAllTasks = async (listId) => {
  const res = await api.get(`/lists/${listId}/tasks`);
  return res.data;
};

export const getTask = async (listId, taskId) => {
  const res = await api.get(`/lists/${listId}/tasks/${taskId}`);
  return res.data;
};

export const updateTask = async (listId, taskId, data) => {
  const res = await api.patch(`/lists/${listId}/tasks/${taskId}`, data);
  return res.data;
};

export const deleteTask = async (listId, taskId) => {
  const res = await api.delete(`/lists/${listId}/tasks/${taskId}`);
  return res;
};

export default api;
