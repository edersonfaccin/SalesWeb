import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { Column, FormWithSave, Row } from '../../src/components/utils/Form'
import { cityValidationSchema, ICityModel } from '../../src/models/ICityModel'
import InputText from '../../src/components/inputs/InputText'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { cityApi, stateApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputCheckBox from '../../src/components/inputs/InputCheckBox'
import InputSelect from '../../src/components/inputs/InputSelect'

const City = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<ICityModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(cityApi, `${router.query?.id}`).then((resp: any) => {
        setData({
          ...resp,
          idstate: resp?.idstate?.id,
        })

        setTimeout(() => {
          setRendering(false)
        }, 200);
      })
    }else{
      setRendering(true)

      setData({
        ...data,
        active: true,
        idstate: '',
        idcompany: user?.idcompany,
        name: ''
      })

      setTimeout(() => {
        setRendering(false)
      }, 200)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(cityApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(cityApi, '', values).then(_ => {
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
      thirthName={'Cidades'} thirthRoute={'/fiscal/cities'}
      fourthName={'Cidade'} fourthRoute={'/fiscal/city'}>
      
      <Formik
        validationSchema={cityValidationSchema}
        validateOnMount={true}
        initialValues={data}
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'Cidade'}>
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
                  <InputSelect 
                    label={'Estado'} 
                    // @ts-ignore
                    value={values?.idstate}
                    onChange={val => {
                      setFieldValue('idstate', val)
                    }}
                    api={stateApi}
                    invalid={errors?.idstate?.length > 0 && !!touched?.idstate}
                    textError={errors?.idstate?.toString()}
                  />
                </Row>
              </FormWithSave>
            )
          }}
      </Formik>  
    </MenuDefault>
  )
}

export default City