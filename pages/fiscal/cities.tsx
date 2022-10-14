import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { cityApi } from '../../src/utils/Environment';

const Cities = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
      nameField: 'name'
    }, {
      Header: 'Estado',
      accessor: 'idstate' as const,
      nameField: 'idstate',
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
      thirthName={'Cidades'} thirthRoute={'/fiscal/cities'}>
      <TablePagination 
        routeNew={'/fiscal/city'}
        tableColumns={tableColumns}
        title={'Lista de cidades'}
        removeButton={true}
        editButton={true}
        api={cityApi}
      />
    </MenuDefault>
  )
}

export default Cities