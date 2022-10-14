import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../../src/components/utils/MenuButtonDashboard'

const Index = () => {

    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'} secondName={'Fiscal'} secondRoute={'/fiscal'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Bancos'} route={'/fiscal/banks'}/>
                <MenuButtonDashboard label={'CFOPs'} route={'/fiscal/cfops'}/>
                <MenuButtonDashboard label={'Paises'} route={'/fiscal/countries'}/>
                <MenuButtonDashboard label={'Estados'} route={'/fiscal/states'}/>
                <MenuButtonDashboard label={'Cidades'} route={'/fiscal/cities'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index