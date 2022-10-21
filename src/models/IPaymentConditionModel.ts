import * as yup from 'yup'

export interface IPaymentConditionModel {
    id: string,
    name: string,
    active: boolean,
    idcompany: string
} 

export const paymentConditionValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome da condição de pagamento é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})