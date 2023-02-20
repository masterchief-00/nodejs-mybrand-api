import mongoose from "mongoose";
const commentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  tools: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }, 
});

const model = mongoose.model("Project", commentSchema);
export const schema = model.schema;
export default model;