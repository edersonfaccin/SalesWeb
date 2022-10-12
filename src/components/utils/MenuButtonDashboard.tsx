import React from 'react';
import { Text, Center } from '@chakra-ui/react'
import Link from 'next/link'

interface Props {
    label: string
    route: string
}

const MenuButtonDashboard = (props: Props) => {

    return (
        <Center bg='blue.500' height='150px' borderRadius="md" cursor={'pointer'}>
            <Link href={`/${props.route}`}>
                <Text fontSize='3xl' color={'white'}>{props.label}</Text>
            </Link>
        </Center>
    )
}

export default MenuButtonDashboard