import { useEffect, useState } from 'react';
import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import useAuthData from '../../src/data/hook/useAuthData';
import { Column } from '../../src/types/TableList';
import { colorApi } from '../../src/utils/Environment';
import { getMethod } from '../../src/utils/ServiceApi';

const Colors = () => {
  
  const { user } = useAuthData()

  const [ list, setList ] = useState<any>([])

  useEffect(() => {
    getMethod(colorApi, `idcompany/${user?.idcompany}`).then((resp: any=[]) => {
      setList(resp)
    })
  }, [user?.iduser])

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