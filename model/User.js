import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  names: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
  },
  password: {
    type: string,
    required: true,
  },
  token: string,
});

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
