import Joi from "joi";

export const person_schema = Joi.object().keys({
  names: Joi.string().min(3).max(40).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net","rw"] },
  }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  conf_password: Joi.ref("password"),
});

export const login_schema = Joi.object().keys({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const blog_schema = Joi.object().keys({
  title: Joi.string().min(7).max(35).required(),
  //   image: Joi.required(),
  date: Joi.string(),
  body: Joi.string().min(15).required(),
});

export const query_schema = Joi.object().keys({
  names: Joi.string().min(3).max(20).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  body: Joi.string().min(5).required(),
  date: Joi.string().required(),
});
export default { person_schema, login_schema, blog_schema, query_schema };
