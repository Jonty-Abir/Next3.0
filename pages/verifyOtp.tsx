import Layout from "@/layout/layout";
import { useFormik } from "formik";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { toast, Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import ErrorComponent from "../components/Error";
import { gengenerateOTPAndSendEmail, verifyOtp } from "../library/helper";
/***_______  GETSERVERSIDEPROPS   ________**/

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

function Otp(contex: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const state = useSelector((state: any) => state.app.client);
  const router = useRouter();
  // console.log(state?.recoveryEmail);

  /***_______     ________**/

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: (value) => {
      const errors = {};
      if (!value.otp) {
        //@ts-ignore
        errors.otp = "required*";
      } else if (value.otp.length !== 6) {
        //@ts-ignore
        errors.otp = "6-digit OTP";
      }
      return errors;
    },
    onSubmit: async (value) => {
      const getPromise = verifyOtp({ code: value?.otp });
      toast.promise(getPromise, {
        success: "OTP verify successfull",
        loading: "Loading...",
        error: "invalid OTP!",
      });
      getPromise
        .then((value) => {
          if (value?.status === 200) {
            router.push("/resetpassword");
          }
        })
        .catch((err) => console.log("invalid OTP"));
    },
  });
  /***_______  Handleonclick function   ________**/
  const onClickFun = () => {
    const userEmail = state?.recoveryEmail;
    const getPromise = gengenerateOTPAndSendEmail({
      userEmail,
    });
    toast.promise(getPromise, {
      loading: "sending...",
      success: "OTP send on your email 🔥 ",
      error: "couldn't send OTP!",
    });
  };

  if (!state?.recoveryEmail && !state?.recoveryID) return <ErrorComponent />;
  return (
    <>
      <Layout>
        <Toaster />
        <section className="w-[100%] h-[100%] flex flex-col gap-y-4 justify-center items-center">
          <div className="flex flex-col gap-y-6 text-center mx-auto">
            <h2 className="text-gray-800 text-3xl font-serif font-bold">
              Forget Password
            </h2>
            <p className="text-gray-600 font-serif font-semibold text-lg ">
              enter OTP to recover password
            </p>
          </div>
          <div className="flex flex-col gap-y-2 pt-8 text-center mx-auto">
            <p className="text-gray-500 text-sm font-semibold font-serif">
              Enter 6 digit OTP send to your email address.
            </p>
            <form className="flex flex-col p-4" onSubmit={formik.handleSubmit}>
              <input
                type="text"
                placeholder="OTP"
                autoComplete="off"
                {...formik.getFieldProps("otp")}
                className={`px-4 text-gray-600 py-3 rounded-md focus:outline-none placeholder:text-green-500 font-semibold ${
                  formik?.errors?.otp ? "border-rose-500 border" : ""
                }`}
              />
              <p className="pb-4 text-left text-rose-500 text-sm font-serif font-semibold">
                {formik?.errors ? formik.errors?.otp : ""}
              </p>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md focus:outline-none"
              >
                Send
              </button>
            </form>
            <div className="flex justify-center">
              <p className="mr-4 text-gray-500 font-serif font-semibold">
                can not get OTP{" "}
              </p>
              <button
                onClick={onClickFun}
                type="button"
                className="text-rose-400 hover:text-rose-500 font-serif cursor-pointer font-semibold"
              >
                resend now
              </button>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default Otp;
