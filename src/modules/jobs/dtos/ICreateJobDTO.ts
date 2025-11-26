interface ICreateJobDTO {
  company_id: number
  title: string
  area: string
  description: string
  state: string
  city: string
  salary?: number
}

export { ICreateJobDTO }
