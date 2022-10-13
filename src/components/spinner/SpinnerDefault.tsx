import { Spinner, Flex, useColorModeValue } from '@chakra-ui/react'

const SpinnerDefault = () => {

    return (
        <Flex
            height={"100vh"}
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ md: 'center' }}>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </Flex>
    )
}

export default SpinnerDefault