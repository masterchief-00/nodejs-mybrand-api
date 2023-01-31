import Joi from "joi";

export const person = Joi.object().keys({
  name: Joi.string().alphanum().min(3).max(40).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  conf_password: Joi.ref("password"),
});

export const blog_schema = Joi.object().keys({
  title: Joi.string().min(7).max(35).required(),
  author: Joi.string().min(3).max(40).required(),
//   image: Joi.required(),
  date: Joi.string(),
  body: Joi.string().min(15).required(),
});

export default { person, blog_schema };
