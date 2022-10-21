import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { productApi } from '../../src/utils/Environment';

const Products = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Nome',
      accessor: 'name' as const,
      nameField: 'name'
    }, {
      Header: 'Descrição',
      accessor: 'description' as const,
      nameField: 'description'
    }, {
      Header: 'Referência',
      accessor: 'reference' as const,
      nameField: 'reference'
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
      thirthName={'Produtos'} thirthRoute={'/stock/products'}>
      <TablePagination 
        routeNew={'/stock/product'}
        tableColumns={tableColumns}
        title={'Lista de produtos'}
        removeButton={true}
        editButton={true}
        api={productApi}
      />
    </MenuDefault>
  )
}

export default Products