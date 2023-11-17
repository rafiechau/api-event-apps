const Joi = require('joi');

exports.userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    address: Joi.string().min(5).max(100),
    phoneNumber: Joi.string().min(10).max(15)
});

exports.eventValidateSchema = Joi.object({
    title: Joi.string().required().min(3).max(50),
    date: Joi.date().iso().required(),
    venueName: Joi.string().required().min(3).max(100),
    jumlahTicket: Joi.number().integer().required().min(1)
})

exports.profileSchema = Joi.object({
    firstName: Joi.string().min(2).max(30),
    lastName: Joi.string().min(2).max(30),
    address: Joi.string().min(5).max(100),
    phoneNumber: Joi.string().min(10).max(15)
})

exports.adminSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

exports.forgotSchema = Joi.object({
    email: Joi.string().email().required(),
});


exports.passwordChangeSchema = Joi.object({
    oldPassword: Joi.string()
                    .min(6) // Minimal 6 karakter
                    .required()
                    .messages({
                        'string.base': `"oldPassword" harus berupa teks`,
                        'string.empty': `"oldPassword" tidak boleh kosong`,
                        'string.min': `"oldPassword" harus memiliki minimal {#limit} karakter`,
                        'any.required': `"oldPassword" wajib diisi`
                    }),

    newPassword: Joi.string()
                    .min(6) // Minimal 6 karakter
                    .required()
                    .messages({
                        'string.base': `"newPassword" harus berupa teks`,
                        'string.empty': `"newPassword" tidak boleh kosong`,
                        'string.min': `"newPassword" harus memiliki minimal {#limit} karakter`,
                        'any.required': `"newPassword" wajib diisi`
                    })
});

