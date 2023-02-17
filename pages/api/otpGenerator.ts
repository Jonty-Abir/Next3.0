import { NextApiRequest, NextApiResponse } from "next";
import generateOtp from "otp-generator";

export default async function otpGenerator(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const method = req.method;
    if (method !== "GET") {
      res.setHeader("allow", "GET");
      throw new Error("method not accepcted!");
    }
    let otp = generateOtp.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    //@ts-ignore
    global.locals = { OTP: otp, resetSession: false };
    res.status(201).json({ OTP: otp });
  } catch (err: any) {
    res.status(500).json({ error: err?.message });
  }
}
