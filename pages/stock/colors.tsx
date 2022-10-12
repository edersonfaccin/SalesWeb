import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import { Color, Column } from '../../src/types/TableList';

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

    const list: Color[] = [
      {
        id: '1',
        name: "Branco",
        active: true
      }, {
        id: '2',
        name: "Preto",
        active: true
      }, {
        id: '3',
        name: "Preto",
        active: true
      }, {
        id: '4',
        name: "Preto",
        active: true
      }, {
        id: '6',
        name: "Preto",
        active: true
      }, {
        id: '7',
        name: "Preto",
        active: true
      }, {
        id: '2',
        name: "Preto",
        active: true
      }, {
        id: '8',
        name: "Preto",
        active: true
      }
    ];

    return (
      <MenuDefault 
          firstName={'Início'} firstRoute={'/'} 
          secondName={'Estoque'} secondRoute={'/stock'}
          thirthName={'Cores'} thirthRoute={'/stock/colors'}>
          <TablePagination 
              routeNew={'/stock/color'}
              list={list} 
              tableColumns={tableColumns}
              title={'Lista de cores'}
              removeButton={true}
              editButton={true}
          />
      </MenuDefault>
    )
}

export default Colors