import Layout from "@/layout/layout";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

function Dropbox() {
  const [uploadFile, setUploadFile] = useState("");

  /***_______  Base64   ________**/

  /***_______     ________**/
  const initialValues = {
    name: "",
  };
  const formik = useFormik({
    initialValues,
    validate: () => {},
    onSubmit: async (value) => {
      value = await Object.assign(value, {
        file: uploadFile || "/assets/profile.png",
      });
      console.log(value);
    },
  });
  const upload = (e: any) => {
    console.log(e.target.files[0]);
  };
  return (
    <>
      <Layout>
        <section>
          <Toaster />
          <div className="mx-auto mb-14">
            <div className="mx-auto ml-5">
              <Link href={"/"}>
                <BsFillArrowLeftSquareFill
                  className="cursor-pointer"
                  size={30}
                />
              </Link>
            </div>
            <h2 className="text-gray-600 text-3xl font-bold">Drop Box</h2>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col mx-auto w-3/4 pt-4 gap-2"
          >
            <input
              type="text"
              placeholder="name"
              className="input"
              {...formik.getFieldProps("name")}
            />
            <input
              type="file"
              name="file"
              className="input bg-white mb-6"
              onChange={upload}
            />
            <button
              type="submit"
              className="px-3 py-2 bg-indigo-600 text-white w-2/4 rounded-md"
            >
              Upload here{" "}
            </button>
          </form>
        </section>
      </Layout>
    </>
  );
}

export default Dropbox;

export const getServerSideProps: GetServerSideProps = async (contex) => {
  const session = await getSession({ req: contex.req });
  const token: any = contex.req.cookies["next3.0"] || false;
  /***_______     ________**/

  if (!token && !session) {
    return {
      redirect: {
        destination: "/login",
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
