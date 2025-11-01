interface ICreateCompanyUserDTO {
  name: string
  username: string
  password: string
  email: string
  phone: string
  business: string
  street: string
  number: string
  city: string
  state: string
}

interface ICreateCompanyDTO {
  user_id: number
  business: string
  street: string
  number: string
  city: string
  state: string
}

export { ICreateCompanyDTO, ICreateCompanyUserDTO }
