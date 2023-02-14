import connection from "@/DataBase/connection";
import { Users } from "@/model/modelSchema";
import { NextApiRequest, NextApiResponse } from "next";

export default async function update(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /***_______  Connect To MongoDB   ________**/
    await connection();
    const methods = req.method;
    if (methods !== "PUT") throw new Error("methods not accepted!");
    const { updateId, userName } = req.query;
    if (!req.query || !req.body) throw new Error("server error");
    const formData = {
      ...req.body,
    };
    const findedUser = await Users.findOne({ email: req.body.email });
    if (findedUser) {
      if (findedUser?.username !== userName)
        throw new Error("Email is not available!");
    }

    const newUser = await Users.findByIdAndUpdate({ _id: updateId }, formData, {
      new: true,
    });
    // stop to send password & cpasswords on client
    const { password, cpassword, ...rest } = Object.assign(
      {},
      newUser.toJSON()
    );
    res.status(200).json({ msg: "success", user: rest });
  } catch (err: any) {
    console.log(err?.message);
    if (err?.message === "methods not accepted!") res.setHeader("Allow", "PUT");
    res.status(500).json({ error: err.message });
  }
}
