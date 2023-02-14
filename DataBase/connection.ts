import mongoose from "mongoose";
export default async function connection() {
  try {
    mongoose.set("strictQuery", true);
    //@ts-ignore
    const { connection } = await mongoose.connect(
      //@ts-ignore
      process.env.NEXT_PUBLIC_PREFIX_DB_CONNECTION_STRING
    );
    if (connection.readyState == 1) {
      console.log("Database Connection Successfull.....");
    }
  } catch (err: any) {
    return Promise.reject(err);
  }
}
