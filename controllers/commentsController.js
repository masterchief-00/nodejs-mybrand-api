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
    return res.json({ message: "comment posted", id: result._id });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getComments = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The blog ID is required" });

  const blog = await Blog.findOne({ _id: req.params.id });

  if (!blog) return res.status(204).json({ message: "Blog not found" });

  let comments = await Comment.find({ blog_id: req.params.id }).lean();
  let comments_with_replies = [];
  for (let comment of comments) {
    let replies = await Comment.find({ blog_id: comment._id });

    if (replies.length > 0) {
      let all_replies = [];
      for (const reply of replies) {
        all_replies.push(reply);
      }
      comment = { ...comment, all_replies };
    }
    comments_with_replies.push(comment);
  }

  // console.log(comments_with_replies);
  res.json(comments_with_replies);
};

export const findComment = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The comment ID is required" });

  const comment = await Comment.findOne({ _id: req.params.id });

  if (!comment) return res.status(204).json({ message: "comment not found" });

  res.json(comment);
};

export const likeComment = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The comment ID is required" });

  const comment = await Comment.findOne({ _id: req.params.id });

  if (!comment) return res.status(204).json({ message: "comment not found" });

  let dateNow = new Date();
  let newLike = {
    email: req.user.email,
    date: dateNow.toISOString(),
  };

  let allLikes = [...comment.likes];
  let likeExists = allLikes.find((like) => like.email === newLike.email);

  if (!likeExists) {
    comment.likes.push(newLike);
    comment.save();
    return res.json({ message: "Comment Liked" });
  }

  let index = allLikes.indexOf(likeExists[0]);
  allLikes.splice(index, 1);

  comment.likes = [];
  comment.likes = [...allLikes];
  comment.save();
  return res.json({ message: "Like removed" });
};

export const replyToComment = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The comment ID is required" });

  const comment = await Comment.findOne({ _id: req.params.id });

  if (!comment) return res.status(204).json({ message: "comment not found" });

  try {
    let dateNow = new Date();
    let newComment = {
      blog_id: req.params.id,
      names: req.user.names,
      comment: req.body.comment,
      date: dateNow.toISOString(),
    };

    let result = await Comment.create(newComment);
    return res.json({ message: "reply posted" });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getReplies = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The comment ID is required" });

  const comment = await Comment.findOne({ _id: req.params.id });

  if (!comment) return res.status(204).json({ message: "comment not found" });

  const replies = await Comment.find({ blog_id: req.params.id }); //make no mistake here, the blog_id here should be like comment_id but I had to save time and reuse the model

  res.json(replies ? replies : []);
};

export default {
  commentToBlog,
  getComments,
  likeComment,
  replyToComment,
  getReplies,
};
