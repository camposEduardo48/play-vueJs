// import { z } from './../../node_modules/zod/lib/index.js'

// export interface UserDatas {
//   id: string
//   nickname: string
//   email: string
//   createdAt: string
// }

// export const UserSchema = z.object({
//   firstName: z.string(),
//   lastName: z.string(),
//   nickname: z.string(),
//   email: z.string(),
//   password: z.string(),
//   agreePermissions: z.boolean(),
// })

// type newUserDatasSchemaType = z.infer<typeof newUserDatasSchema>
// UserSchema.safeParse()

export interface TaskData {
	id: string
	title: string
	status?: string
	systemOption: string
	description: string
	cardColor: string
	priority: boolean
	createdAt?: string
}
export interface StepData extends TaskData {
	id: string
	titleStep: string
	descriptionStep: string
	checked: boolean
}
