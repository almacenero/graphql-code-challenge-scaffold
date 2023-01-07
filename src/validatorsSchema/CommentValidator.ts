import * as Joi from 'joi';

const commentValidator = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  body: Joi.string(),
});

export default commentValidator