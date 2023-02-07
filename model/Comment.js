import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  blog_id: {
    type: String,
    required: true,
  },
  names: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const model = mongoose.model("Comment", commentSchema);
export const schema = model.schema;
export default model;
