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
    return await axios.post("/api/users", data);
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

export interface NewUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}
