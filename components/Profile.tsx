import useCustom from "@/hooks/useCustom";
import convertToBase64 from "@/library/cover";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { HiDeviceMobile, HiOutlineMail, HiUser } from "react-icons/hi";
import { useSelector } from "react-redux";
import { updateUser } from "../library/helper";
import { updateValidatorHandler } from "../library/validate";

function Profile() {
  /***_______  Redux   ________**/

  const state = useSelector((state: any) => state.app.client);

  const [loading, setLoading] = useState(false);
  const [userDetail]: any = useCustom(state.userName);
  const [base64, setBase63] = useState("");
  const router = useRouter();

  /***_______     ________**/
  interface initialValuesStu {
    firstname: string;
    lastname: string;
    mobile: string;
    email: string;
  }
  const initialValues: initialValuesStu = {
    firstname: !userDetail.apiData ? "" : userDetail?.apiData?.user.firstname,
    lastname: !userDetail.apiData ? "" : userDetail?.apiData?.user.lastname,
    mobile: !userDetail.apiData ? "" : userDetail?.apiData?.user.mobile,
    email: !userDetail.apiData ? "" : userDetail?.apiData?.user.email,
  };

  const formik = useFormik({
    initialValues,
    validate: updateValidatorHandler,
    enableReinitialize: true,
    /***_______  FORM SUBMIT   ________**/

    onSubmit: async (value) => {
      value = await Object.assign(value, {
        avatar:
          base64 ||
          (!userDetail.apiData
            ? "/assets/profile.png"
            : userDetail?.apiData?.user.avatar) ||
          "/assets/profile.png",
      });
      const updatePromise = updateUser({
        formData: value,
        userName: state?.userName,
        id: state?._id,
      });
      toast.promise(updatePromise, {
        success: "Updateing Success...",
        loading: "Submiting...",
        error: (err) => `${err}`,
      });
    },
  });

  /***_______  Logout handleer   ________**/
  const logOut = () => {
    localStorage.removeItem("next3.0");
    Cookies.remove("next3.0");
    router.push("/login");
    console.log("logout!");
  };
  /***_______  Base64   ________**/
  const upload = async (event: any) => {
    const imgType = ["image/jpeg", "image/jpg", "image/png"];

    if (event.target.files.length >= 1) {
      if (event.target.files[0].size <= 2000000) {
        const typeArray = imgType.filter(
          (v) => v === event.target.files[0].type
        );
        if (typeArray.length === 1) {
          const base64Format: any = await convertToBase64(
            event.target.files[0]
          );
          setBase63(base64Format);
        } else {
          toast.error("Only JPG/PNG/JPEG accepted!");
        }
      } else {
        toast.error("File Is too Large! (highest 2Mb accepted) ");
      }
    } else {
      toast.error("avatar not seleted!");
    }
  };

  /***_______   Loading  ________**/

  if (!userDetail.apiData)
    return (
      <h2 className="text-center font-bold text-2xl text-rose-500">
        Loading...
      </h2>
    );
  const { avatar, email, firstname, lastname, mobile, username } =
    userDetail?.apiData?.user;

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Toaster />
      <section className="p-4 flex flex-col mx-auto gap-y-6 ">
        <h2 className="text-gray-700 font-bold text-4xl uppercase">Profile</h2>
        {/* Form */}
        <div className="form">
          {/* Avatar */}
          <div className="avatar flex justify-center">
            <label htmlFor="profile_Picture" className="cursor-pointer">
              <Image
                className=" rounded-full ring-4 ring-green-500"
                src={base64 || avatar || "/assets/profile.png"}
                width={125}
                height={125}
                alt="profile_img"
              ></Image>
            </label>
          </div>
          <form
            className="flex flex-col mx-auto w-3/4 pt-4 gap-2"
            onSubmit={formik.handleSubmit}
          >
            <input
              className="hidden"
              type="file"
              onChange={upload}
              id="profile_Picture"
              name="avatar"
            />
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
            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 rounded-md py-2 p-2 hover:ring-2 hover:ring-green-800 focus:scale-95
               duration-200 text-gray-50 font-semibold uppercase"
            >
              Update
            </button>
          </form>
        </div>
        {/* logout */}
        <div className="logout flex justify-center">
          <p className="text-gray-600 font-semibold">come back latter</p>
          <button
            type="button"
            onClick={logOut}
            className=" text-rose-500 pl-4 font-semibold hover:text-rose-400"
          >
            Logout
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
