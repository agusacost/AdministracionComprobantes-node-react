const {z} = require('zod');

const createTicketSchema = z.object({
    nombre: z.string({
        required_error: 'Nombre es requerido'
    }),
    apellido: z.string({
        required_error: 'Apellido es requerido'
    }),
    colegio: z.string({
        required_error: 'Colegio es requerido'
    }),
    dni: z.string({
        required_error:'DNI es requerido'
    }),
    date: z.string().datetime().optional(),
    serie: z.string({
        required_error: 'Numero de serie es obligatorio'
    }),
    listo: z.boolean().optional()
})

module.exports={
    createTicketSchema
}   