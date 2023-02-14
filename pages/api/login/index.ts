import { Users } from "@/model/modelSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import connection from "../../../DataBase/connection";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  /***_______  Connect To MongoDB   ________**/
  connection().catch((err) => {
    // res.status(502).json({ error: "Connection Failed!" })
    console.log(err?.message);
  });

  const accepted = req.method;
  if (accepted !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(500).json({ error: "there was serverside error!" });
  }
  try {
    if (!req.body) throw new Error("there was serverside error!");
    if (req.body.email && req.body.password) {
      const userExist = await Users.findOne({ email: req.body.email });
      /***_______   check user is have to login  ________**/

      if (!userExist) return res.status(404).json({ error: "User Not Found!" });
      const validPassword = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      /***_______   check client pw valid or not  ________**/

      if (!validPassword) throw new Error("there was serverside error!");
      /***_______  JWT   ________**/
      const userDetails = {
        userId: userExist._id,
        username: userExist.username,
      };
      const token = jwt.sign(
        userDetails,
        //@ts-ignore
        process.env.NEXT_PUBLIC_PREFIX_JWT_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ msg: "Login Successfull..", token });
    } else {
      throw new Error("there was serverside error!");
    }
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
}
