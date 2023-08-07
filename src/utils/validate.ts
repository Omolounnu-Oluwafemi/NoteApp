import Joi from 'joi'

export const signUpValidator = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).lowercase().required(),
    firstname: Joi.string().alphanum().required(),
    lastname: Joi.string().alphanum().required(),
    password: Joi.string().min(3).max(30).required(),
})

export const signInValidator = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(3).max(30).required(),
})

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        }
    }
}