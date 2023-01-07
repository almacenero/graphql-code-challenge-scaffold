import * as Joi from 'joi';

const postValidator = Joi.object().keys({
  title: Joi.string().min(10),
  body: Joi.string(),
});

export default postValidator