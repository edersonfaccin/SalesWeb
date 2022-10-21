import * as yup from 'yup'

export interface IProductModel {
    id: string,
    name: string,
    description: string
    reference: string
    net_weight: number
    gross_weight: number
    height: number
    width: number
    length: number
    active: boolean,
    idcompany: string
    idcolor: string
    idcategory: string
    idunit: string
}

export const productValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome do produto é obrigatório'),
    description: yup
      .string()
      .required('Descrição do produto é obrigatório'),
    reference: yup
      .string()
      .required('Descrição do produto é obrigatório'),
    net_weight: yup
      .number(),
    gross_weight: yup
      .number(),
    height: yup
      .number(),
    width: yup
      .number(),
    length: yup
      .number(),
    idcolor: yup
      .string(),
    idcategory: yup
      .string(),
    idunit: yup
      .string(),
    active: yup
      .boolean()
      .required()
      .default(true)
})