import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { unitApi } from '../../src/utils/Environment';

const Units = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
      nameField: 'name'
    }, {
      Header: 'Sigla',
      accessor: 'initials' as const,
      nameField: 'initials'
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
      secondName={'Estoque'} secondRoute={'/stock'}
      thirthName={'Unidades'} thirthRoute={'/stock/units'}>
      <TablePagination 
        routeNew={'/stock/unit'}
        tableColumns={tableColumns}
        title={'Lista de unidades'}
        removeButton={true}
        editButton={true}
        api={unitApi}
      />
    </MenuDefault>
  )
}

export default Units