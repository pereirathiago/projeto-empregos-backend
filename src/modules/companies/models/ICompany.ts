interface ICompany {
  id: number
  user_id: number
  business: string
  street: string
  number: string
  city: string
  state: string
  created_at: Date
  updated_at: Date
}

interface IUserCompany {
  name: string
  username: string
  email: string
  phone: string
  business: string
  street: string
  number: string
  city: string
  state: string
}

export { ICompany, IUserCompany }
