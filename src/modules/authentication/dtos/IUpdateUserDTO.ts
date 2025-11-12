interface IUpdateUserDTO {
  name: string
  email?: string | null
  phone?: string | null
  password?: string
}

export { IUpdateUserDTO }
