import { Users } from "@/model/modelSchema";
import Mailgen from "mailgen";
import { NextApiRequest, NextApiResponse } from "next";
import nodeMailer from "nodemailer";

export default async function regiesterMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /***_______  Check req body passed   ________**/

    if (!req.body) throw new Error("there was serverside error!");
    /***_______  check user have or not  ________**/

    const isValidEmail = await Users.findOne({ email: req.body.email });
    if (!isValidEmail) throw new Error("User not found to send email");

    const { mobile, email, text, subject } = req.body;
    /***_______   create the configaretion object   ________**/

    const config = {
      service: "gmail",
      auth: {
        user: process.env.NEXT_PUBLIC_PREFIX_EMAIL,
        pass: process.env.NEXT_PUBLIC_PREFIX_PW,
      },
    };

    let transport = nodeMailer.createTransport(config);
    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Abir Santra",
        link: "https://abirsantraonline.netlify.com",
      },
    });
    let emailDetails = {
      body: {
        // name: username,
        intro: text || "",
        outro: "Thank you.",
      },
    };
    // create the email body
    let emailBody = MailGenerator.generate(emailDetails);
    //
    let message = {
      from: process.env.NEXT_PUBLIC_PREFIX_EMAIL,
      to: email,
      subject: subject,
      html: emailBody,
    };
    // send email to client
    transport
      .sendMail(message)
      .then(() => {
        res.status(201).json({ msg: "You should recevied a email form us." });
      })
      .catch((err: any) => {
        res.status(500).json({ error: "email could't send" });
      });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
