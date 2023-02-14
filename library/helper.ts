import { instance } from "@/instance/instance";
import jwtDecode from "jwt-decode";

interface formikObj2 {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  cpassword: string;
}

/***_______  REgister User   ________**/

export async function registerUser(formData: formikObj2) {
  try {
    const {
      data: { msg },
      status,
    } = await instance.post("/api/register", formData);
    if (status === 201) {
      const { email, mobile } = formData;
      const requestBody = {
        mobile,
        email,
        text: msg,
        subject: "Registration of Next3.0",
      };
      await instance.post("/api/mail/registermail", requestBody);
    }
  } catch (err: any) {
    return Promise.reject(err?.message);
  }
}

/***_______  Login User   ________**/

interface loginObj {
  email: string;
  password: string;
}

export async function loginUser(formData: loginObj) {
  try {
    if (!formData) throw new Error("Data not submited from client!");
    const { email, password } = formData;
    const { data, status } = await instance.post("/api/login", {
      email,
      password,
    });
    if (status === 200) return Promise.resolve(data);
  } catch (err: any) {
    // console.log(err);
    return Promise.reject(err?.message);
  }
}

/***_______  Get User token   ________**/

export async function getUserToken() {
  try {
    const token: any = await localStorage.getItem("next3.0");
    if (!token) throw new Error("token not found!");
    const decoded = jwtDecode(token);
    return { decoded, token };
  } catch (err) {
    return Promise.reject("token not found");
  }
}

/***_______  GET USER   ________**/

export async function getUser({ username }: any) {
  try {
    const { data, status } = await instance.get(
      `/api/getUser?userName=${username}`
    );
    if (status !== 200) throw new Error("can't get data!");
    return { data, status };
  } catch (err: any) {
    return Promise.reject(err?.message);
  }
}

interface obj {
  formData: object;
  id: string;
  userName: string;
}
/***_______  PUT UPDDATE USER   ________**/
export async function updateUser({ id, formData, userName }: obj) {
  try {
    const { data, status } = await instance.put(
      `/api/update/${id}?userName=${userName}`,
      formData
    );
    const { user } = data;
    if (status === 200) return Promise.resolve(data);
    throw new Error("server error!");
  } catch (err: any) {
    return Promise.reject(err?.response?.data?.error || "server error!");
  }
}
