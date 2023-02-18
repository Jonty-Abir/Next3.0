import Layout from "@/layout/layout";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff, HiOutlineMail } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { loginUser } from "../library/helper";
import { formikValidateHandlerLogin } from "../library/validate";
import { setToken, setUserDetails } from "../redux/Sclice/reducer";

/***_______   Reducer Funtion  ________**/
// const reducer = (
//   state: object,
//   action: React.ChangeEvent<HTMLInputElement>
// ): object => {
//   return {
//     ...state,
//     [action.target.name]: action.target.value,
//   };
// };

interface formikObj {
  email: string;
  password: string;
}

const initialValues: formikObj = {
  email: "",
  password: "",
};

function Login(): ReactElement {
  const [showPw, setShowPw] = useState(false);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  // const [formData, disPatch] = useReducer(reducer, {});
  /***_______  FORM HANDLE WITH FORMIK   ________**/

  const formik = useFormik({
    initialValues,
    validate: formikValidateHandlerLogin,
    onSubmit: async (value) => {
      setLoading(true);
      const loginPromise = loginUser(value);
      toast.promise(loginPromise, {
        success: "Successfully Login.",
        loading: "Submiting...",
        error: "Could not loging try again!",
      });
      loginPromise
        .then((data) => {
          const { token } = data;
          // decoded the token
          const docoded: any = jwtDecode(token);
          /***_______   store data in app store  ________**/

          dispatch(setToken(token));
          dispatch(
            setUserDetails({ id: docoded?.userId, username: docoded?.username })
          );
          /***_______  Store token in local storage   ________**/
          localStorage.setItem("next3.0", token);
          Cookies.set("next3.0", token);
          setLoading(false);
          router.push("/");
        })
        .catch((err: any) => {
          setLoading(false);
        });
    },
  });
  /***_______   Google signIn handler  ________**/
  async function googleSingin() {
    signIn("google", {
      callbackUrl: "https://authentication-with-next-auth.vercel.app",
    });
  }
  /***_______  gitHubSignInHandler   ________**/
  const gitHubSignInHandler = () => {
    signIn("github", {
      callbackUrl: "https://authentication-with-next-auth.vercel.app",
    });
  };
  // /***_______  gitHubSignInHandler   ________**/
  const faceBookSignInHandler = () => {
    signIn("facebook", {
      callbackUrl: "https://authentication-with-next-auth.vercel.app",
    });
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Login Page</title>
        </Head>
        <Toaster />
        <section className="p-4 my-10 flex flex-col mx-auto gap-4">
          <h2 className="font-semibold text-3xl font-serif text-gray-700 uppercase">
            Sign In
          </h2>
          <form
            className="flex flex-col mx-auto w-3/4 pt-4 gap-2"
            onSubmit={formik.handleSubmit}
          >
            {/* EMAIL */}

            <div className="flex flex-col">
              <div
                className={`input_container  ${
                  formik?.errors?.email && formik.touched.email
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}
                />
                <span>
                  <HiOutlineMail
                    className="text-gray-400 hover:text-indigo-700"
                    size={18}
                  />
                </span>
              </div>
              <p className="text-rose-400 font-semibold text-xs text-left">
                {formik?.errors?.email && formik.touched.email
                  ? formik.errors.email
                  : ""}
              </p>
            </div>
            {/* Password */}
            <div className="flex flex-col">
              <div
                className={`input_container  ${
                  formik?.errors?.password && formik.touched.password
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <input
                  className="input"
                  type={showPw ? "text" : "password"}
                  placeholder="Password"
                  {...formik.getFieldProps("password")}
                />
                <span>
                  {showPw ? (
                    <HiOutlineEyeOff
                      className="text-gray-400 hover:text-indigo-700"
                      onClick={() => setShowPw(!showPw)}
                      size={18}
                    />
                  ) : (
                    <HiOutlineEye
                      className="text-gray-400 hover:text-indigo-700"
                      onClick={() => setShowPw(!showPw)}
                      size={18}
                    />
                  )}
                </span>
              </div>
              <p className="text-rose-400 font-semibold text-xs text-left">
                {formik?.errors?.password && formik.touched.password
                  ? formik.errors.password
                  : ""}
              </p>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 rounded-md py-2 p-2 hover:ring-2 hover:ring-green-800 focus:scale-95
               duration-200 text-gray-50 font-semibold"
            >
              {loading ? "Wait..." : "Login"}
            </button>
          </form>
          <Link href={"/recovery"}>
            <p className="font-serif font-semibold text-rose-500 cursor-pointer">
              Forget Password
            </p>
          </Link>
          {/* Scocial Icone */}
          <div className="flex flex-col gap-1">
            <p className="text-gray-700 capitalize font-bold ">Signin with</p>
            {/* Gooogle */}
            <div
              className=" flex mx-auto border-2 items-center gap-2 px-3 py-1 rounded-md cursor-pointer"
              onClick={googleSingin}
            >
              <p className="text-md font-semibold text-gray-600">Google</p>
              <span>
                <Image
                  src={"/assets/google.svg"}
                  width={20}
                  height={20}
                  alt="scocil_icone"
                ></Image>
              </span>
            </div>
            {/* Git Hub */}
            <div
              className=" flex mx-auto border-2 items-center gap-2 px-3 py-1 rounded-md cursor-pointer"
              onClick={gitHubSignInHandler}
            >
              <p className="text-md font-semibold text-gray-600">Git Hub</p>
              <span>
                <Image
                  src={"/assets/github.svg"}
                  width={20}
                  height={20}
                  alt="scocil_icone"
                ></Image>
              </span>
            </div>
            {/* FaceBook */}
            <div
              className=" flex mx-auto border-2 items-center gap-2 px-3 py-1 rounded-md cursor-pointer"
              onClick={faceBookSignInHandler}
            >
              <p className="text-md font-semibold text-gray-600">Facebook</p>
              <span>
                <Image
                  src={"/assets/facebook.svg"}
                  width={30}
                  height={30}
                  alt="scocil_icone"
                ></Image>
              </span>
            </div>
          </div>
          {/* Buttom */}
          <div>
            <code className="text-gray-500 text-lg">
              Don{"'"}t have account{" "}
              <span className="text-rose-500">
                <Link
                  href={"/register"}
                  className="font-popins font-semibold underline text-md"
                >
                  register
                </Link>
              </span>
            </code>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Login;
