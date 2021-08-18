const Joi = require('joi');

const schema = Joi.object({
    selectedView: {
        id: Joi.number().required(),
        name: Joi.string().required()
    },
    albumName: Joi.string().required(),
    allowPrivateMode: Joi.boolean().required(),
    allowLocation: Joi.boolean().required(),
    allowCamera: Joi.boolean().required(),
    privatePassword: Joi.string().allow(null)
});

const validateConfig = (config) => {
    return schema.validate(config);
}

module.exports = validateConfig;