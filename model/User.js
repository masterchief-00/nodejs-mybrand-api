import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
  token: String,
});

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
