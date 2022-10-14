import * as yup from 'yup'

export interface IBankModel {
    id: string,
    name: string,
    bank_number: string,
    active: boolean,
    idcompany: string
} 

export const bankValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome do banco é obrigatório'),
      bank_number: yup
      .string()
      .required('Número do banco é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})