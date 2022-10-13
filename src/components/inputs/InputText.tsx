import React from 'react'
import { FormControl, FormLabel, FormErrorMessage, Input } from '@chakra-ui/react'

interface inputProps {
    label?: string
    placeholder?: string
    disabled?: boolean
    readOnly?: boolean
    required?: boolean
    type?: 'text' | 'email' | 'number' | 'password'
    invalid?: boolean
    textError?: string
    value: any
    onChange: any
    maxLength?: number
}

const InputText = (props: inputProps) => {

    return (
        <FormControl 
            isRequired={props?.required || false} 
            isInvalid={props?.invalid || false}>
            <FormLabel>{props?.label}</FormLabel>
            <Input 
                type={props?.type || 'text'}
                width='100%' 
                size='md' 
                variant='outline'
                maxLength={props?.maxLength || 100}
                placeholder={props?.placeholder || ''}
                isDisabled={props?.disabled || false}
                isReadOnly={props?.readOnly || false}
                isRequired={props?.required || false}
                value={props.value}
                onChange={(ev) => props.onChange(ev.target?.value)}
            />
            <FormErrorMessage>{props?.textError}</FormErrorMessage>
        </FormControl>
    )
}

export default InputText