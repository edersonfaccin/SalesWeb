import { Button } from '@chakra-ui/react'

interface buttonProps {
    label?: string
    disabled?: boolean
    loading?: boolean
    labelLoading?: string
    type?: 'ghost' | 'outline' | 'solid' | 'link' | 'unstyled'
    onPress: any,
    icon?: any
}

const ButtonDefault = (props: buttonProps) => {

    return (
        <Button
            leftIcon={props?.icon} 
            onClick={props.onPress}
            isLoading={props?.loading || false}
            loadingText={props?.labelLoading || 'Salvando'}
            bg={'blue.400'}
            size={'sm'}
            color={'white'}
            _hover={{
                bg: 'blue.500',
            }}
            variant={props?.type || 'solid'}
            isDisabled={props?.disabled || false}>
            {props?.label || 'Default'}
        </Button>
    )
}

export default ButtonDefault