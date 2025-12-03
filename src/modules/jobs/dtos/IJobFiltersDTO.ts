interface IJobFiltersDTO {
  title?: string
  area?: string
  company?: string
  state?: string
  city?: string
  salary_range?: {
    min?: number | null
    max?: number | null
  }
}

export { IJobFiltersDTO }
