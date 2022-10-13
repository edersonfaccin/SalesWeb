import { CheckIcon } from "@chakra-ui/icons"
import { Box, Flex, Heading, HStack, StackDivider, useColorModeValue, VStack } from "@chakra-ui/react"
import ButtonDefault from "../buttons/ButtonDefault"

interface FormProps {
    children?: any
    percentWidth?: number
    align?: 'flex-end' | 'flex-start' | 'center'
    onSave?: any
    title?: string
}

interface ColumnProps {
    flex?: number
    children?: any
}

interface RowProps {
    align?: string
    children?: any
}
  
export const Row = (props: RowProps) => {
    return (
        <Box w='100%' h='auto'>
            <HStack spacing='20px' justify={props?.align ? props?.align : 'center'}>
                { props.children }
            </HStack>
        </Box>
    )
}
  
export const Column = (props: ColumnProps) => {
    return (
        <Box w={'100%'} h='auto' flex={props?.flex || 1}
            // @ts-ignore
            justify={props?.align ? props?.align : 'center'}>
            { props.children }
        </Box>
    )
}
  
export const FormWithSave = (props: FormProps) => {
    return (
      <Flex 
        justify="center" 
        p="10" 
        bg={useColorModeValue('gray.50', 'gray.800')} 
        borderRadius="md">
        <VStack
          divider={<StackDivider borderColor='transparent' />}
          align='center' 
          w={`${props?.percentWidth || 100}%`}>
          <Heading title={props.title}/>
          { props.children }
          <Row align='flex-end'>
            {
              props?.onSave ? (
                <ButtonDefault 
                  onPress={props.onSave}
                  label={'Salvar'}
                  icon={<CheckIcon />}
                />
              ) : null
            }
          </Row>
        </VStack>
      </Flex>
    )
}
  