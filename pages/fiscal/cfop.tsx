import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { Column, FormWithSave, Row } from '../../src/components/utils/Form'
import { cfopValidationSchema, ICfopModel } from '../../src/models/ICfopModel'
import InputText from '../../src/components/inputs/InputText'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { cfopApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputCheckBox from '../../src/components/inputs/InputCheckBox'

const Cfop = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<ICfopModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(cfopApi, `${router.query?.id}`).then((resp: any) => {
        setData(resp)

        setTimeout(() => {
          setRendering(false)
        }, 200);
      })
    }else{
      setRendering(true)

      setData({
        ...data,
        active: true,
        idcompany: user?.idcompany,
        ipi_percent: 0,
        name: ''
      })

      setTimeout(() => {
        setRendering(false)
      }, 200)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(cfopApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(cfopApi, '', values).then(_ => {
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
      secondName={'Fiscal'} secondRoute={'/fiscal'}
      thirthName={'CFOPs'} thirthRoute={'/fiscal/cfops'}
      fourthName={'CFOP'} fourthRoute={'/fiscal/cfop'}>
      
      <Formik
        validationSchema={cfopValidationSchema}
        validateOnMount={true}
        initialValues={data}
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'CFOP'}>
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
                  <Column flex={0.3}>
                    <InputText 
                      label={'(%) IPI'} 
                      type={'number'}
                      value={values?.ipi_percent}
                      onChange={val => {
                        setFieldValue('ipi_percent', val)
                      }}
                      invalid={errors?.ipi_percent?.length > 0 && !!touched?.ipi_percent}
                      textError={errors?.ipi_percent?.toString()}
                    />
                  </Column>
                  <Column flex={0.7}>
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
              </FormWithSave>
            )
          }}
      </Formik>  
    </MenuDefault>
  )
}

export default Cfop