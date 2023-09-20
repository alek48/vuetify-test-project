import axios from "axios";
import store from "@/store/index";

axios.defaults.baseURL = "http://192.168.180.111/";

axios.defaults.headers.post["Access-Control-Allow-Origin"] = "192.168.180.111/";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "192.168.180.111/";
const config = () => ({
  headers: {
    Authorization: "Bearer " + store.state.userToken,
  },
});

export default {
  getUsers: async function () {
    const request = axios.get("/api/users", config());
    request.then((data) => {
      const usersCache = [];
      for (const u of data.data) {
        usersCache.push({ id: u.id, name: u.name });
      }
      store.dispatch("cache/setUsers", usersCache);
    });
    return request;
  },
  getUserById: async function (id: number) {
    return await axios.get("/api/users/" + id, config());
  },
  getTasks: async function () {
    return await axios.get("/api/tasks", config());
  },
  postNewUser: async function (data: NewUser) {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("password", data.password);
    payload.append("phone", data.phone);
    return await axios.post("/api/users", payload, config());
  },
  postNewTask: async function (data: NewTask) {
    const dead_line = data.dead_line_date + " " + data.dead_line_time;
    const payload = {
      task: data.task,
      dead_line: dead_line,
      user_id: Number(data.user_id),
      specialization_id: Number(data.specialization_id),
    };
    return await axios.post("/api/tasks", payload, config());
  },
  postUpdatedTask: async function (data: TaskData) {
    const payload = {
      task: data.task,
      dead_line: data.dead_line,
      user_id: Number(data.user_id),
      specialization_id: Number(data.specialization_id),
    };
    return await axios.put("/api/tasks/" + data.id, payload, config());
  },
  postLogin: async function (data: LoginData) {
    return await axios.post("/api/login", data);
  },
  postRegister: async function (data: RegisterData) {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("password", data.password);
    payload.append("c_password", data.c_password);
    return await axios.post("/api/register", payload, config());
  },
  updateUser: async function (data: NewUser, userId: number) {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    return await axios.put("api/users/" + userId, payload, config());
  },
  deleteUser: async function (userId: number) {
    return await axios.delete("api/users/" + userId, config());
  },
  deleteTaskById: async function (taskId: number) {
    return await axios.delete("api/tasks/" + taskId, config());
  },
  getTasksStats: async function () {
    return await axios.get("api/taskStatus");
  },
  updateTaskStatus: async function (taskId: number) {
    return await axios.put("api/changeStatus/" + taskId, undefined, config());
  },
  getSpecializationsToCache: async function () {
    axios
      .get("api/specializations", config())
      .then((response) => {
        const specCache = [];
        for (const s of response.data) {
          specCache.push({ id: s.id, name: s.name });
        }
        store.dispatch("cache/setSpecs", specCache);
      })
      .catch((e) => console.log(e));
  },
};

export class UserData {
  id = -1;
  name = "";
  email = "";
  email_verified_at: string | null = null;
  created_at = "";
  updated_at = "";
  phone = "";
  status = "";
  admin = "";
  deleted_at = "";
}

export class NewUser {
  name = "";
  email = "";
  phone = "";
  password = "";
}

export interface TaskData {
  id: number;
  user_id: number;
  task: string;
  created_at: string;
  updated_at: string;
  dead_line: string;
  specialization_id: number;
  status: number;
  deleted_at: number;
}
export class NewTask {
  task = "";
  dead_line_date = "";
  dead_line_time = "";
  user_id = "";
  specialization_id = "";
}

export class LoginData {
  email = "";
  password = "";
}

export class RegisterData {
  name = "";
  email = "";
  password = "";
  c_password = "";
}
