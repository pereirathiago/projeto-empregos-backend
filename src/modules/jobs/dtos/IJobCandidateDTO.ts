interface IJobCandidateDTO {
  user_id: number
  name: string
  email: string | null
  phone: string | null
  education: string
  experience: string
  feedback: string | null
}

export { IJobCandidateDTO }
