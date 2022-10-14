import * as yup from 'yup'

export interface IStateModel {
    id: string,
    name: string,
    uf: string
    active: boolean,
    idcountry: string
    idcompany: string
} 

export const stateValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome do estado é obrigatório'),
    uf: yup
      .string()
      .required('UF é obrigatório'),
    idcountry: yup
      .string()
      .required('Pais é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})