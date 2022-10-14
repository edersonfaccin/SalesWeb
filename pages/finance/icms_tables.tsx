import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Column } from '../../src/types/TableList';
import { icmsTableApi } from '../../src/utils/Environment';

const IcmsTables = () => {

  const tableColumns: Column[] = [
    {
      Header: 'Estado origem',
      accessor: 'idstate_origin' as const,
      nameField: 'idstate_origin',
      subField: 'name'
    }, {
      Header: 'Estado destino',
      accessor: 'idstate_destination' as const,
      nameField: 'idstate_destination',
      subField: 'name'
    }, {
      Header: 'Percentual',
      accessor: 'percent' as const,
      nameField: 'percent'
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
      thirthName={'Tabelas de ICMS'} thirthRoute={'/finance/icms_tables'}>
      <TablePagination 
        routeNew={'/finance/icms_table'}
        tableColumns={tableColumns}
        title={'Lista de Tabela de ICMS'}
        removeButton={true}
        editButton={true}
        api={icmsTableApi}
      />
    </MenuDefault>
  )
}

export default IcmsTables