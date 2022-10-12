import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'

const Colors = () => {

    return (
        <MenuDefault 
            firstName={'Inicio'} firstRoute={'/'} 
            secondName={'Fiscal'} secondRoute={'/fiscal'}
            thirthName={'Cores'} thirthRoute={'/colors'}>
            <TablePagination />
        </MenuDefault>
    )
}

export default Colors