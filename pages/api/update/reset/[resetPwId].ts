import { Users } from "@/model/modelSchema";
import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function resetPwApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { resetPwId } = req?.query;
    if (!resetPwId) throw new Error("bad request! [error code:400]");
    if (req.method !== "PUT") {
      res.status(405).setHeader("allow", "PUT");
      throw new Error("method not accepted!");
    }
    if (!req?.body) throw new Error("bad request! [error code:400]");
    if (!req?.body?.password && req?.body?.cpassword)
      throw new Error("bad request! [error code:400]");
    if (req?.body?.password === req?.body?.cpassword) {
      const hasPasssword = await bcrypt.hash(req.body.password, 10);
      const hashCpassword = await bcrypt.hash(req.body.cpassword, 10);
      /***_______   attempt to update password  ________**/

      const newData = await Users.findByIdAndUpdate(
        { _id: resetPwId },
        { password: hasPasssword, cpassword: hashCpassword },
        { new: true }
      );
      /***_______     ________**/

      const { password, cpassword, ...rest } = Object.assign(
        {},
        newData.toJSON()
      );
      //@ts-ignore
      global.locals = { resetSession: false };
      res.status(200).json({ msg: "success", user: rest });
    } else {
      res.status(400).json({ error: "bad request! [error code:400]" });
    }
  } catch (err: any) {
    if (err?.message === "method not accepted!")
      return res.status(405).json({ error: err?.message });
    res.status(500).json({ error: err.message });
  }
}
