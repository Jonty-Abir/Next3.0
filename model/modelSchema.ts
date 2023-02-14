import mongoose, { model, Schema } from "mongoose";
interface IUser {
  firstname: string;
  lastname: string;
  username: string;
  mobile: string;
  email: string;
  password: string;
  cpassword: string;
  avatar?: string;
}
const userSchema = new Schema<IUser>(
  {
    firstname: {
      type: String,
      required: [true, "Required*"],
    },
    lastname: {
      type: String,
      required: [true, "Required*"],
    },
    username: {
      type: String,
      required: [true, "Required*"],
    },
    mobile: {
      type: String,
      required: [true, "Required*"],
    },
    email: {
      type: String,
      required: [true, "Required*"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Required*"],
    },
    cpassword: {
      type: String,
      required: [true, "Required*"],
    },
    avatar: String,
  },
  { timestamps: true }
);
// const User = models.project || model<IUser>("project", userSchema);
const Users = mongoose.models?.Project || model("Project", userSchema);

export { Users };
