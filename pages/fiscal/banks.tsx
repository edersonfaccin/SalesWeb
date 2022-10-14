import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { bankApi } from '../../src/utils/Environment';

const Banks = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Number',
      accessor: 'bank_number' as const,
      nameField: 'bank_number'
    }, {
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
      thirthName={'Bancos'} thirthRoute={'/fiscal/banks'}>
      <TablePagination 
        routeNew={'/fiscal/bank'}
        tableColumns={tableColumns}
        title={'Lista de bancos'}
        removeButton={true}
        editButton={true}
        api={bankApi}
      />
    </MenuDefault>
  )
}

export default Banks