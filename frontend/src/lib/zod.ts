import { z } from 'zod'

export const UserDatasSchema = z.object({
	firstName: z.string().min(3, { message: 'Deve conter no minímo 3 caracteres' }),
	lastName: z.string().min(3, { message: 'Deve conter no minímo 3 caracteres' }),
	nickname: z.string().min(3, { message: 'Deve conter no minímo 3 caracteres' }),
	email: z.string().email({ message: 'Formato de email inválido!' }),
	password: z.string().min(5, { message: 'Senha muito curta' }),
	agreePermissions: z.boolean(),
})
