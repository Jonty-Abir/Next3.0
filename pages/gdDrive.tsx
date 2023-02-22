import { BsFillArrowLeftSquareFill } from "react-icons/bs";

import Layout from "@/layout/layout";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { instance } from "../instance/instance";

function GoogleDrive() {
  const [formData, setSetFormData] = useState({
    name: "",
    file: "",
  });

  /***_______  OnSubmit Function   ________**/
  const onSubmitFunction = async (event: any) => {
    event.preventDefault();
    console.log(formData);

    const url = "http://localhost:8080/gDrive";
    try {
      const { data } = await instance.post(url, formData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  /***_______     ________**/
  const upload = (e: any) => {
    console.log(e.target.files[0].name);
    if (e?.target?.files) {
      const { name, size } = e?.target?.files[0];
      console.log(name, size, "rest");
      setSetFormData((prev) => ({
        ...prev,
        file: "",
      }));
    }
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
            <h2 className="text-gray-600 text-3xl font-bold">Google Drive</h2>
          </div>
          <form
            className="flex flex-col mx-auto w-3/4 pt-4 gap-2"
            onSubmit={onSubmitFunction}
          >
            <input
              type="text"
              placeholder="name"
              className="input"
              onChange={(e) =>
                setSetFormData((prev) => ({ ...prev, name: e.target.value }))
              }
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

export default GoogleDrive;

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
