import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { colorApi } from '../../src/utils/Environment';

const Colors = () => {

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
      secondName={'Estoque'} secondRoute={'/stock'}
      thirthName={'Cores'} thirthRoute={'/stock/colors'}>
      <TablePagination 
        routeNew={'/stock/color'}
        tableColumns={tableColumns}
        title={'Lista de cores'}
        removeButton={true}
        editButton={true}
        api={colorApi}
      />
    </MenuDefault>
  )
}

export default Colors