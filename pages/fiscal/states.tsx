import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { stateApi } from '../../src/utils/Environment';

const States = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
      nameField: 'name'
    }, {
      Header: 'UF',
      accessor: 'uf' as const,
      nameField: 'uf'
    }, {
      Header: 'País',
      accessor: 'idcountry' as const,
      nameField: 'idcountry',
      subField: 'name'
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
      thirthName={'Estados'} thirthRoute={'/fiscal/states'}>
      <TablePagination 
        routeNew={'/fiscal/state'}
        tableColumns={tableColumns}
        title={'Lista de estados'}
        removeButton={true}
        editButton={true}
        api={stateApi}
      />
    </MenuDefault>
  )
}

export default States