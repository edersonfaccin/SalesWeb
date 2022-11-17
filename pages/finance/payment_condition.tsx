import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { Column, FormWithSave, Row } from '../../src/components/utils/Form'
import { paymentConditionValidationSchema, IPaymentConditionModel } from '../../src/models/IPaymentConditionModel'
import InputText from '../../src/components/inputs/InputText'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { paymentConditionApi, paymentConditionInstallmentApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputCheckBox from '../../src/components/inputs/InputCheckBox'
import { Column as Column2 } from '../../src/types/TableList';

const PaymentCondition = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<IPaymentConditionModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  const tableColumns: Column2[] = [
    {
      Header: 'Percentual',
      accessor: 'percent' as const,
      nameField: 'percent'
    }, {
      Header: 'Dias',
      accessor: 'days' as const,
      nameField: 'days'
    }, {
      Header: 'Ações',
      accessor: 'action' as const,
      nameField: 'action'
    }
  ];

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(paymentConditionApi, `${router.query?.id}`).then((resp: any) => {
        setData(resp)

        setRendering(false)
      })
    }else{
      setRendering(true)

      setData({
        ...data,
        active: true,
        idcompany: user?.idcompany,
        name: ''
      })

      setRendering(false)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(paymentConditionApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(paymentConditionApi, '', values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }
  }

  if(rendering){
    return (
      <SpinnerDefault />
    )
  }

  return (
    <MenuDefault 
      firstName={'Início'} firstRoute={'/'} 
      secondName={'Financeiro'} secondRoute={'/finance'}
      thirthName={'Condições de Pagamentos'} thirthRoute={'/finance/payment_conditions'}
      fourthName={'Condição de Pagamento'} fourthRoute={'/finance/payment_condition'}>
      
      <Formik
        validationSchema={paymentConditionValidationSchema}
        validateOnMount={true}
        initialValues={data}
        enableReinitialize
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'País'}>
                <Row>
                  <InputCheckBox 
                    label='Ativo'
                    value={values?.active}
                    onChange={val => {
                      setFieldValue('active', val)
                    }}
                  />
                </Row>
                <Row>
                  <Column flex={1}>
                    <InputText 
                      label={'Nome'} 
                      type={'text'}
                      value={values?.name}
                      onChange={val => {
                        setFieldValue('name', val)
                      }}
                      invalid={errors?.name?.length > 0 && !!touched?.name}
                      textError={errors?.name?.toString()}
                    />
                  </Column>
                </Row>
                <Row>
                  
                </Row>
              </FormWithSave>
            )
          }}
      </Formik>  
    </MenuDefault>
  )
}

export default PaymentCondition