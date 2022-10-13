import { useEffect, useState } from 'react'
import { Flex, Box, Stack, Link as LinkChakra, Heading, Text, useColorModeValue } from '@chakra-ui/react'
import Link from 'next/link'
import Head from 'next/head'
import InputText from '../src/components/inputs/InputText'
import ButtonDefault from '../src/components/buttons/ButtonDefault'
import AlertDefault from '../src/components/utils/AlertDefault'
import useAuthData from '../src/data/hook/useAuthData'
import { titlePage } from '../src/utils/Functions'

const SignIn = () => {
  const { loginEmail, errorMessage } = useAuthData()

  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ error, setError ] = useState<string>(null)

  useEffect(() => {
    setError(errorMessage)
  }, [errorMessage])

  const onLogin = async() => {
    await loginEmail(email, password)
  }

  return (
    <>
      <Head>
        <title>{titlePage()}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Entrar</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Insira seu e-mail e senha
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              {
                error ? (
                  <AlertDefault 
                    description={error} 
                    status={'error'}
                  />
                ) : null
              }
              <InputText 
                value={email} 
                type={'email'}
                onChange={setEmail} 
                label={'E-mail'} 
                required
              />
              <InputText 
                value={password} 
                type={'password'}
                onChange={setPassword} 
                label={'Senha'} 
                required
              />
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Link href="/forgot_password">
                    <LinkChakra color={'blue.400'}>
                      Esqueci minha senha
                    </LinkChakra>
                  </Link>
                </Stack>
                <ButtonDefault 
                  label={'Entrar'}
                  onPress={onLogin}
                />
                <Link href="/signup">
                  <LinkChakra color={'blue.400'}>
                    Não tenho conta, criar
                  </LinkChakra>
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  )
}

export default SignIn