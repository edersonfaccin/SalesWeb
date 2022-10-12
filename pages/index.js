import { SimpleGrid, Box, Text, Center } from '@chakra-ui/react'
import MenuDefault from '../src/components/utils/MenuDefault'

const Index = () => {
  
  return (
    <MenuDefault>
      <SimpleGrid columns={4} spacing={2}>
        <Center bg='blackAlpha.600' height='50px' borderRadius="md">
          <Text fontSize='3xl'>Bancos</Text>
        </Center>
        <Center bg='blackAlpha.600' height='50px' borderRadius="md">
          <Text fontSize='3xl'>Transportadores</Text>
        </Center>
        <Center bg='blackAlpha.600' height='50px' borderRadius="md">
          <Text fontSize='3xl'>Categorias</Text>
        </Center>
        <Center bg='blackAlpha.600' height='50px' borderRadius="md">
          <Text fontSize='3xl'>Unidades</Text>
        </Center>
        <Center bg='blackAlpha.600' height='50px' borderRadius="md">
          <Text fontSize='3xl'>Unidades</Text>
        </Center>
      </SimpleGrid>
    </MenuDefault>
  )
}

export default Index