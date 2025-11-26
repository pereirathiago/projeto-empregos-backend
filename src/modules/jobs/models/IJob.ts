interface IJob {
  id: number
  company_id: number
  title: string
  area: string
  description: string
  state: string
  city: string
  salary: number | null
  created_at: Date
  updated_at: Date
}

export { IJob }
