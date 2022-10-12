import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../src/components/utils/MenuButtonDashboard'

const Index = () => {
    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Estoque'} route={'stock'}/>
                <MenuButtonDashboard label={'Financeiro'} route={'finance'}/>
                <MenuButtonDashboard label={'Faturamento'} route={'invoicing'}/>
                <MenuButtonDashboard label={'Fiscal'} route={'fiscal'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index