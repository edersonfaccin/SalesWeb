import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { Column, FormWithSave, Row } from '../../src/components/utils/Form'
import { stateValidationSchema, IStateModel } from '../../src/models/IStateModel'
import InputText from '../../src/components/inputs/InputText'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { countryApi, stateApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputCheckBox from '../../src/components/inputs/InputCheckBox'
import InputSelect from '../../src/components/inputs/InputSelect'

const State = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<IStateModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(stateApi, `${router.query?.id}`).then((resp: any) => {
        setData({
          ...resp,
          idcountry: resp?.idcountry?.id
        })

        setRendering(false)
      })
    }else{
      setRendering(true)

      setData({
        ...data,
        active: true,
        uf: '',
        idcountry: '',
        idcompany: user?.idcompany,
        name: ''
      })

      setRendering(false)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(stateApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(stateApi, '', values).then(_ => {
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
      thirthName={'Estados'} thirthRoute={'/fiscal/states'}
      fourthName={'Estado'} fourthRoute={'/fiscal/state'}>
      
      <Formik
        validationSchema={stateValidationSchema}
        validateOnMount={true}
        initialValues={data}
        enableReinitialize
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'Estado'}>
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
                  <Column flex={0.3}>
                    <InputText 
                      label={'UF'} 
                      type={'text'}
                      value={values?.uf}
                      onChange={val => {
                        setFieldValue('uf', val)
                      }}
                      invalid={errors?.uf?.length > 0 && !!touched?.uf}
                      textError={errors?.uf?.toString()}
                    />
                  </Column>
                </Row>
                <Row>
                  <InputSelect 
                    label={'País'} 
                    // @ts-ignore
                    value={values?.idcountry}
                    onChange={val => {
                      setFieldValue('idcountry', val)
                    }}
                    api={countryApi}
                    invalid={errors?.idcountry?.length > 0 && !!touched?.idcountry}
                    textError={errors?.idcountry?.toString()}
                  />
                </Row>
              </FormWithSave>
            )
          }}
      </Formik>  
    </MenuDefault>
  )
}

export default State