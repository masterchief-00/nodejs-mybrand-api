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
  token: String,
});

const model = mongoose.model("User", userSchema);

export const schema = model.schema;
export default model;
