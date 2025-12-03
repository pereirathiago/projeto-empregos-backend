interface IApplyToJobDTO {
  job_id: number
  user_id: number
  name: string
  email?: string
  phone?: string
  education: string
  experience: string
}

export { IApplyToJobDTO }
