import { getUser } from "@/library/helper";
import jwt from "jsonwebtoken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToCard } from "../redux/Sclice/cardSclice";
import Classs from "../styles/products.module.css";

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

function Card({
  session,
  decoded,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { card } = useSelector((state: any) => state.card);

  const [user, setUser] = useState({ avatar: "/assets/profile.png" });
  const disPatch = useDispatch();

  useEffect(() => {
    if (decoded) {
      getUser({ username: decoded?.username })
        .then((v) => {
          setUser(v.data.user);
        })
        .catch((err) => {
          console.log("error was occure while fetch userAvtar!");
        });
    }
  }, []);

  return (
    <main className={Classs.main}>
      <div className="flex flex-col gap-4">
        <nav className={Classs.nav}>
          <h3 className="text-gray-600 capitalize italic font-semibold text-2xl">
            Mahapravhu Import & Export
          </h3>
          <ul className={Classs.ul}>
            <li className={Classs.li}>
              <Link href={"#"}>Home</Link>
            </li>
            <li className={Classs.li}>
              <Link href={"/products"}>Products</Link>
            </li>
            <li className={Classs.li}>
              <Link href={"/"}>
                {session ? (
                  <Image
                    className="rounded-full ring-2 ring-green-500"
                    src={`${
                      session ? session.user.image : "/assets/profile.png"
                    }`}
                    // src={"/assets/profile.png"}
                    alt="avatar"
                    width={55}
                    height={55}
                  />
                ) : (
                  <Image
                    className="rounded-full ring-2 ring-green-500"
                    src={`${decoded ? user?.avatar : "/assets/profile.png"}`}
                    // src={"/assets/profile.png"}
                    alt="avatar"
                    width={55}
                    height={55}
                  />
                )}
                {/* <Image
                  className="rounded-full ring-2 ring-green-500"
                  //   src={
                  //     `${session ? session.user.image : ""}` ||
                  //     `${decoded ? user?.avatar : ""}`
                  //   }
                  src={"/assets/profile.png"}
                  alt="avatar"
                  width={55}
                  height={55}
                /> */}
              </Link>
            </li>
          </ul>
        </nav>
        {/*  */}
        <div>
          <h2 className="text-xl text-gray-600 font-semibold ml-2">Cards</h2>
        </div>
        <div className={Classs.cardGrid}>
          {card.map((value: any) => {
            return (
              <div
                key={value?.id}
                className="flex justify-evenly border items-center gap-4 w-full"
              >
                <div>
                  <Image
                    className="mx-auto bg-cover"
                    src={`${value.image}`}
                    alt="product_img"
                    width={50}
                    height={60}
                  ></Image>
                </div>
                <div className={Classs.title}> {value.title}</div>
                <button
                  type="button"
                  className="px-3 py-1 my-auto rounded-md bg-rose-400"
                  onClick={() => {
                    disPatch(removeToCard(value.id));
                  }}
                >
                  Remove{" "}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Card;
