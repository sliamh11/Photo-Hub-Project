const Joi = require('joi');

const schema = Joi.object({
    src: Joi.string().required(),
    caption: Joi.string().min(1).allow(null),
    categories: Joi.array().items(
        Joi.object({
            id: Joi.number().allow(null),
            name: Joi.string().allow(null)
        })
    ),
    location: Joi.required().allow(null),
    isFavorite: Joi.boolean().allow(null),
    isPrivate: Joi.boolean().allow(null)
});

const validatePhoto = (photo) => {
    return schema.validate(photo);
}

module.exports = validatePhoto;