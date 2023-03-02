import axios from "axios";
import jwt from "jsonwebtoken";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../library/helper";
import { addOnCard } from "../redux/Sclice/cardSclice";
import { add, setStatus, status } from "../redux/Sclice/productSclice";
import Classs from "../styles/products.module.css";

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

function Products({
  session,
  decoded,
  token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [user, setUser] = useState({ avatar: "/assets/profile.png" });
  const disPatchfun = useDispatch();
  const { data, status: stateStatus } = useSelector(
    (state: any) => state.product
  );
  const { card } = useSelector((state: any) => state.card);
  /***_______  Handle OnClik   ________**/
  const onClickFun = (item: any) => {
    disPatchfun(addOnCard(item));
  };

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
  useEffect(() => {
    async function fetchingFun() {
      try {
        disPatchfun(setStatus(status.loading));
        const { data } = await axios.get("https://fakestoreapi.com/products");
        disPatchfun(add(data));
        disPatchfun(setStatus(status.fullfile));
      } catch (err: any) {
        console.log(err?.message);
        disPatchfun(setStatus(status.error));
      }
    }
    fetchingFun();
  }, [disPatchfun]);
  if (stateStatus !== status.fullfile) {
    return <h2 className="text-orange-400 text-center text-2xl">Loading...</h2>;
  }
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
              <Link href={"/card"}>Card</Link>
            </li>
            <li className={Classs.li}>Card Items: {card.length}</li>
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
          <h2 className="text-xl text-gray-600 font-semibold ml-2">Products</h2>
        </div>
        <div className={Classs.products}>
          {data.map((value: any) => {
            return (
              <div className={`${Classs.card} `} key={value?.id}>
                <div>
                  <div className="">
                    <Image
                      className={Classs.img}
                      src={value?.image}
                      alt="product"
                      width={100}
                      height={100}
                    ></Image>
                  </div>
                  <div className={Classs.text}>{value?.title}</div>
                  <div className=" text-gray-500 text-sm font-semibold">
                    {" "}
                    <span>Rating:{value?.rating?.rate}</span>{" "}
                    <span>Reviews:{value?.rating?.count}</span>
                  </div>
                </div>
                <div className={Classs.text}>
                  <button
                    type="button"
                    onClick={() => {
                      onClickFun(value);
                    }}
                    className={Classs.button}
                  >
                    Add to Card <GiShoppingCart size={28} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Products;
