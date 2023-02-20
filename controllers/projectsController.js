import Project from "../model/Project.js";
import cloudinaryUpload from "../config/cloudinaryUpload.js";

export const getAllProjects = async (req, res) => {
  let projects = await Project.find();

  if (!projects) return res.status(204).json({ message: "No projects found" });

  res.json(projects ? projects : []);
};

export const createNewProject = async (req, res) => {
  let uploaded_img = {};
  let allImages = "";
  if (process.env.NODE_ENV !== "test") {
    if (req.files) {
      const files = req.files;

      for (const file of files) {
        const { path } = file;
        uploaded_img = await cloudinaryUpload(path);
        allImages += `${uploaded_img.url},`;
      }
    }
  } else {
    uploaded_img = { url: "none" };
    allImages = uploaded_img.url;
  }

  try {
    const result = await Project.create({
      title: req.body.title,
      tools: req.body.tools,
      description: req.body.description,
      image: allImages,
    });

    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const findProject = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "The project ID is required" });

  const project = await Project.findOne({ _id: req.params.id });

  if (!project)
    return res.status(204).json({ message: "No project matches the given ID" });

  res.json(project);
};
export default { getAllProjects, findProject, createNewProject };
