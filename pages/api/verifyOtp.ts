import { NextApiRequest, NextApiResponse } from "next";

export default async function verifyOtp(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method;
    const { code } = req.query;
    /***_______  check code is provided   ________**/

    if (!code) throw new Error("error was accure!");
    /***_______   Chech HTTTP Method  ________**/

    if (method !== "GET") {
      res.setHeader("allow-method", "GET");
      throw new Error("method not accepted!");
    }
    /***_______   Chech OTP is valid or not  ________**/

    //@ts-ignore
    if (parseInt(global.locals.OTP) === parseInt(code)) {
      //@ts-ignore
      global.locals.OTP = null;
      //@ts-ignore
      global.locals.resetSession = true;
      return res.status(200).json({ msg: "OTP verify Successfull" });
    }
    throw new Error("Invaild OTP!");
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
}
