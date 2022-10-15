import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { paymentMethodApi } from '../../src/utils/Environment';

const PaymentMethods = () => {

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
      secondName={'Financeiro'} secondRoute={'/finance'}
      thirthName={'Formas de Pagamentos'} thirthRoute={'/fiscal/payment_methods'}>
      <TablePagination 
        routeNew={'/finance/payment_method'}
        tableColumns={tableColumns}
        title={'Lista de formas de pagamento'}
        removeButton={true}
        editButton={true}
        api={paymentMethodApi}
      />
    </MenuDefault>
  )
}

export default PaymentMethods