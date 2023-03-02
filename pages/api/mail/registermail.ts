import connection from "@/DataBase/connection";
import { Users } from "@/model/modelSchema";
import Mailgen from "mailgen";
import { NextApiRequest, NextApiResponse } from "next";
import nodeMailer from "nodemailer";

export default async function regiesterMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  /***_______  Connect To MongoDB   ________**/
  connection().catch((err) => {
    // res.status(502).json({ error: "Connection Failed!" })
    console.log(err?.message);
  });
  try {
    /***_______  Check req body passed   ________**/

    if (!req.body) throw new Error("there was serverside error!");
    /***_______  check user have or not  ________**/

    const isValidEmail = await Users.findOne({ email: req.body.email });
    if (!isValidEmail) throw new Error("User not found to send email");

    const { email, text, subject } = req.body;
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
        name: "Next3.0",
        link: "https://authentication-with-next-auth.vercel.app/",
      },
    });
    let emailDetails = {
      body: {
        // name: username,
        intro: text || "",
        outro: "",
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
        res.status(201).json({ msg: "You should recevie an email form us." });
      })
      .catch((err: any) => {
        console.log(err);
        res.status(500).json({ error: "email could't send" });
      });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
