import connection from "@/DataBase/connection";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import strGenaretor from "otp-generator";
import { Users } from "../../../model/modelSchema";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /***_______  Connect To MongoDB   ________**/
  connection().catch((err) => {
    // res.status(502).json({ error: "Connection Failed!" })
    console.log(err?.message);
  });

  const accepted = req.method;
  if (accepted !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "http method not allowed!" });
  }
  try {
    if (req.body) {
      if (req.body.password === req.body.cpassword) {
        const userExist = await Users.findOne({ email: req.body.email });
        /***_______   check user already existe or not  ________**/

        if (userExist)
          return res.status(500).json({ error: "Email already existed!" });
        const hashPw = await bcrypt.hash(req.body.password, 10);
        const username = `${req.body.firstname
          .toString()
          .toLowerCase()}@${strGenaretor.generate(4, {
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        })}`;
        /***_______   create user obje to save DataBase  ________**/
        const userObj = {
          ...req.body,
          password: hashPw,
          cpassword: hashPw,
          username: username,
          avatar: req.body?.avatar || "",
        };
        const user = new Users(userObj);
        await user.save();
        return res.status(201).json({ msg: "Register Successfull...." });
      }
    }
    throw new Error("passwords are not same!");
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
