import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { paymentConditionApi } from '../../src/utils/Environment';

const PaymentConditions = () => {

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
      thirthName={'Condição de Pagamentos'} thirthRoute={'/fiscal/payment_conditions'}>
      <TablePagination 
        routeNew={'/finance/payment_condition'}
        tableColumns={tableColumns}
        title={'Lista de condições de pagamento'}
        removeButton={true}
        editButton={true}
        api={paymentConditionApi}
      />
    </MenuDefault>
  )
}

export default PaymentConditions