const {z} = require('zod');

const registerSchema = z.object({
    user: z.string({
        required_error: 'Username es requerido'
    }),
    password: z.string({
        required_error: 'Password es requerida'
    }).min(6, {
        mensaje: 'Password debe tener 6 caracteres'
    })
});

const loginSchema = z.object({
    user: z.string({
        required_error: 'Usuario es requerido',
    }),
    password: z.string({
        required_error: 'Password es requerida'
    }).min(6,{
        mensaje: 'Password debe tener 6 caracteres'
    })
})

module.exports = {
    registerSchema,
    loginSchema
}