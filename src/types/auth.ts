export type SigninUser = { email: string, password: string }
export type SignupUser = { firstName?: string, lastName?: string} & SigninUser
