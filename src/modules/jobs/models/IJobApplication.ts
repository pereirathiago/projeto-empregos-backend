interface IJobApplication {
  id: number
  job_id: number
  user_id: number
  name: string
  email: string | null
  phone: string | null
  education: string
  experience: string
  feedback: string | null
  created_at: Date
  updated_at: Date
}

export { IJobApplication }
