// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connection from "@/DataBase/connection";
import { Users } from "@/model/modelSchema";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /***_______  Connect To MongoDB   ________**/
  connection().catch((err) => {
    // res.status(502).json({ error: "Connection Failed!" })
    console.log(err?.message);
  });
  try {
    if (req.method === "GET") {
      if (!req.query) throw new Error("there was serverside error!");
      const { userName } = req.query;
      const data = await Users.findOne({
        // username: userName,
        $or: [{ username: userName }, { email: userName }],
      });
      if (!data) throw new Error("there was server side error!");
      const { password, cpassword, ...rest } = Object.assign({}, data.toJSON());
      res.status(200).json({ msg: "success", user: rest });
    } else {
      res.setHeader("Allow", "GET");
      res.status(405).json({ error: "" });
    }
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
}
