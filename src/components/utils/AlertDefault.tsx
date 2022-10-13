import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

interface alertProps {
    title?: string
    description: string
    status?: 'info' | 'warning' | 'success' | 'error' | 'loading'
}

const AlertDefault = (props: alertProps) => {
    return (
        <Alert status={props?.status || 'info'}>
            <AlertIcon />
            {props?.title ? <AlertTitle>{props?.title}</AlertTitle> : null}
            <AlertDescription>{props.description}</AlertDescription>
        </Alert>
    )
}

export default AlertDefault