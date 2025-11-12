import { ICreateCompanyUserDTO } from '@modules/companies/dtos/ICreateCompanyDTO'
import { IUpdateCompanyUserDTO } from '@modules/companies/dtos/IUpdateCompanyDTO'
import { yup } from '@utils/customYup'
import * as Yup from 'yup'

const VALID_STATES = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]

const createCompanyValidation: Yup.ObjectSchema<ICreateCompanyUserDTO> = Yup.object().shape({
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
  email: yup.string().required().min(10).max(150).email('invalid_format'),
  phone: Yup.string()
    .required()
    .test('phone-validation', 'invalid_format', function (value) {
      if (!value) return false
      if (/[^0-9]/.test(value)) return false 
      if (value.length < 10 || value.length > 12) return false
      return true
    }),
  business: Yup.string().required().min(4).max(150),
  street: Yup.string().required().min(3).max(150),
  number: Yup.string()
    .required()
    .min(1)
    .max(8)
    .test('number-validation', 'invalid_format', function (value) {
      if (!value) return false
      if (value === '') return true
      const num = parseInt(value, 10)
      if (isNaN(num) || num < 0 || !Number.isInteger(num)) return false
      return true
    }),
  city: Yup.string().required().min(3).max(150),
  state: Yup.string()
    .required()
    .length(2)
    .test('state-validation', 'invalid_format', function (value) {
      if (!value) return false
      return VALID_STATES.includes(value.toUpperCase())
    })
    .transform((value) => value?.toUpperCase()),
})

const updateCompanyValidation: Yup.ObjectSchema<IUpdateCompanyUserDTO> = Yup.object().shape({
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
  email: yup.string().required().min(10).max(150).email('invalid_format'),
  phone: Yup.string()
    .required()
    .test('phone-validation', 'invalid_format', function (value) {
      if (!value) return false
      if (/[^0-9]/.test(value)) return false 
      if (value.length < 10 || value.length > 12) return false
      return true
    }),
  business: Yup.string().required().min(4).max(150),
  street: Yup.string().required().min(3).max(150),
  number: Yup.string()
    .required()
    .min(1)
    .max(8)
    .test('number-validation', 'invalid_format', function (value) {
      if (!value) return false
      if (value === '') return true
      const num = parseInt(value, 10)
      if (isNaN(num) || num < 0 || !Number.isInteger(num)) return false
      return true
    }),
  city: Yup.string().required().min(3).max(150),
  state: Yup.string()
    .required()
    .length(2)
    .test('state-validation', 'invalid_format', function (value) {
      if (!value) return false
      return VALID_STATES.includes(value.toUpperCase())
    })
    .transform((value) => value?.toUpperCase()),
})

export { createCompanyValidation, updateCompanyValidation }
