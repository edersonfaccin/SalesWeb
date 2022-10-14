import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { countryApi } from '../../src/utils/Environment';

const Countries = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
      nameField: 'name'
    }, {
      Header: 'Ativo',
      accessor: 'active' as const,
      nameField: 'active'
    }, {
      Header: 'Ações',
      accessor: 'action' as const,
      nameField: 'action'
    }
  ];

  return (
    <MenuDefault 
      firstName={'Início'} firstRoute={'/'} 
      secondName={'Fiscal'} secondRoute={'/fiscal'}
      thirthName={'Países'} thirthRoute={'/fiscal/countries'}>
      <TablePagination 
        routeNew={'/fiscal/country'}
        tableColumns={tableColumns}
        title={'Lista de países'}
        removeButton={true}
        editButton={true}
        api={countryApi}
      />
    </MenuDefault>
  )
}

export default Countries