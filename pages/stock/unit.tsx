import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { Column, FormWithSave, Row } from '../../src/components/utils/Form'
import { unitValidationSchema, IUnitModel } from '../../src/models/IUnitModel'
import InputText from '../../src/components/inputs/InputText'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { unitApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputCheckBox from '../../src/components/inputs/InputCheckBox'

const Color = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<IUnitModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(unitApi, `${router.query?.id}`).then((resp: any) => {
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
        initials: '',
        name: ''
      })

      setTimeout(() => {
        setRendering(false)
      }, 200)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(unitApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(unitApi, '', values).then(_ => {
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
      secondName={'Estoque'} secondRoute={'/stock'}
      thirthName={'Unidades'} thirthRoute={'/stock/units'}
      fourthName={'Unidade'} fourthRoute={'/stock/unit'}>
      
      <Formik
        validationSchema={unitValidationSchema}
        validateOnMount={true}
        initialValues={data}
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'Cor'}>
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
                  <Column flex={0.6}>
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
                  <Column flex={0.4}>
                    <InputText 
                      label={'Sigla'} 
                      type={'text'}
                      value={values?.initials}
                      onChange={val => {
                        setFieldValue('initials', val)
                      }}
                      invalid={errors?.initials?.length > 0 && !!touched?.initials}
                      textError={errors?.initials?.toString()}
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

export default Color