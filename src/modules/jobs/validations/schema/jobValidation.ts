import { ICreateJobDTO } from '@modules/jobs/dtos/ICreateJobDTO'
import { IJobFiltersDTO } from '@modules/jobs/dtos/IJobFiltersDTO'
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
    .test('state-validation', 'invalid_state', function (value) {
      if (!value) return false
      return VALID_STATES.includes(value.toUpperCase())
    })
    .transform((value) => value?.toUpperCase()),
  city: Yup.string().required(),
  salary: Yup.number()
    .optional()
    .nullable()
    .positive()
    .test('salary-validation', 'must_be_positive', function (value) {
      if (value === undefined || value === null) return true
      return value > 0
    }),
})

const jobFiltersValidation: Yup.ObjectSchema<{ filters: IJobFiltersDTO }> = Yup.object().shape({
  filters: Yup.object()
    .shape({
      title: Yup.string().optional().min(1).max(150),
      area: Yup.string()
        .optional()
        .test('area-validation', 'invalid_area', function (value) {
          if (!value) return true
          return VALID_AREAS.includes(value)
        }),
      state: Yup.string()
        .optional()
        .length(2)
        .test('state-validation', 'invalid_state', function (value) {
          if (!value) return true
          return VALID_STATES.includes(value.toUpperCase())
        })
        .transform((value) => (value ? value.toUpperCase() : value)),
      city: Yup.string().optional().min(2).max(150),
      salary_range: Yup.object()
        .optional()
        .nullable()
        .shape({
          min: Yup.number()
            .optional()
            .nullable()
            .test('min-validation', 'must_be_positive', function (value) {
              if (value === undefined || value === null) return true
              return value >= 0
            }),
          max: Yup.number()
            .optional()
            .nullable()
            .test('max-validation', 'must_be_positive', function (value) {
              if (value === undefined || value === null) return true
              return value >= 0
            }),
        }),
    })
    .optional()
    .default({}),
})

const searchJobsValidation: Yup.ObjectSchema<{ filters: IJobFiltersDTO[] }> = Yup.object().shape({
  filters: Yup.array()
    .max(1)
    .optional()
    .of(
      Yup.object()
        .shape({
          title: Yup.string()
            .optional()
            .transform((value) => (!value || value === '' ? undefined : value))
            .min(1)
            .max(150),
          area: Yup.string()
            .optional()
            .transform((value) => (!value || value === '' ? undefined : value))
            .test('area-validation', 'invalid_area', function (value) {
              if (!value) return true
              return VALID_AREAS.includes(value)
            }),
          company: Yup.string()
            .optional()
            .transform((value) => (!value || value === '' ? undefined : value))
            .min(1)
            .max(150),
          state: Yup.string()
            .optional()
            .transform((value) => (!value || value === '' ? undefined : value))
            .test('state-validation', 'invalid_state', function (value) {
              if (!value) return true
              return VALID_STATES.includes(value.toUpperCase())
            })
            .transform((value) => (value ? value.toUpperCase() : value)),
          city: Yup.string()
            .optional()
            .transform((value) => (!value || value === '' ? undefined : value)),
          salary_range: Yup.object()
            .optional()
            .nullable()
            .shape({
              min: Yup.number()
                .optional()
                .nullable()
                .transform((value) => (value === 0 || value === null || value === undefined || value == '' ? undefined : value))
                .test('min-validation', 'must_be_positive', function (value) {
                  if (value === undefined || value === null) return true
                  return value >= 0
                }),
              max: Yup.number()
                .optional()
                .nullable()
                .transform((value) => (value === 0 || value === null || value === undefined || value == '' ? undefined : value))
                .test('max-validation', 'must_be_positive', function (value) {
                  if (value === undefined || value === null) return true
                  return value >= 0
                }),
            })
            .transform((value) => {
              if (!value || (value.min === undefined && value.max === undefined)) return undefined
              return value
            }),
        })
        .optional()
        .default({}),
    ),
})

export { createJobValidation, jobFiltersValidation, searchJobsValidation }
