import * as yup from 'yup'

export interface ICategoryModel {
    id: string,
    name: string,
    active: boolean,
    idcompany: string
} 

export const categoryValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome da categoria é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})