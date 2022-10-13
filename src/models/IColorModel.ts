import * as yup from 'yup'

export interface IColorModel {
    id: string,
    name: string,
    active: boolean,
    idcompany: string
} 

export const colorValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})