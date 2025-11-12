import { ICreateJobSeekerUserDTO } from '@modules/jobSeekers/dtos/ICreateJobSeekerDTO'
import { IUpdateJobSeekerUserDTO } from '@modules/jobSeekers/dtos/IUpdateJobSeekerDTO'
import { yup } from '@utils/customYup'
import * as Yup from 'yup'

const createJobSeekerValidation: Yup.ObjectSchema<ICreateJobSeekerUserDTO> = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(4)
    .max(150)
    .transform((value) => value?.toUpperCase()),
  username: Yup.string()
    .required()
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z0-9]+$/, 'invalid_format'),
  password: Yup.string()
    .required()
    .min(3)
    .max(20)
    .matches(/^[a-zA-Z0-9]+$/, 'invalid_format'),
  email: yup.string().optional().nullable().email('invalid_format'),
  phone: Yup.string()
    .optional()
    .nullable()
    .test('phone-validation', 'invalid_format', function (value) {
      if (!value || value === '') return true
      const onlyNumbers = value.replace(/\D/g, '')
      if (onlyNumbers.length < 10 || onlyNumbers.length > 14) return false
      return true
    }),
  experience: Yup.string()
    .optional()
    .nullable()
    .test('experience-validation', 'too_short', function (value) {
      if (!value || value === '') return true
      if (value.length < 10) return false
      return true
    })
    .test('experience-validation', 'too_long', function (value) {
      if (!value || value === '') return true
      if (value.length > 600) {
        return false
      }
      return true
    }),
  education: Yup.string()
    .optional()
    .nullable()
    .test('education-validation', 'too_short', function (value) {
      if (!value || value === '') return true
      if (value.length < 10) return false
      return true
    })
    .test('experience-validation', 'too_long', function (value) {
      if (!value || value === '') return true
      if (value.length > 600) {
        return false
      }
      return true
    }),
})

const updateJobSeekerValidation: Yup.ObjectSchema<IUpdateJobSeekerUserDTO> = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(4)
    .max(150)
    .transform((value) => value?.toUpperCase()),
  password: Yup.string()
    .optional()
    .nullable()
    .test('password-validation', 'invalid_format', function (value) {
      if (!value || value === '') return true
      if (value.length < 3 || value.length > 20) return false
      if (!/^[a-zA-Z0-9]+$/.test(value)) return false
      return true
    }),
  email: yup.string().optional().nullable().email('invalid_format'),
  phone: Yup.string()
    .optional()
    .nullable()
    .test('phone-validation', 'invalid_format', function (value) {
      if (!value || value === '') return true
      const onlyNumbers = value.replace(/\D/g, '')
      if (onlyNumbers.length < 10 || onlyNumbers.length > 14) return false
      return true
    }),
  experience: Yup.string()
    .optional()
    .nullable()
    .test('experience-validation', 'too_short', function (value) {
      if (!value || value === '') return true
      if (value.length < 10) return false
      return true
    })
    .test('experience-validation', 'too_long', function (value) {
      if (!value || value === '') return true
      if (value.length > 600) {
        return false
      }
      return true
    }),
  education: Yup.string()
    .optional()
    .nullable()
    .test('education-validation', 'too_short', function (value) {
      if (!value || value === '') return true
      if (value.length < 10) return false
      return true
    })
    .test('experience-validation', 'too_long', function (value) {
      if (!value || value === '') return true
      if (value.length > 600) {
        return false
      }
      return true
    }),
})

export { createJobSeekerValidation, updateJobSeekerValidation }
