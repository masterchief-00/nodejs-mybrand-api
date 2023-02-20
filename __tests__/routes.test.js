import request from "supertest";
import app from "../server.js";
import User from "../model/User.js";
import Blog from "../model/Blog.js";
import Query from "../model/Query.js";
import Comment from "../model/Comment.js";
import Project from "../model/Project.js";
import mongoose from "mongoose";

let _TOKEN = "";
let blog_id = "";
let project_id = "";
let query_id = "";
let comment_id = "";

describe("TEST: Register User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should create a new user", async () => {
    const res = await request(app).post("/users/signup").send({
      names: "Shola Song",
      email: "song@gmail.com",
      password: "12345678",
      conf_password: "12345678",
    });
    expect(res.statusCode).toEqual(200);
  });
}, 20000);

describe("TEST: authenticate user", () => {
  it("Should log the user into the system", async () => {
    const res = await request(app).post("/users/login").send({
      email: "song@gmail.com",
      password: "12345678",
    });

    expect(res.body.token).not.toEqual("");
    _TOKEN = res.body.token;
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Retrieve all users", () => {
  it("Should return an array of all users", async () => {
    const res = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${_TOKEN}`);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog create", () => {
  it("Should create a new blog", async () => {
    const res = await request(app)
      .post("/blogs")
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        title: "A test blog title",
        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        category: "Technology",
      });
    blog_id = res.body._id;
    expect(res.statusCode).toEqual(201);
  });
});

describe("TEST: Blog update", () => {
  it("Should Update blog by ID", async () => {
    const res = await request(app)
      .put(`/blogs/${blog_id}`)
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        title: "A test blog title updated",
        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum updated",
        category: "Technology",
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog retrival", () => {
  it("Should return an array of all blogs", async () => {
    const res = await request(app).get("/blogs");

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Single blog retrival", () => {
  it("Should retrive one blog by ID", async () => {
    const res = await request(app).get(`/blogs/${blog_id}`);
    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: similar blogs retrival", () => {
  it("Should retrive one blog by category", async () => {
    const res = await request(app).get(`/blogs/${blog_id}/similar`);
    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog likes", () => {
  it("Should register a like to a blog by ID", async () => {
    const res = await request(app)
      .get(`/blogs/${blog_id}/likes`)
      .set("Authorization", `Bearer ${_TOKEN}`);

    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog commenting", () => {
  it("Should create a comment to a blog by ID", async () => {
    const res = await request(app)
      .post(`/blogs/${blog_id}/comments`)
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        comment: "oh I agree!",
      });
    comment_id = res.body.id;

    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: comments retrival", () => {
  it("Should retrive comments by blog", async () => {
    const res = await request(app)
      .get(`/blogs/${blog_id}/comments`)
      .set("Authorization", `Bearer ${_TOKEN}`);

    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: comments retrival", () => {
  it("Should retrive a single comment", async () => {
    const res = await request(app)
      .get(`/comments/${comment_id}`)
      .set("Authorization", `Bearer ${_TOKEN}`);

    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Comment likes", () => {
  it("Should register a like to a comment by ID", async () => {
    const res = await request(app)
      .get(`/comments/${comment_id}/likes`)
      .set("Authorization", `Bearer ${_TOKEN}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Replying", () => {
  it("Should create a reply to a comment by ID", async () => {
    const res = await request(app)
      .post(`/comments/${comment_id}/reply`)
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        comment: "oh I agree!",
      });
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Replies retrival", () => {
  it("Should retrive replies by comment", async () => {
    const res = await request(app)
      .get(`/comments/${comment_id}/replies`)
      .set("Authorization", `Bearer ${_TOKEN}`);

    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog deletion", () => {
  it("Should delete blog by ID", async () => {
    const res = await request(app)
      .delete(`/blogs/${blog_id}`)
      .set("Authorization", `Bearer ${_TOKEN}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Query sending", () => {
  it("Should send query", async () => {
    const res = await request(app).post("/queries").send({
      names: "John Doe",
      email: "doe@gmail.com",
      body: "Great stuff",
    });
    query_id = res.body._id;
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Query deletion", () => {
  it("Should delete query by ID", async () => {
    const res = await request(app)
      .delete(`/queries/${query_id}`)
      .set("Authorization", `Bearer ${_TOKEN}`);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Project create", () => {
  it("Should create a new project", async () => {
    const res = await request(app)
      .post("/projects")
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        title: "A test blog title",
        description:
          "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        tools: "Blender,GIMP",
      });
    project_id = res.body._id;
    expect(res.statusCode).toEqual(201);
  });
});

describe("TEST: Projects retrival", () => {
  it("Should return an array of all projects", async () => {
    const res = await request(app).get("/projects");

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Single Project retrival", () => {
  it("Should retrive one project by ID", async () => {
    const res = await request(app).get(`/projects/${project_id}`);
    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: log the user out", () => {
  it("Should remove the user token", async () => {
    const res = await request(app)
      .get("/users/logout")
      .set("Authorization", `Bearer ${_TOKEN}`);
    expect(res.statusCode).toEqual(200);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});
    await Query.deleteMany({});
    await Comment.deleteMany({});
    await Project.deleteMany({});
    await mongoose.connection.close();
  });
});
