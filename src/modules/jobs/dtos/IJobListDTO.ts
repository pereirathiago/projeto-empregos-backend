interface IJobListDTO {
  job_id: number
  title: string
  area: string
  company: string
  description: string
  state: string
  city: string
  salary: number | null
  contact: string
}

export { IJobListDTO }
