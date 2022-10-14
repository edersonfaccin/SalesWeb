import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { categoryApi } from '../../src/utils/Environment';

const Categories = () => {

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
      thirthName={'Categorias'} thirthRoute={'/stock/categories'}>
      <TablePagination 
        routeNew={'/stock/category'}
        tableColumns={tableColumns}
        title={'Lista de categorias'}
        removeButton={true}
        editButton={true}
        api={categoryApi}
      />
    </MenuDefault>
  )
}

export default Categories