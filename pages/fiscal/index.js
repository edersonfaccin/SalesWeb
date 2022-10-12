import { SimpleGrid } from '@chakra-ui/react'
import MenuDefault from '../../src/components/utils/MenuDefault'
import MenuButtonDashboard from '../../src/components/utils/MenuButtonDashboard'

const Index = () => {

    return (
        <MenuDefault firstName={'Inicio'} firstRoute={'/'} secondName={'Fiscal'} secondRoute={'/fiscal'}>
            <SimpleGrid columns={3} spacing={2}>
                <MenuButtonDashboard label={'Bancos'} route={'/banks'}/>
                <MenuButtonDashboard label={'CFOPs'} route={'/cfops'}/>
                <MenuButtonDashboard label={'Paises'} route={'/countries'}/>
                <MenuButtonDashboard label={'Estados'} route={'/states'}/>
                <MenuButtonDashboard label={'Cidades'} route={'/cities'}/>
            </SimpleGrid>
        </MenuDefault>
    )
}

export default Index