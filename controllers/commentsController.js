import Blog from "../model/Blog.js";
import Comment from "../model/Comment.js";

export const commentToBlog = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The blog ID is required" });

  const blog = await Blog.findOne({ _id: req.params.id });

  if (!blog) return res.status(204).json({ message: "Blog not found" });

  try {
    let dateNow = new Date();
    let newComment = {
      blog_id: req.params.id,
      names: req.user.names,
      comment: req.body.comment,
      date: dateNow.toISOString(),
    };

    let result = await Comment.create(newComment);
    return res.json({ message: "comment posted" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export default { commentToBlog };
