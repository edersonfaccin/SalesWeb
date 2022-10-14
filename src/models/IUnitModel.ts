import * as yup from 'yup'

export interface IUnitModel {
    id: string,
    name: string,
    initials: string,
    active: boolean,
    idcompany: string
} 

export const unitValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome da unidade é obrigatório'),
    initials: yup
      .string()
      .required('Sigla é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})