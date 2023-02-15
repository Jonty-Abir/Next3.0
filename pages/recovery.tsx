import Layout from "@/layout/layout";
import { useFormik } from "formik";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export default function Recovery(
  contex: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  console.log(contex.developer);
  /***_______  HANDLE FORM WITH FORMIK   ________**/
  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validate: () => {},
    onSubmit: async (value) => {
      console.log(value);
    },
  });
  return (
    <>
      <Layout>
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
            <form
              className="flex flex-col gap-y-4 p-4"
              onSubmit={formik.handleSubmit}
            >
              <input
                type="text"
                placeholder="OTP"
                autoComplete="off"
                {...formik.getFieldProps("otp")}
                className="px-4 py-3 rounded-md focus:outline-none placeholder:text-green-500 font-semibold"
              />
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
              <Link href={"/login"}>
                <button
                  type="button"
                  className="text-rose-400 font-serif cursor-pointer font-semibold"
                >
                  Resend Now
                </button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

/***_______  GET SERVERSIDE PROPS   ________**/

export const getServerSideProps: GetServerSideProps = async (contex) => {
  //   console.log(contex.req.method, contex.locale, contex.locales)
  return {
    props: {
      developer: "Abir Santra",
    },
  };
};
