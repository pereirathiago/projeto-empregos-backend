import * as Yup from 'yup'

const errorLogValidation = Yup.object().shape({
  message: Yup.string().required().min(1).max(1000),
})

export { errorLogValidation }
