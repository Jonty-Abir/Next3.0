import Classes from "../styles/layout.module.css";

import { PropsWithChildren } from "react";
function Layout({ children }: PropsWithChildren) {
  const rand = Math.floor(Math.random() * 5);
  const imgarr = [
    `url("/assets/cloud_2.png")`,
    `url("/assets/img1.jpg")`,
    `url("/assets/img2.jpg")`,
    `url("/assets/img3.jpg")`,
  ];
  return (
    <>
      <main className="w-screen h-screen items-center flex flex-cols bg-blue-400">
        <div
          style={{ borderRadius: "1rem" }}
          className="mx-auto bg-slate-50 w-[100%] lg:w-3/4 h-screen lg:h-[80%] overflow-y-scroll grid lg:grid-cols-2"
        >
          <div className={`${Classes.img} hidden lg:flex`}>
            {/* hidden lg:flex */}
            <div className={`${Classes.cartune} w-[200px] h-[120px]`}></div>
            <div className={Classes.Cloud_1}></div>
            {/* background: url("/assets/cloud_2.png"); */}

            <div className={Classes.Cloud_2}></div>
          </div>
          <div className="right flex flex-col justify-evenly bg-gray-300">
            <div className=" text-center">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Layout;
