import * as yup from 'yup'

export interface IPaymentMethodModel {
    id: string,
    name: string,
    active: boolean,
    idcompany: string
} 

export const paymentMethodValidationSchema = yup.object().shape({
    name: yup
      .string()
      .required('Nome da forma de pagamento é obrigatório'),
    active: yup
      .boolean()
      .required()
      .default(true)
})