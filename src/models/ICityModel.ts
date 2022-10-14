import * as yup from 'yup'

export interface ICityModel {
    id: string,
    name: string,
    active: boolean,
    idstate: string
    idcompany: string
} 

export const cityValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome da cidade é obrigatório'),
      idstate: yup
      .string()
      .required('Estado é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})