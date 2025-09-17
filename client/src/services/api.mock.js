// Mock BE that simulates Users, Lists, Tasks with persistence on localStorage

// ============================
// Axios Error Simulation Class
// ============================
class MockAxiosError extends Error {
  constructor(status, data) {
    super(data?.error || "Mock error");
    this.name = "MockAxiosError";
    this.response = { status, data };
  }
}

// ========================
// Helpers for localStorage
// ========================
const STORAGE_KEYS = {
  USER: "mock_user",
  LISTS: "mock_lists",
  TASKS: "mock_tasks",
};

// --- Utilities ---
const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));
const loadData = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};
const fileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });

// --- Initial state ---
let currentUser = loadData(STORAGE_KEYS.USER, null);
let lists = loadData(STORAGE_KEYS.LISTS, []);
let tasks = loadData(STORAGE_KEYS.TASKS, {});

// ========================
// Users
// ========================

// Registration
export const registration = async (data) => {
  if (currentUser?.email === data.email) {
    throw new MockAxiosError(409, { error: "User already exist." });
  }
  currentUser = { id: Date.now(), ...data, avatar: null };
  saveData(STORAGE_KEYS.USER, currentUser);
  return { token: "mock-jwt-token" };
};

// Login
export const login = async (data) => {
  if (
    !currentUser ||
    currentUser.email !== data.email ||
    currentUser.password !== data.password
  ) {
    throw new MockAxiosError(401, { error: "Invalid credentials." });
  }
  return { token: "mock-jwt-token" };
};

// Logout
export const logout = async () => ({ message: "Logged out" });

// Get user info
export const getUserInfo = async () => {
  if (!currentUser) {
    throw new MockAxiosError(401, { error: "Unauthorized" });
  }
  return currentUser;
};

// Upload avatar
export const uploadAvatar = async (file) => {
  if (!currentUser) throw new MockAxiosError(404, { error: "User not found" });
  currentUser.avatar = await fileToBase64(file);
  saveData(STORAGE_KEYS.USER, currentUser);
  return { message: "Avatar uploaded successfully", path: currentUser.avatar };
};

// Delete avatar
export const deleteAvatar = async () => {
  if (!currentUser) throw new MockAxiosError(404, { error: "User not found" });
  if (!currentUser.avatar)
    throw new MockAxiosError(404, { error: "User has no avatar to delete" });
  currentUser.avatar = null;
  saveData(STORAGE_KEYS.USER, currentUser);
  return { message: "Avatar deleted successfully." };
};

// Delete user
export const deleteUser = async () => {
  if (!currentUser) throw new MockAxiosError(404, { error: "User not found" });
  currentUser = null;
  lists = [];
  tasks = {};
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.LISTS);
  localStorage.removeItem(STORAGE_KEYS.TASKS);
  return { message: "User deleted successfully." };
};

// ========================
// Lists
// ========================

// get all lists
export const getAllLists = async () => {
  return lists.map((l) => ({
    ...l,
    image: l._mockBase64 || l.image || null,
  }));
};

// get single list
export const getList = async (listId) => {
  const list = lists.find((l) => l.listId === String(listId));
  if (!list) throw new MockAxiosError(404, { error: "List not found" });
  return { ...list, image: list._mockBase64 || list.image || null };
};

// create list
export const createList = async (data) => {
  const newList = { listId: String(Date.now()), ...data, image: null };
  lists = [...lists, newList];
  saveData(STORAGE_KEYS.LISTS, lists);
  return { ...newList, image: null };
};

// update list
export const updateList = async (listId, data) => {
  const idx = lists.findIndex((l) => l.listId === String(listId));
  if (idx === -1) throw new MockAxiosError(404, { error: "List not found" });
  lists[idx] = { ...lists[idx], ...data };
  saveData(STORAGE_KEYS.LISTS, lists);
  return {
    ...lists[idx],
    image: lists[idx]._mockBase64 || lists[idx].image || null,
  };
};

// delete list
export const deleteList = async (listId) => {
  const exists = lists.some((l) => l.listId === String(listId));
  if (!exists) throw new MockAxiosError(404, { error: "List not found." });
  lists = lists.filter((l) => l.listId !== String(listId));
  saveData(STORAGE_KEYS.LISTS, lists);
  return { message: "List successfully deleted." };
};

// upload list image
export const uploadListImage = async (listId, file) => {
  const list = lists.find((l) => l.listId === String(listId));
  if (!list) throw new MockAxiosError(404, { error: "List not found" });
  const base64 = await fileToBase64(file);
  if (!base64) throw new MockAxiosError(400, { error: "Invalid file" });
  list._mockBase64 = base64;
  list.image = base64;
  saveData(STORAGE_KEYS.LISTS, lists);
  return { message: "Image uploaded successfully", path: list.image };
};

// delete list image
export const deleteListImage = async (listId) => {
  const list = lists.find((l) => l.listId === String(listId));
  if (!list) throw new MockAxiosError(404, { error: "List not found" });
  if (!list._mockBase64)
    throw new MockAxiosError(400, {
      error: "This list has no image to delete",
    });

  list._mockBase64 = null;
  list.image = null;
  saveData(STORAGE_KEYS.LISTS, lists);

  return { message: "List image deleted successfully" };
};

// ========================
// Tasks
// ========================
export const getAllTasks = async (listId) => {
  return tasks[listId] || [];
};

export const getTask = async (listId, taskId) => {
  const taskList = tasks[listId] || [];

  const task = taskList.find((t) => String(t.taskId) === String(taskId));

  if (!task) throw new MockAxiosError(404, { error: "Task not found" });
  return task;
};

export const createTask = async (listId, data) => {
  if (!tasks) tasks = {};
  if (!tasks[listId]) tasks[listId] = [];
  const newTask = { taskId: String(Date.now()), ...data };
  tasks[listId] = [...tasks[listId], newTask];
  saveData(STORAGE_KEYS.TASKS, tasks);
  return newTask;
};

export const updateTask = async (listId, taskId, data) => {
  const taskList = tasks[listId] || [];
  const idx = taskList.findIndex((t) => t.taskId === String(taskId));
  if (idx === -1) throw new MockAxiosError(404, { error: "Task not found" });
  taskList[idx] = { ...taskList[idx], ...data };
  tasks[listId] = taskList;
  saveData(STORAGE_KEYS.TASKS, tasks);
  return taskList[idx];
};

export const deleteTask = async (listId, taskId) => {
  const taskList = tasks[listId] || [];
  const before = taskList.length;
  tasks[listId] = taskList.filter((t) => String(t.taskId) !== String(taskId));
  saveData(STORAGE_KEYS.TASKS, tasks);

  if (tasks[listId].length === before)
    throw new MockAxiosError(404, { error: "Task not found." });

  return { message: "Task successfully deleted" };
};
