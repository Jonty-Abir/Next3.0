import SocialUser from "@/components/SocialUser";
import Layout from "@/layout/layout";
import styles from "@/styles/Home.module.css";
import { Inter } from "@next/font/google";
import jwt from "jsonwebtoken";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import Profile from "../components/Profile";
import { setToken, setUserDetails } from "../redux/Sclice/reducer";

const inter = Inter({ subsets: ["latin"] });

/***_______  COMPONENT HOME   ________**/

export default function Home({ session, decoded, token }: any) {
  const dispatch = useDispatch();
  /***_______     ________**/
  if (decoded && token) {
    dispatch(setToken(token));
    dispatch(
      setUserDetails({ username: decoded?.username, id: decoded?.userId })
    );
  }

  /***_______   SignUt Handler  ________**/
  function singOutHandler() {
    signOut();
  }

  return (
    <>
      <Layout>
        <Head>
          <title>home </title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {session
          ? User({ session, singOutHandler })
          : decoded
          ? UserTow(decoded)
          : /***_______  manula user hom page   ________**/
            GustUser()}
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
      <SocialUser userDetails={user} />
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

export const getServerSideProps: GetServerSideProps = async (contex) => {
  try {
    const session = await getSession({ req: contex.req });
    const token: any = contex.req.cookies["next3.0"] || false;
    let decoded: any = false;

    /***_______  check token have or not   ________**/

    if (token) {
      decoded = jwt.verify(
        token,
        process.env.NEXT_PUBLIC_PREFIX_JWT_SECRET_KEY as string
      );
      /***_______  Check token expire or not   ________**/
      if (!decoded) throw new Error("session expire!");

      return {
        props: {
          session,
          decoded,
          token,
        },
      };
    } else if (session) {
      console.log("Next3.0 token not found!");
      return {
        props: {
          session,
          decoded,
          token,
        },
      };
      /***_______  REDIRECT TO LOGIN   ________**/
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  } catch (err: any) {
    console.log(err?.message);
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
