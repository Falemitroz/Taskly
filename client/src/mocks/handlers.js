import { http, HttpResponse } from "msw";

// ===== Helpers per localStorage =====
const getUsers = () => JSON.parse(localStorage.getItem("mockUsers") || "[]");
const saveUsers = (users) =>
  localStorage.setItem("mockUsers", JSON.stringify(users));

const getCurrentUserId = () =>
  JSON.parse(localStorage.getItem("mockCurrentUser"));
const setCurrentUserId = (id) =>
  localStorage.setItem("mockCurrentUser", JSON.stringify(id));

const getLists = () => JSON.parse(localStorage.getItem("mockLists") || "{}");
const saveLists = (lists) =>
  localStorage.setItem("mockLists", JSON.stringify(lists));

const getTasks = () => JSON.parse(localStorage.getItem("mockTasks") || "{}");
const saveTasks = (tasks) =>
  localStorage.setItem("mockTasks", JSON.stringify(tasks));

const getUserAvatars = (userId) =>
  JSON.parse(localStorage.getItem(`user-${userId}-avatars`) || "[]");
const saveUserAvatars = (avatar) => {
  let user = JSON.parse(localStorage.getItem("mockUser"));
  user.avatar = avatar;

  localStorage.setItem(`mockUser`, JSON.stringify(user));
};

// ===== Handlers =====
export const handlers = [
  // ===== Users =====
  http.post(`/users/register`, async ({ request }) => {
    const body = await request.json();
    const users = getUsers();

    if (users.find((u) => u.username === body.username)) {
      return HttpResponse.json(
        { error: "Username già esistente" },
        { status: 400 }
      );
    }

    // crea nuovo utente
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 0,
      ...body,
      avatar: "",
    };
    users.push(newUser);
    saveUsers(users);

    // inizializza liste e tasks per il nuovo utente
    const lists = getLists();
    const tasks = getTasks();
    lists[newUser.id] = [];
    tasks[newUser.id] = {};
    saveLists(lists);
    saveTasks(tasks);

    // **login automatico**
    setCurrentUserId(newUser.id);

    return HttpResponse.json(
      { token: "fake-jwt-token", user: newUser },
      { status: 201 }
    );
  }),

  http.post(`/users/login`, async ({ request }) => {
    const { username, password } = await request.json();
    const users = getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user)
      return HttpResponse.json({ error: "User not found." }, { status: 401 });

    setCurrentUserId(user.id);
    return HttpResponse.json(
      { token: "fake-jwt-token", user },
      { status: 200 }
    );
  }),

  http.get(`/users/me`, async () => {
    const users = getUsers();
    const userId = getCurrentUserId();
    const user = users.find((u) => u.id === userId) || null;

    if (user) {
      // Recupera avatar persistente
      user.avatar = getUserAvatars(userId);
    }

    return HttpResponse.json(user, { status: 200 });
  }),

  http.post(`/users/logout`, async () => {
    localStorage.clear(); // reset completo dello stato
    return HttpResponse.json({ message: "Logged out" }, { status: 200 });
  }),

  http.delete(`/users/me`, async () => {
    const userId = getCurrentUserId();
    let users = getUsers();
    users = users.filter((u) => u.id !== userId);
    saveUsers(users);

    const lists = getLists();
    delete lists[userId];
    saveLists(lists);

    const tasks = getTasks();
    delete tasks[userId];
    saveTasks(tasks);

    localStorage.removeItem("mockCurrentUser");
    // localStorage.removeItem(`user-${userId}-avatars`);

    return HttpResponse.json({ message: "User deleted" }, { status: 200 });
  }),

  // ===== Avatar =====
  http.post(`/users/avatar`, async ({ request }) => {
    const users = getUsers();
    const userId = getCurrentUserId();
    const user = users.find((u) => u.id === userId);
    if (!user) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get("avatar");

    if (!file) {
      return HttpResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Converti file in base64
    const reader = new FileReader();
    const base64 = await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // Salva array di avatar per utente
    const avatar = getUserAvatars(userId);
    // avatar.push(base64);
    saveUserAvatars(avatar);

    // Risposta compatibile con il hook
    return HttpResponse.json(
      {
        path: base64,
        avatar,
        lastAvatar: base64,
      },
      { status: 200 }
    );
  }),

  http.delete(`/users/avatar`, async () => {
    const userId = getCurrentUserId();
    if (userId) saveUserAvatars(userId, []);
    return HttpResponse.json({ message: "Avatar deleted" }, { status: 200 });
  }),

  // ===== Lists =====
  http.get(`/users/lists`, async () => {
    const userId = getCurrentUserId();
    const lists = getLists();
    return HttpResponse.json(lists[userId] || [], { status: 200 });
  }),

  http.post(`/users/lists`, async ({ request }) => {
    const body = await request.json();
    const userId = getCurrentUserId();
    const lists = getLists();
    const userLists = lists[userId] || [];

    const newId = userLists.length
      ? Math.max(...userLists.map((l) => l.id)) + 1
      : 0;

    const newList = { id: newId, name: body.name, userId };

    userLists.push(newList);

    lists[userId] = userLists;
    saveLists(lists);

    const tasks = getTasks();
    if (!tasks[userId]) tasks[userId] = {};
    tasks[userId][newId] = [];
    saveTasks(tasks);

    return HttpResponse.json(newList, { status: 201 });
  }),

  http.get(`/users/lists/:id`, async ({ params }) => {
    const userId = getCurrentUserId();
    const lists = getLists();
    const list = (lists[userId] || []).find((l) => l.id === Number(params.id));
    return list
      ? HttpResponse.json(list, { status: 200 })
      : HttpResponse.json({ error: "List not found" }, { status: 404 });
  }),

  http.patch(`/users/lists/:id`, async ({ request, params }) => {
    const body = await request.json();
    const userId = getCurrentUserId();
    const lists = getLists();
    const list = (lists[userId] || []).find((l) => l.id === Number(params.id));
    if (!list)
      return HttpResponse.json({ error: "List not found" }, { status: 404 });
    Object.assign(list, body);
    saveLists(lists);
    return HttpResponse.json(list, { status: 200 });
  }),

  http.delete(`/users/lists/:id`, async ({ params }) => {
    const userId = getCurrentUserId();
    const lists = getLists();
    lists[userId] = (lists[userId] || []).filter(
      (l) => l.id !== Number(params.id)
    );
    saveLists(lists);

    const tasks = getTasks();
    if (tasks[userId]) delete tasks[userId][params.id];
    saveTasks(tasks);

    return HttpResponse.json({ message: "List deleted" }, { status: 200 });
  }),

  http.post(`/users/lists/:id/image`, async ({ params }) => {
    return HttpResponse.json(
      { message: `Image uploaded for list ${params.id}` },
      { status: 200 }
    );
  }),

  http.delete(`/users/lists/:id/image`, async ({ params }) => {
    return HttpResponse.json(
      { message: `Image deleted for list ${params.id}` },
      { status: 200 }
    );
  }),

  // ===== Tasks =====
  http.get(`/users/lists/:listId/tasks`, async ({ params }) => {
    const userId = getCurrentUserId();
    const tasks = getTasks();
    return HttpResponse.json(tasks[userId]?.[params.listId] || [], {
      status: 200,
    });
  }),

  http.post(`/users/lists/:listId/tasks`, async ({ request, params }) => {
    const body = await request.json();
    const userId = getCurrentUserId();
    const listId = params.listId;

    const tasks = getTasks();
    if (!tasks[userId]) tasks[userId] = {};
    if (!tasks[userId][listId]) tasks[userId][listId] = [];

    const newId = tasks[userId][listId].length
      ? Math.max(...tasks[userId][listId].map((t) => t.id)) + 1
      : 0;

    const newTask = { id: newId, ...body };
    tasks[userId][listId].push(newTask);
    saveTasks(tasks);

    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.get(`/users/lists/:listId/tasks/:taskId`, async ({ params }) => {
    const userId = getCurrentUserId();
    const task = (getTasks()[userId]?.[params.listId] || []).find(
      (t) => t.id === Number(params.taskId)
    );
    return task
      ? HttpResponse.json(task, { status: 200 })
      : HttpResponse.json({ error: "Task not found" }, { status: 404 });
  }),

  http.patch(
    `/users/lists/:listId/tasks/:taskId`,
    async ({ request, params }) => {
      const body = await request.json();
      const userId = getCurrentUserId();
      const tasks = getTasks();
      const task = tasks[userId]?.[params.listId]?.find(
        (t) => t.id === Number(params.taskId)
      );
      if (!task)
        return HttpResponse.json({ error: "Task not found" }, { status: 404 });
      Object.assign(task, body);
      saveTasks(tasks);
      return HttpResponse.json(task, { status: 200 });
    }
  ),

  http.delete(`/users/lists/:listId/tasks/:taskId`, async ({ params }) => {
    const userId = getCurrentUserId();
    const tasks = getTasks();
    tasks[userId][params.listId] = (tasks[userId][params.listId] || []).filter(
      (t) => t.id !== Number(params.taskId)
    );
    saveTasks(tasks);
    return HttpResponse.json({ message: "Task deleted" }, { status: 200 });
  }),
];
