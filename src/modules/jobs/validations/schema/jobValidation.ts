import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO'
import * as Yup from 'yup'

const VALID_AREAS = [
  'Administração',
  'Agricultura',
  'Artes',
  'Atendimento ao Cliente',
  'Comercial',
  'Comunicação',
  'Construção Civil',
  'Consultoria',
  'Contabilidade',
  'Design',
  'Educação',
  'Engenharia',
  'Finanças',
  'Jurídica',
  'Logística',
  'Marketing',
  'Produção',
  'Recursos Humanos',
  'Saúde',
  'Segurança',
  'Tecnologia da Informação',
  'Telemarketing',
  'Vendas',
  'Outros',
]

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

const createJobValidation: Yup.ObjectSchema<Omit<ICreateJobDTO, 'company_id'>> = Yup.object().shape({
  title: Yup.string().required().min(3).max(150),
  area: Yup.string()
    .required()
    .test('area-validation', 'invalid_area', function (value) {
      if (!value) return false
      return VALID_AREAS.includes(value)
    }),
  description: Yup.string().required().min(10).max(5000),
  state: Yup.string()
    .required()
    .length(2)
    .test('state-validation', 'invalid_state', function (value) {
      if (!value) return false
      return VALID_STATES.includes(value.toUpperCase())
    })
    .transform((value) => value?.toUpperCase()),
  city: Yup.string().required().min(2).max(150),
  salary: Yup.number()
    .optional()
    .nullable()
    .positive()
    .test('salary-validation', 'must_be_positive', function (value) {
      if (value === undefined || value === null) return true
      return value > 0
    }),
})

export { createJobValidation }
