import ErrorComponent from "@/components/Error";
import Layout from "@/layout/layout";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../library/helper";
import { resetPasswordValidation } from "../library/validate";
import { setRecoveryEmail, setRecoveryID } from "../redux/Sclice/reducer";

export const getServerSideProps: GetServerSideProps = async (contex) => {
  const session = await getSession({ req: contex.req });
  const token: any = contex.req.cookies["next3.0"] || false;
  /***_______     ________**/

  if (token || session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  /***_______     ________**/

  return {
    props: {
      name: "abir",
    },
  };
};

function Resetpassword() {
  const [showEye, setEye] = useState({ password: false, cpassword: false });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.app.client);
  const fromik = useFormik({
    initialValues: { password: "", cpassword: "" },
    validate: resetPasswordValidation,
    onSubmit: async (value) => {
      const id = state?.recoveryID;
      const body = value;

      setLoading(true);
      const getPromise = resetPassword({ id, body });
      toast.promise(getPromise, {
        loading: "Updating...",
        success: "Succesfull 🔥 🚀 ",
        error: "Update Faild!",
      });
      getPromise
        .then((value) => {
          setLoading(false);
          router.push("/login");
          dispatch(setRecoveryEmail(" "));
          dispatch(setRecoveryID(" "));
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          console.log("error was accure while update the password!");
        });
    },
  });
  if (!state?.recoveryEmail && !state?.recoveryID) return <ErrorComponent />;
  return (
    <>
      <Layout>
        <section className="flex gap-y-8 flex-col text-left items-center w-4/4">
          <h2 className="text-3xl font-bold font-serif text-gray-700">
            {" "}
            Reset Password
          </h2>
          <form
            className="flex flex-col gap-y-3  px-2 w-4/4 items-center"
            onSubmit={fromik.handleSubmit}
          >
            <div>
              <div className="flex items-center gap-x-2 pr-3 bg-white rounded-md">
                <input
                  type={showEye.password ? "text" : "password"}
                  placeholder="password"
                  className="px-4 py-3 rounded-md outline-none  text-gray-500"
                  {...fromik.getFieldProps("password")}
                />
                <div
                  onClick={() =>
                    setEye({ ...showEye, password: !showEye.password })
                  }
                >
                  {showEye.password ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </div>
              </div>
              <p className="text-rose-500 text-left font-semibold font-serif text-xs lowercase">
                {fromik?.errors?.password ? fromik.errors.password : ""}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-x-2 pr-3 bg-white rounded-md">
                <input
                  type={showEye.cpassword ? "text" : "password"}
                  placeholder="password"
                  className="px-4 py-3 rounded-md outline-none text-gray-500"
                  {...fromik.getFieldProps("cpassword")}
                />
                <div
                  onClick={() =>
                    setEye({ ...showEye, cpassword: !showEye.cpassword })
                  }
                >
                  {showEye.cpassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </div>
              </div>
              <p className="text-rose-500 font-semibold font-serif text-xs lowercase">
                {fromik?.errors?.cpassword ? fromik.errors.cpassword : ""}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="text-white bg-blue-500 py-2 px-4 rounded-md w-2/4 uppercase"
            >
              {loading ? "Updating..." : "reset"}
            </button>
          </form>
        </section>
      </Layout>
    </>
  );
}

export default Resetpassword;
