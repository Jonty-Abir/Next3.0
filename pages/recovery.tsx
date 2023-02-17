import Layout from "@/layout/layout";
import { useFormik } from "formik";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { gengenerateOTPAndSendEmail } from "../library/helper";
import { setRecoveryEmail, setRecoveryID } from "../redux/Sclice/reducer";
import { store } from "../redux/store";

/***_______  GET SERVERSIDE PROPS   ________**/

export const getServerSideProps: GetServerSideProps = async (contex) => {
  const session = await getSession({ req: contex.req });
  const token: any = contex.req.cookies["next3.0"] || false;
  /***_______   WHEN USER LOGI THEN DONT NEED FORET PASSWORDs   ________**/

  if (token || session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      developer: "Abir Santra",
    },
  };
};

/***_______   PAGE COMPONENTS   ________**/

export default function CheckEmailPage(
  contex: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const state = useSelector((state: any) => state.app.client);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    /***_______  FORM VALIDATION   ________**/
    validate: (value) => {
      const errors = {};
      if (!value.email) {
        // @ts-ignore
        errors.email = "required*";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)
      ) {
        // @ts-ignore

        errors.email = "invalid email!";
      }
      return errors;
    },
    /***_______  FORM SUBMIT   ________**/
    onSubmit: async (value) => {
      dispatch(setRecoveryEmail(value?.email));
      const currentState = store.getState();

      const userEmail = currentState?.app?.client?.recoveryEmail;
      setLoading(true);
      const getPromise = gengenerateOTPAndSendEmail({
        userEmail,
      });
      /***_______     ________**/

      toast.promise(
        getPromise,
        {
          success: "OTP Send On Your Email.",
          loading: "Sending..",
          error: "Could not send mail!",
        },
        {
          duration: 5000,
        }
      );
      /***_______     ________**/

      getPromise
        .then((value) => {
          const recoveryID = value?.user?._id;
          dispatch(setRecoveryID(recoveryID));
          setLoading(false);
          router.push("/verifyOtp");
        })
        .catch((err) => {
          setLoading(false);
          console.log("error was accure!");
          // toast.error("Could not send mail!");
        });
    },
  });
  return (
    <>
      <Layout>
        <Toaster />
        <section className="w-[100%] h-[100%] flex flex-col gap-y-4 justify-center items-center">
          <div className="flex flex-col gap-y-6 text-center mx-auto">
            <h2 className="text-gray-700 text-3xl font-serif font-bold">
              Forget Password
            </h2>
            {/* <p className="text-gray-600 font-serif font-semibold text-lg ">
              enter OTP to recover password
            </p> */}
          </div>
          <div className="flex flex-col gap-y-2 pt-8 text-center w-[70%]">
            {/* <p className="text-gray-500 text-sm font-semibold font-serif">
              Enter 6 digit OTP send to your email address.
            </p> */}
            <form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="emaxple@gmail.com"
                autoComplete="off"
                {...formik.getFieldProps("email")}
                className={`px-4 py-3 text-gray-600 rounded-md focus:outline-none placeholder:text-sm font-semibold ${
                  formik.errors?.email ? "border-rose-500 border" : ""
                }`}
              />
              <p className="text-sm text-left font-serif font-semibold mb-3 text-rose-500">
                {formik.errors.email}
              </p>
              <button
                disabled={loading}
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none uppercase"
              >
                {loading ? "sending..." : "Next"}
              </button>
            </form>
            {/* <div className="flex justify-center">
              <p className="mr-4 text-gray-500 font-serif font-semibold">
                can not get OTP{" "}
              </p>
              <Link href={"/login"}>
                <button
                  type="button"
                  className="text-rose-400 font-serif cursor-pointer font-semibold"
                >
                  Resend Now
                </button>
              </Link>
            </div> */}
          </div>
        </section>
      </Layout>
    </>
  );
}
