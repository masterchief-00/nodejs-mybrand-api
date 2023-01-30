import Query from "../model/Query.js";

export const getAllQueries = async (req, res) => {
  const allQueries = await Query.find();
  if (!allQueries) return res.status(204).json({ message: "No queries found" });

  res.json(allQueries);
};

export const createNewQuery = async (req, res) => {
  if (!req?.body?.names || !req?.body?.email || !req?.body?.body)
    return res.status(400).json({ message: "Invalid query" });
  try {
    const result = await Query.create({
      names: req.body.names,
      email: req.body.email,
      body: req.body.body,
      date: req.body.date,
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(204);
  }
};

export const deleteQuery = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Query ID required" });

  const result = await Query.deleteOne({ _id: req.params.id });

  res.json(result);
};

export default { getAllQueries, createNewQuery, deleteQuery };
