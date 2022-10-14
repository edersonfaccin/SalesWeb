import * as yup from 'yup'

export interface IIcmsTableModel {
    id: string,
    percent: number,
    idstate_origin: string
    idstate_destination: string
    idcompany: string
} 

export const icmsTableValidationSchema = yup.object().shape({
    percent: yup
      .number()
      .required('Percentual é obrigatório'),
    idstate_origin: yup
      .string()
      .required('Estado de origem é obrigatório'),
    idstate_destination: yup
      .string()
      .required('Estado de destino é obrigatório'),
})