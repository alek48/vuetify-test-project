import axios from "axios";

axios.defaults.baseURL = "http://192.168.180.111/";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export default {
  getUsersPage: async function (page: number) {
    return await axios.get("/api/users?page=" + page);
  },
  getTasks: async function () {
    return await axios.get("/api/tasks");
  },
  postNewUser: async function (data: NewUser) {
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("email", data.email);
    payload.append("password", data.password);
    payload.append("phone", data.phone);
    return await axios.post("/api/users", payload);
  },
  postNewTask: async function (data: NewTask) {
    const dead_line = data.dead_line_date + " " + data.dead_line_time;
    const payload = {
      task: data.task,
      dead_line: dead_line,
      user_id: Number(data.user_id),
      specialization_id: Number(data.specialization_id),
    };
    console.log(payload);
    return await axios.post("/api/tasks", payload);
  },
};

export interface UserData {
  name: string;
  email: string;
  email_verified_at: [string | null];
  created_at: string;
  updated_at: string;
  phone: string;
  status: string;
  admin: string;
  deleted_at: string;
}

export class NewUser {
  name = "";
  email = "";
  phone = "";
  password = "";
}

export interface TaskData {
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
