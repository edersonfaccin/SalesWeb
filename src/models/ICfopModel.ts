import * as yup from 'yup'

export interface ICfopModel {
    id: string,
    name: string,
    ipi_percent: number,
    active: boolean,
    idcompany: string
} 

export const cfopValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome do CFOP é obrigatório'),
    ipi_percent: yup
      .number()
      .required('Percentual IPI é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})