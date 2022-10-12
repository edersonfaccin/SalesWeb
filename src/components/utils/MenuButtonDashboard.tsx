import React from 'react';
import { Text, Center } from '@chakra-ui/react'
import Link from 'next/link'

interface Props {
    label: string
    route: string
}

const MenuButtonDashboard = (props: Props) => {

    return (
        <Link href={props.route}>
            <Center bg='blue.500' height='150px' borderRadius="md" cursor={'pointer'}>
                <Text fontSize='3xl' color={'white'}>{props.label}</Text>
            </Center>
        </Link>
    )
}

export default MenuButtonDashboard