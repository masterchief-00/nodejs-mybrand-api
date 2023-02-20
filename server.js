import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import connectDB from "./config/connectDB.js";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions.js";
import * as config_file from "./config/passportConfig.js";
import blog_routes from "./routes/api/blog_routes.js";
import query_routes from "./routes/api/queries_routes.js";
import user_routes from "./routes/api/user_routes.js";
import comment_routes from "./routes/api/comment_routes.js";
import project_routes from "./routes/api/project_routes.js";

export const app = express();
app.use(
  session({
    secret: process.env.SESSION_SEKRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
// connect to db
connectDB();

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());
config_file.passport_signup(passport);
config_file.passport_login(passport);

app.use("/users", user_routes);
app.use("/blogs", blog_routes);
app.use("/queries", query_routes);
app.use("/comments", comment_routes);
app.use("/projects", project_routes);

export default app;
