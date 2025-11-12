interface IUpdateJobSeekerUserDTO {
  name: string
  password?: string
  phone?: string
  email?: string
  experience?: string
  education?: string
}

interface IUpdateJobSeekerDTO {
  experience?: string
  education?: string
}

export { IUpdateJobSeekerDTO, IUpdateJobSeekerUserDTO }
