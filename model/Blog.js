import mongoose, { mongo } from "mongoose";

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  likes: {
    type: [{ email: String, date: Date }],
    default: [],
  },
});

const model = mongoose.model("Blog", blogSchema);

export const schema = model.schema;
export default model;
