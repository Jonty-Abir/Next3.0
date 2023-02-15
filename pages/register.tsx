import Layout from "@/layout/layout";
import { useFormik } from "formik";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { registerUser } from "../library/helper";
import { formikValidateHandlerRegiseter } from "../library/validate";

import {
  HiDeviceMobile,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiUser,
} from "react-icons/hi";

/***_______  Reducer funtion   ________**/

// const reducer = (
//   state: object,
//   action: React.ChangeEvent<HTMLInputElement>
// ) => {
//   return {
//     ...state,
//     [action?.target.name]: action.target.value,
//   };
// };

interface formikObj {
  firstname: string;
  lastname: string;
  mobile: string;
  email: string;
  password: string;
  cpassword: string;
}
let initialValues: formikObj = {
  firstname: "",
  lastname: "",
  mobile: "",
  email: "",
  password: "",
  cpassword: "",
};
function Register(): ReactElement {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState({ password: false, cpassword: false });
  // const [formData, disPatch] = useReducer(reducer, {});
  const formik = useFormik({
    initialValues,
    validate: formikValidateHandlerRegiseter,
    onSubmit: async (value) => {
      // const formData = JSON.stringify(value);
      setLoading(true);
      const registerPromise = registerUser(value);
      toast.promise(registerPromise, {
        loading: "Submiting...",
        success: "Successfully Register.",
        error: "Could not register try again!",
      });
      registerPromise
        .then(() => {
          setLoading(false);
          router.push("/login");
        })
        .catch((err: any) => {
          setLoading(false);
        });
    },
  });
  return (
    <>
      <Layout>
        <Head>
          <title>Register Page</title>
        </Head>
        <Toaster
        // toastOptions={{
        //   style: {
        //     backgroundColor: "transparent",
        //     color: "#ffff",
        //     border: "2px solid lightgreen",
        //   },
        // }}
        />
        <section className="py-4 flex flex-col mx-auto gap-4">
          <h2 className="font-semibold text-3xl uppercase text-gray-700 font-serif">
            Register
          </h2>
          <form
            className="flex flex-col mx-auto w-3/4 pt-4 gap-2"
            onSubmit={formik.handleSubmit}
          >
            <div className="flex justify-between gap-x-2">
              {/* First Name */}
              <div className="flex flex-col">
                <div
                  className={`input_container  ${
                    formik?.errors?.firstname && formik.touched.firstname
                      ? "border-rose-500"
                      : ""
                  }`}
                >
                  <input
                    className="input"
                    type="text"
                    placeholder="First Name"
                    // name="firstname"
                    // onChange={(state) => disPatch(state)}
                    // onChange={formik.handleChange}
                    // value={formik.values.firstname}
                    {...formik.getFieldProps("firstname")}
                  />
                  <span>
                    <HiUser
                      className="text-gray-400 hover:text-indigo-700"
                      size={18}
                    />
                  </span>
                </div>
                <p className="text-rose-400 font-semibold text-xs text-left">
                  {formik?.errors?.firstname && formik.touched.firstname
                    ? formik.errors.firstname
                    : ""}
                </p>
              </div>
              {/* last Name */}
              <div className="flex flex-col">
                <div
                  className={`input_container  ${
                    formik?.errors?.lastname && formik.touched.lastname
                      ? "border-rose-500"
                      : ""
                  }`}
                >
                  <input
                    className="input"
                    type="text"
                    placeholder="Last Name"
                    // name="lastname"
                    // onChange={(state) => disPatch(state)}
                    // onChange={formik.handleChange}
                    // value={formik.values.lastname}
                    {...formik.getFieldProps("lastname")}
                  />
                  <span>
                    <HiUser
                      className="text-gray-400 hover:text-indigo-700"
                      size={18}
                    />
                  </span>
                </div>
                <p className="text-rose-400 font-semibold text-xs text-left">
                  {formik?.errors?.lastname && formik.touched.lastname
                    ? formik.errors.lastname
                    : ""}
                </p>
              </div>
            </div>
            {/* mobile No */}
            <div className="flex flex-col">
              <div
                className={`input_container  ${
                  formik?.errors?.mobile && formik.touched.mobile
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <input
                  className="input"
                  type="text"
                  placeholder="Mobile No"
                  // name="mobile"
                  // onChange={(state) => disPatch(state)}
                  // onChange={formik.handleChange}
                  // value={formik.values.mobile}
                  {...formik.getFieldProps("mobile")}
                />
                <span>
                  <HiDeviceMobile
                    className="text-gray-400 hover:text-indigo-700"
                    size={18}
                  />
                </span>
              </div>
              <p className="text-rose-400 font-semibold text-xs text-left">
                {formik?.errors?.mobile && formik.touched.mobile
                  ? formik.errors.mobile
                  : ""}
              </p>
            </div>
            {/* email */}
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
                  // name="email"
                  // onChange={(state) => disPatch(state)}
                  // onChange={formik.handleChange}
                  // value={formik.values.email}
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
            {/* password */}

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
                  type={showPw.password ? "text" : "password"}
                  placeholder="Password"
                  // name="password"
                  // onChange={(state) => disPatch(state)}
                  // onChange={formik.handleChange}
                  // value={formik.values.password}
                  {...formik.getFieldProps("password")}
                />
                <span>
                  {showPw.password ? (
                    <HiOutlineEyeOff
                      className="text-gray-400 hover:text-indigo-700"
                      onClick={(state) =>
                        setShowPw({ ...showPw, password: !showPw.password })
                      }
                      size={18}
                    />
                  ) : (
                    <HiOutlineEye
                      className="text-gray-400 hover:text-indigo-700"
                      onClick={() =>
                        setShowPw({ ...showPw, password: !showPw.password })
                      }
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
            {/*Confirm password */}

            <div className="flex flex-col">
              <div
                className={`input_container  ${
                  formik?.errors?.cpassword && formik.touched.cpassword
                    ? "border-rose-500"
                    : ""
                }`}
              >
                <input
                  className="input"
                  type={showPw.cpassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  // name="cpassword"
                  // onChange={(state) => disPatch(state)}
                  // onChange={formik.handleChange}
                  // value={formik.values.cpassword}
                  {...formik.getFieldProps("cpassword")}
                />
                <span>
                  {showPw.cpassword ? (
                    <HiOutlineEyeOff
                      className="text-gray-400 hover:text-indigo-700"
                      onClick={() =>
                        setShowPw({ ...showPw, cpassword: !showPw.cpassword })
                      }
                      size={18}
                    />
                  ) : (
                    <HiOutlineEye
                      className="text-gray-400 hover:text-indigo-700"
                      onClick={() =>
                        setShowPw({ ...showPw, cpassword: !showPw.cpassword })
                      }
                      size={18}
                    />
                  )}
                </span>
              </div>
              <p className="text-rose-400 font-semibold text-xs text-left">
                {formik?.errors?.cpassword && formik.touched.cpassword
                  ? formik.errors.cpassword
                  : ""}
              </p>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 rounded-md py-2 p-2 hover:ring-2 hover:ring-green-800 focus:scale-95
               duration-200 text-gray-50 font-semibold uppercase"
            >
              Submit
            </button>
          </form>
          {/* Scocial Icone */}
          <div className="flex flex-col gap-1">
            {/* Gooogle */}
            <div className=" flex mx-auto border-2 items-center gap-2 px-3 py-1 rounded-md cursor-pointer">
              <p className="text-md font-semibold text-gray-600">
                Signin with Google
              </p>
              <span>
                <Image
                  src={"/assets/google.svg"}
                  width={20}
                  height={20}
                  alt="scocil_icone"
                ></Image>
              </span>
            </div>
            <div></div>
            {/* Git Hub */}
            <div className=" flex mx-auto border-2 items-center gap-2 px-3 py-1 rounded-md cursor-pointer">
              <p className="text-md font-semibold text-gray-600">
                Signin with Git Hub
              </p>
              <span>
                <Image
                  src={"/assets/github.svg"}
                  width={20}
                  height={20}
                  alt="scocil_icone"
                ></Image>
              </span>
            </div>
          </div>
          {/* Buttom */}
          <div>
            <code className="text-gray-500">
              Already Register?{" "}
              <span className="text-rose-500">
                <Link
                  href={"/login"}
                  className="font-popins font-semibold underline"
                >
                  Login
                </Link>
              </span>
            </code>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Register;
