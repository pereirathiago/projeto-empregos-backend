interface IJobDetailsDTO {
  job_id: number
  title: string
  area: string
  description: string
  company: string
  state: string
  city: string
  contact: string
  salary: number | null
}

export { IJobDetailsDTO }
