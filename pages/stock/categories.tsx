import { useEffect, useState } from 'react';
import MenuDefault from '../../src/components/utils/MenuDefault'
import TablePagination from '../../src/components/utils/TablePagination'
import useAuthData from '../../src/data/hook/useAuthData';
import { Column } from '../../src/types/TableList';
import { categoryApi } from '../../src/utils/Environment';
import { getMethod } from '../../src/utils/ServiceApi';

const Categories = () => {
  
  const { user } = useAuthData()

  const [ list, setList ] = useState<any>([])

  useEffect(() => {
    retrieveList()
  }, [user?.iduser])

  const retrieveList = () => {
    getMethod(categoryApi, `idcompany/${user?.idcompany}`).then((resp: any=[]) => {
      setList(resp)
    })
  }

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
        list={list} 
        tableColumns={tableColumns}
        title={'Lista de categorias'}
        removeButton={true}
        editButton={true}
        api={categoryApi}
        retrieve={retrieveList}
      />
    </MenuDefault>
  )
}

export default Categories