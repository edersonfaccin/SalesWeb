import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../../src/components/utils/MenuButtonDashboard'

const Index = () => {

    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'} secondName={'Estoque'} secondRoute={'/stock'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Cores'} route={'colors'}/>
                <MenuButtonDashboard label={'Categorias'} route={'categories'}/>
                <MenuButtonDashboard label={'Unidades'} route={'units'}/>
                <MenuButtonDashboard label={'Produtos'} route={'products'}/>
                <MenuButtonDashboard label={'Cidades'} route={'cities'}/>
                <MenuButtonDashboard label={'Fornecedores'} route={'suppliers'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index