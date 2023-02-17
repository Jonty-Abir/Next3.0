import Layout from "@/layout/layout";
import Image from "next/image";
import Link from "next/link";

function Error() {
  return (
    <Layout>
      <div className="text-center h-screen bg-gray-500 ">
        <h1 className="text-3xl font-bold text-orange-500 py-10">
          Something is wrong!
        </h1>
        <Link href={"/login"}>
          <button
            type="button"
            className="px-4 py-2 rounded-md hover:scale-105 duration-300 cursor-pointer text-white bg-blue-500"
          >
            Go back to Login page?
          </button>
        </Link>
        <Image
          src={"/assets/not_found.png"}
          width={400}
          height={400}
          alt="error_img"
          className="mx-auto bg-cover"
        />
      </div>
    </Layout>
  );
}

export default Error;
