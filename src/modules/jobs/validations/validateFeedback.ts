import * as yup from 'yup'

const feedbackSchema = yup.object({
  user_id: yup.number().required('ID do usuário é obrigatório'),
  message: yup
    .string()
    .required('Mensagem é obrigatória')
    .min(10, 'Mensagem deve ter no mínimo 10 caracteres')
    .max(600, 'Mensagem deve ter no máximo 600 caracteres'),
})

const feedbackValidation = async (data: any) => {
  try {
    await feedbackSchema.validate(data, { abortEarly: false })
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const validationErrors: Record<string, string> = {}
      error.inner.forEach((err) => {
        if (err.path) {
          validationErrors[err.path] = err.message
        }
      })
      throw validationErrors
    }
    throw error
  }
}

export { feedbackValidation }
