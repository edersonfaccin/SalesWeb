import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../../src/components/utils/MenuButtonDashboard'

const Index = () => {

    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'} secondName={'Estoque'} secondRoute={'/stock'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Cores'} route={'/stock/colors'}/>
                <MenuButtonDashboard label={'Categorias'} route={'/stock/categories'}/>
                <MenuButtonDashboard label={'Unidades'} route={'/stock/units'}/>
                <MenuButtonDashboard label={'Produtos'} route={'/stock/products'}/>
                <MenuButtonDashboard label={'Fornecedores'} route={'/stock/suppliers'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index