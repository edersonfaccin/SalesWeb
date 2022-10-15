import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { FormWithSave, Row } from '../../src/components/utils/Form'
import { icmsTableValidationSchema, IIcmsTableModel } from '../../src/models/IIcmsTableModel'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { icmsTableApi, stateApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputSelect from '../../src/components/inputs/InputSelect'
import InputText from '../../src/components/inputs/InputText'

const IcmsTable = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<IIcmsTableModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(icmsTableApi, `${router.query?.id}`).then((resp: any) => {
        setData({
          ...resp,
          idstate_origin: resp?.idstate_origin?.id,
          idstate_destination: resp?.idstate_destination?.id
        })

        setTimeout(() => {
          setRendering(false)
        }, 200);
      })
    }else{
      setRendering(true)

      setData({
        ...data,
        idstate_origin: '',
        idstate_destination: '',
        idcompany: user?.idcompany,
        percent: 0
      })

      setTimeout(() => {
        setRendering(false)
      }, 200)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(icmsTableApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(icmsTableApi, '', values).then(_ => {
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
      thirthName={'Tabelas de ICMS'} thirthRoute={'/finance/icms_tables'}
      fourthName={'Tabela de ICMS'} fourthRoute={'/finance/icms_table'}>
      
      <Formik
        validationSchema={icmsTableValidationSchema}
        validateOnMount={true}
        initialValues={data}
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'Tabela de ICMS'}>
                <Row>
                  <InputSelect 
                    label={'Estado de origem'} 
                    // @ts-ignore
                    value={values?.idstate_origin}
                    onChange={val => {
                      setFieldValue('idstate_origin', val)
                    }}
                    api={stateApi}
                    invalid={errors?.idstate_origin?.length > 0 && !!touched?.idstate_origin}
                    textError={errors?.idstate_origin?.toString()}
                  />
                </Row>
                <Row>
                  <InputSelect 
                    label={'Estado de destino'} 
                    // @ts-ignore
                    value={values?.idstate_destination}
                    onChange={val => {
                      setFieldValue('idstate_destination', val)
                    }}
                    api={stateApi}
                    invalid={errors?.idstate_destination?.length > 0 && !!touched?.idstate_destination}
                    textError={errors?.idstate_destination?.toString()}
                  />
                </Row>
                <Row>
                    <InputText 
                      label={'Percentual'} 
                      type={'number'}
                      value={values?.percent}
                      onChange={val => {
                        setFieldValue('percent', val)
                      }}
                      invalid={errors?.percent?.length > 0 && !!touched?.percent}
                      textError={errors?.percent?.toString()}
                    />
                </Row>
              </FormWithSave>
            )
          }}
      </Formik>  
    </MenuDefault>
  )
}

export default IcmsTable