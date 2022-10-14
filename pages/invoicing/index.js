import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../../src/components/utils/MenuButtonDashboard'

const Index = () => {

    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'} secondName={'Faturamento'} secondRoute={'/invoicing'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Transportadores'} route={'/invoicing/carriers'}/>
                <MenuButtonDashboard label={'Vendedores'} route={'/invoicing/salers'}/>
                <MenuButtonDashboard label={'Clientes'} route={'/invoicing/customers'}/>
                <MenuButtonDashboard label={'Pedidos'} route={'/invoicing/orders'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index