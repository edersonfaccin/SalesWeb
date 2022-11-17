import MenuDefault from '../../src/components/utils/MenuDefault'
import { Formik } from 'formik'
import { useRouter } from "next/router"
import { useToast } from '@chakra-ui/react'
import { Column, FormWithSave, Row } from '../../src/components/utils/Form'
import { productValidationSchema, IProductModel } from '../../src/models/IProductModel'
import InputText from '../../src/components/inputs/InputText'
import useAuthData from '../../src/data/hook/useAuthData'
import { useEffect, useState } from 'react'
import SpinnerDefault from '../../src/components/spinner/SpinnerDefault'
import { getMethod, postMethod, patchMethod } from '../../src/utils/ServiceApi'
import { productApi, unitApi, categoryApi, colorApi } from '../../src/utils/Environment'
import { showToast } from '../../src/utils/Functions'
import InputCheckBox from '../../src/components/inputs/InputCheckBox'
import InputSelect from '../../src/components/inputs/InputSelect'

const Product = () => {
  const router = useRouter()
  const toast = useToast()
  const { user } = useAuthData()

  const [ data, setData ] = useState<IProductModel>()
  const [ rendering, setRendering ] = useState<boolean>(true)

  useEffect(() => {
    if(router.query?.id && user?.iduser){
      setRendering(true)
      
      getMethod(productApi, `${router.query?.id}`).then((resp: any) => {
        setData({
          ...resp,
          idcolor: resp?.idcolor?.id,
          idcategory: resp?.idcategory?.id,
          idunit: resp?.idunit?.id
        })

        setRendering(false)
      })
    }else{
      setRendering(true)

      setData({
        ...data,
        active: true,
        idcolor: '',
        idcategory: '',
        idunit: '',
        idcompany: user?.idcompany,
        name: '',
        description: '',
        reference: '',
        net_weight: 0,
        gross_weight: 0,
        height: 0,
        width: 0,
        length: 0
      })

      setRendering(false)
    }
  }, [router.query?.id && user?.iduser])

  const onSave = (values: any) => {
    if(router.query?.id){
      patchMethod(productApi, router.query?.id.toString(), values).then(_ => {
        router.back()
      }).catch(err => {
        showToast({
          toast: toast, 
          status: 'success', 
          description: err
        })
      })
    }else{
      postMethod(productApi, '', values).then(_ => {
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
      thirthName={'Produtos'} thirthRoute={'/stock/products'}
      fourthName={'Produto'} fourthRoute={'/stock/product'}>
      
      <Formik
        validationSchema={productValidationSchema}
        validateOnMount={true}
        initialValues={data}
        enableReinitialize
        onSubmit={values => onSave(values)}>
          {({ handleSubmit, values, errors, touched, setFieldValue }) => {
            return (
              <FormWithSave percentWidth={100} onSave={handleSubmit} title={'Produto'}>
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
                  <Column flex={6}>
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
                  <Column flex={4}>
                    <InputText 
                      label={'Referência'} 
                      type={'text'}
                      value={values?.reference}
                      onChange={val => {
                        setFieldValue('reference', val)
                      }}
                      invalid={errors?.reference?.length > 0 && !!touched?.reference}
                      textError={errors?.reference?.toString()}
                    />
                  </Column>
                </Row>
                <Row>
                  <Column flex={1}>
                    <InputText 
                      label={'Descrição'} 
                      type={'text'}
                      value={values?.description}
                      onChange={val => {
                        setFieldValue('description', val)
                      }}
                      invalid={errors?.description?.length > 0 && !!touched?.description}
                      textError={errors?.description?.toString()}
                    />
                  </Column>
                </Row>
                <Row>
                  <InputSelect 
                    label={'Cor'} 
                    // @ts-ignore
                    value={values?.idcolor}
                    onChange={val => {
                      setFieldValue('idcolor', val)
                    }}
                    api={colorApi}
                    invalid={errors?.idcolor?.length > 0 && !!touched?.idcolor}
                    textError={errors?.idcolor?.toString()}
                  />
                </Row>
                <Row>
                  <InputSelect 
                    label={'Categoria'} 
                    // @ts-ignore
                    value={values?.idcategory}
                    onChange={val => {
                      setFieldValue('idcategory', val)
                    }}
                    api={categoryApi}
                    invalid={errors?.idcategory?.length > 0 && !!touched?.idcategory}
                    textError={errors?.idcategory?.toString()}
                  />
                </Row>
                <Row>
                  <InputSelect 
                    label={'Unidade'} 
                    // @ts-ignore
                    value={values?.idunit}
                    onChange={val => {
                      setFieldValue('idunit', val)
                    }}
                    api={unitApi}
                    invalid={errors?.idunit?.length > 0 && !!touched?.idunit}
                    textError={errors?.idunit?.toString()}
                  />
                </Row>
                <Row>
                  <Column flex={1}>
                    <InputText 
                      label={'Peso liquido'} 
                      type={'number'}
                      value={values?.net_weight}
                      onChange={val => {
                        setFieldValue('net_weight', val)
                      }}
                      invalid={errors?.net_weight?.length > 0 && !!touched?.net_weight}
                      textError={errors?.net_weight?.toString()}
                    />
                  </Column>
                  <Column flex={1}>
                    <InputText 
                      label={'Peso bruto'} 
                      type={'number'}
                      value={values?.gross_weight}
                      onChange={val => {
                        setFieldValue('gross_weight', val)
                      }}
                      invalid={errors?.gross_weight?.length > 0 && !!touched?.gross_weight}
                      textError={errors?.gross_weight?.toString()}
                    />
                  </Column>
                  <Column flex={1}/>
                </Row>
                <Row>
                  <Column flex={1}>
                    <InputText 
                      label={'Altura'} 
                      type={'number'}
                      value={values?.height}
                      onChange={val => {
                        setFieldValue('height', val)
                      }}
                      invalid={errors?.height?.length > 0 && !!touched?.height}
                      textError={errors?.height?.toString()}
                    />
                  </Column>
                  <Column flex={1}>
                    <InputText 
                      label={'Largura'} 
                      type={'number'}
                      value={values?.width}
                      onChange={val => {
                        setFieldValue('width', val)
                      }}
                      invalid={errors?.width?.length > 0 && !!touched?.width}
                      textError={errors?.width?.toString()}
                    />
                  </Column>
                  <Column flex={1}>
                    <InputText 
                      label={'Comprimento'} 
                      type={'number'}
                      value={values?.width}
                      onChange={val => {
                        setFieldValue('width', val)
                      }}
                      invalid={errors?.width?.length > 0 && !!touched?.width}
                      textError={errors?.width?.toString()}
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

export default Product