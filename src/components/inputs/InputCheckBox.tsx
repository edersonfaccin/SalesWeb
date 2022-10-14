import { Checkbox } from '@chakra-ui/react'

interface checkProps {
    label?: string
    value: any
    onChange: any
}

const InputCheckBox = (props: checkProps) => {

    return (
        <Checkbox
            width='100%' 
            size='md'
            isChecked={props.value}
            value={props.value}
            onChange={(ev) => props.onChange(!props.value)}>
            {props?.label}
        </Checkbox>
    )
}

export default InputCheckBox