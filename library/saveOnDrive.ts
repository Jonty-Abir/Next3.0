import { google } from "googleapis";

const CLIENT_ID =
  "185265745033-0je4mopiaqn0vnd7v5ocqfp6tvenpufq.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//04gCAf_dulNh5CgYIARAAGAQSNwF-L9Ir-AfBSmQwwrlwPwG1ACdP-h3DXPgXmYBkvK-ze0w774kC4LaOs-qh8uoFtcU8PKHybdE";
const authClient = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);
authClient.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: authClient,
});
export async function upload() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: "abir.pdf",
        mimeType: "image/png",
      },
      media: {
        mimeType: "image/png",
        body: "",
      },
    });
    console.log(response.data);
    return Promise.resolve(response.data);
  } catch (err: any) {
    console.log(err?.message, "error ************");
    Promise.reject(err?.message);
  }
}
