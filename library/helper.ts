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
    return Promise.resolve({ data, status });
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

/***_______  Genarate OTP And send OTP to Client Email   ________**/

interface para {
  userEmail: string;
}
export async function gengenerateOTPAndSendEmail({ userEmail }: para) {
  try {
    const {
      data: { OTP },
      status,
    } = await instance.get("/api/otpGenerator");
    if (status === 201) {
      const {
        data: { user },
      } = await getUser({ username: userEmail });

      /***_______     ________**/
      if (!user) throw new Error("error was accure!");
      let text = `Your password recovery OTP is <h2>${OTP}</h2>`;
      /***_______  Send a mail on Client email address    ________**/
      const body = {
        username: user?.username,
        email: user?.email,
        text,
        subject: "Forget Password OTP",
      };

      const { data } = await instance.post("/api/mail/registermail", body);
      return Promise.resolve({ status, OTP, user });
    } else {
      throw new Error("Could not generate OTP!");
    }
  } catch (err: any) {
    console.log(err);
    return Promise.reject(err?.message);
  }
}

/***_______   verify OTP  ________**/

interface verifyOtpPara {
  code: string;
}
export async function verifyOtp({ code }: verifyOtpPara) {
  try {
    if (!code) throw new Error("error was accure!");
    const { data, status } = await instance.get(`/api/verifyOtp?code=${code}`);
    return Promise.resolve({ data, status });
  } catch (err) {
    return Promise.reject(err);
  }
}

/***_______  resetPassword   ________**/

interface resetPara {
  id: string;
  body: object;
}
export async function resetPassword({ id, body }: resetPara) {
  try {
    if (!id) throw new Error("id parametter must need!");
    const { data, status } = await instance.put(
      `/api/update/reset/${id}`,
      body
    );
    if (status === 200) {
      return Promise.resolve("success");
    }
    throw new Error("error was accure!");
  } catch (err: any) {
    return Promise.reject(err);
  }
}
