import * as yup from 'yup'

export interface ICountryModel {
    id: string,
    name: string,
    active: boolean,
    idcompany: string
} 

export const countryValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome do país é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})