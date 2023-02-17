import { signOut } from "next-auth/react";

import Image from "next/image";
function SocialUser({ userDetails }: any) {
  /***_______   SignUt Handler  ________**/
  function singOutHandler() {
    signOut();
  }
  return (
    <section className="p-4 flex flex-col justify-start space-y-24">
      <h2 className="text-gray-700 font-bold text-4xl uppercase">Profile</h2>
      <div className="flex flex-col justify-center items-center gap-4">
        <Image
          src={userDetails?.image}
          alt="avatar"
          width={50}
          height={50}
          className={`rounded-md`}
        />
        <p className="font-semibold text-gray-500">
          {userDetails?.name || "*******"}
        </p>

        <p className="text-gray-600 font-semibold">
          {userDetails?.email || "********"}
        </p>
        <div>
          <p
            className="bg-indigo-900 px-3 py-1 rounded-md hover:scale-105 hover:bg-rose-600 duration-200 cursor-pointer text-gray-200 "
            onClick={singOutHandler}
          >
            Logout
          </p>
        </div>
      </div>
    </section>
  );
}

export default SocialUser;
