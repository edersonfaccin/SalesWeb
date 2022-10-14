import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../../src/components/utils/MenuButtonDashboard'

const Index = () => {

    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'} secondName={'Financeiro'} secondRoute={'/finance'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Tabela de ICMS'} route={'/finance/icms_tables'}/>
                <MenuButtonDashboard label={'Condição de Pagamento'} route={'/finance/payment_conditions'}/>
                <MenuButtonDashboard label={'Formas de Pagamento'} route={'/finance/payment_methods'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index