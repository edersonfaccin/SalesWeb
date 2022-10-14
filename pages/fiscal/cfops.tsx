import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { cfopApi } from '../../src/utils/Environment';

const Cfops = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
      nameField: 'name'
    }, {
      Header: 'Number',
      accessor: 'ipi_percent' as const,
      nameField: 'ipi_percent'
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
      thirthName={'CFOPs'} thirthRoute={'/fiscal/cfops'}>
      <TablePagination 
        routeNew={'/fiscal/cfop'}
        tableColumns={tableColumns}
        title={'Lista de CFOPs'}
        removeButton={true}
        editButton={true}
        api={cfopApi}
      />
    </MenuDefault>
  )
}

export default Cfops