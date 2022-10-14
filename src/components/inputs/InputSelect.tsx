import { useEffect, useState } from 'react'
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react'
import useAuthData from '../../data/hook/useAuthData'
import { getMethod } from '../../utils/ServiceApi'
import SpinnerDefault from '../spinner/SpinnerDefault'

interface selectProps {
    label?: string
    placeholder?: string
    required?: boolean
    invalid?: boolean
    textError?: string
    value: any
    onChange: any
    api: any
}

const InputSelect = (props: selectProps) => {
    const { user } = useAuthData()

    const [ rendering, setRendering ] = useState<boolean>(true)
    const [ list, setList ] = useState<any>()
    
    useEffect(() => {
        if(user?.iduser){
            setRendering(true)
          
            getMethod(props.api, `idcompany/${user?.idcompany}`).then((resp: any[]) => {
                setList(resp)
    
                setTimeout(() => {
                    setRendering(false)
                }, 200);
          })
        }else{
            setRendering(true)
    
            setList([])
    
            setTimeout(() => {
                setRendering(false)
            }, 200);
        }
    }, [user?.iduser])

    if(rendering){
        return (
          <SpinnerDefault />
        )
    }

    return (
        <FormControl 
            isRequired={props?.required || false} 
            isInvalid={props?.invalid || false}>
            <FormLabel>{props?.label}</FormLabel>
            <Select placeholder={props?.placeholder} 
                onChange={(ev) => props.onChange(ev.target?.value)}>
                {
                    list.map(element => {
                        return (
                            <option key={element.id} value={element.id} selected={element.id == props.value}>
                                {element.name}
                            </option>
                        )
                    })
                }
            </Select>
            <FormErrorMessage>{props?.textError}</FormErrorMessage>
        </FormControl>
    )
}

export default InputSelect