interface IUpdateCompanyUserDTO {
  name: string
  password: string
  email: string
  phone: string
  business: string
  street: string
  number: string
  city: string
  state: string
}

interface IUpdateCompanyDTO {
  business: string
  street: string
  number: string
  city: string
  state: string
}

export { IUpdateCompanyDTO, IUpdateCompanyUserDTO }
