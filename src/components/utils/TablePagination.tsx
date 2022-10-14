import * as React from "react";
import { useEffect, useState } from "react";
import { Table } from "react-chakra-pagination";
import { Box, Icon, Button, Heading, Spacer, Flex } from "@chakra-ui/react";
import { FiTrash2, FiList, FiEdit, FiPlus } from "react-icons/fi";
import { Column } from "../../types/TableList";
import router from 'next/router'
import ModalRemove from "./ModalRemove";
import { deleteMethod, getMethod } from "../../utils/ServiceApi";
import { showToast } from '../../utils/Functions'
import { useToast } from '@chakra-ui/react'
import useAuthData from "../../data/hook/useAuthData";

interface Props {
  routeNew: string
  tableColumns: any[]
  title: string
  removeButton: boolean
  editButton: boolean,
  api: string
}

const TablePagination = (props: Props) => {
  const toast = useToast()
  const { user } = useAuthData()

  const [ page, setPage ] = useState(1);
  const [ modalRemove, setModalRemove ] = useState(false);
  const [ idRemove, setIdRemove ] = useState<string>('');
  const [ list, setList ] = useState<any>([])

  useEffect(() => {
    retrieveList()
  }, [user?.iduser])

  const retrieveList = () => {
    getMethod(props.api, `idcompany/${user?.idcompany}`).then((resp: any=[]) => {
      setList(resp)
    })
  }

  const onNew = () => {
    router.push({
      pathname: props.routeNew
    })
  }

  const onRemove = (item: any) => {
    setIdRemove(item?.id)
    setModalRemove(true)
  }

  const onConfirmRemove = () => {
    deleteMethod(props.api, idRemove).then(_ => {
      retrieveList()

      showToast({
        toast: toast, 
        status: 'info', 
        description: 'Registro removido com sucesso'
      })
    })
  }

  const onEdit = (item: any) => {
    router.push({
      pathname: props.routeNew,
      query: {
        id: item.id
      }
    })
  }

  const renderAction = (item: any) => {
    return (
      <>   
        {
          props.editButton ? (
            <Button
              colorScheme="gray"
              onClick={() => onEdit(item)}
              size="sm">
              <Icon as={FiEdit} fontSize="20" color={'blue'}/>
            </Button>
          ) : null
        }
        {
          props.removeButton ? (
            <Button
              colorScheme="gray"
              onClick={() => onRemove(item)}
              size="sm">
              <Icon as={FiTrash2} fontSize="20" color={'red'}/>
            </Button>
          ) : null
        }
      </>
    )
  }

  const tableData = list.map(item => {
    let obj = {}

    props.tableColumns.map((itemCol: Column) => {
      if(itemCol.nameField == 'active'){
        obj = { ...obj, [itemCol.nameField]: item[itemCol.nameField] ? 'Sim' : 'Não' }
      }else if(itemCol.nameField == 'action'){
        obj = { ...obj, action: (
          renderAction(item)
        )}
      }else{
        if(itemCol?.subField){
          let subFields = item[itemCol.nameField]

          obj = { ...obj, [itemCol.nameField]: subFields[itemCol.subField] }
        }else{
          obj = { ...obj, [itemCol.nameField]: item[itemCol.nameField] }
        }
      }
    })

    return obj
  })

  return (
    <Box p="12">
      <Flex>
        <Box p='1'>
          <Heading size="sm" as="h3">
            {props.title}
          </Heading>
        </Box>
        <Spacer />
        <Box p='1'>
          <Button
            colorScheme="gray"
            onClick={() => onNew()}
            size="sm"
            color={'white'}
            bg={'green'}>
              Novo registro
            <Icon as={FiPlus} fontSize="20"/>
          </Button>
        </Box>
      </Flex>

      <ModalRemove 
        visible={modalRemove} 
        setVisible={setModalRemove} 
        onConfirmRemove={onConfirmRemove}
      />

      <Box mt="6">
        <Table
          colorScheme="blue"
          emptyData={{
            icon: FiList,
            text: "Nenhum registro encontrado"
          }}
          totalRegisters={list.length}
          page={page}
          onPageChange={(page) => setPage(page)}
          columns={props.tableColumns}
          data={tableData}
        />
      </Box>
    </Box>
  );
}

export default TablePagination