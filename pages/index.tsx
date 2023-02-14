import Layout from "@/layout/layout";
import { getUserToken } from "@/library/helper";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../components/Profile";
import { setToken, setUserDetails } from "../redux/Sclice/reducer";

const inter = Inter({ subsets: ["latin"] });

/***_______  COMPONENT HOME   ________**/

export default function Home({ session }: any) {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  /***_______     ________**/
  const state = useSelector((state: any) => state.app.client);
  /***_______     ________**/
  getUserToken()
    .then(({ decoded, token }: any) => {
      setLoading(false);
      dispatch(setToken(token));
      dispatch(
        setUserDetails({ username: decoded?.username, id: decoded?.userId })
      );
    })
    .catch((err) => {
      setLoading(false);
      console.log(err);
    });

  /***_______   SignUt Handler  ________**/
  function singOutHandler() {
    signOut();
  }
  if (!session && loading)
    return (
      <h2 className="text-center font-bold text-2xl text-rose-500">
        Loading...
      </h2>
    );
  return (
    <>
      <Layout>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {session
          ? User({ session, singOutHandler })
          : state?.token
          ? UserTow(state)
          : GustUser()}
      </Layout>
    </>
  );
}

/***_______  Gust user   ________**/

function GustUser(): ReactElement {
  return (
    <>
      <main className={styles.main}>
        <h3 className="text-4xl font-bold">Gust Home Page</h3>
        <div className="flex justify-center">
          <Link href={"/login"}>
            {" "}
            <span className="mt-5 py-1 px-10 rounded-sm bg-indigo-500 text-gray-50">
              Sign In
            </span>{" "}
          </Link>
        </div>
      </main>
    </>
  );
}

/***_______   authorize user  ________**/
// @ts-ignore

function User({ session: { user }, singOutHandler }: object): ReactElement {
  return (
    <>
      <main className={styles.main}>
        <h3 className="text-4xl font-bold">Authorize User-Home Page</h3>
        <div className={`${styles.img}`}>
          <Image
            src={`${user?.image}`}
            width={150}
            height={150}
            alt="scocil_icone"
            className="rounded-full"
          ></Image>
        </div>
        <div className="details">
          <h5>{user?.email || "Unknown"}</h5>
          <h5>{user?.name || "Unknown"}</h5>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50"
            onClick={singOutHandler}
          >
            Sign Out
          </button>
        </div>
        <div className="flex justify-center">
          <Link href={"/profile"}>
            <span className="mt-5 py-1 px-10 rounded-sm bg-indigo-500 text-gray-50">
              Profile
            </span>
          </Link>
        </div>
      </main>
    </>
  );
}

/***_______  manula user hom page   ________**/

function UserTow(state: any): ReactElement {
  return (
    <>
      <Profile />
    </>
  );
}

/***_______  GetServerSideProps   ________**/

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {
      session,
    },
  };
};