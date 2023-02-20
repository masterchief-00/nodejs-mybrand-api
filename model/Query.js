import mongoose, { mongo } from "mongoose";

const QuerySchema = mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const model = mongoose.model("Query", QuerySchema);
export const schema = model.schema;
export default model;
