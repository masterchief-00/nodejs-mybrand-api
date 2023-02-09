import request from "supertest";
import app from "../server.js";

let _TOKEN = "";

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

describe("TEST: Blog create", () => {
  it("Should create a new blog", async () => {
    const dateNow = new Date();
    const res = await request(app)
      .post("/blogs")
      .set("Authorization", `Bearer ${_TOKEN}`)
      .send({
        title: "A test blog title",
        body: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
        date: dateNow.toISOString(),
      });

    expect(res.statusCode).toEqual(201);
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
    const res = await request(app).get("/blogs/63e4f9b4efcbdb481745b8d1");
    expect(res.body).not.toEqual("");
    expect(res.statusCode).toEqual(200);
  });
});

describe("TEST: Blog likes", () => {
  it("Should register a like to a blog by ID", async () => {
    const res = await request(app)
      .get("/blogs/63e4f9b4efcbdb481745b8d1/likes")
      .set("Authorization", `Bearer ${_TOKEN}`);

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
});
