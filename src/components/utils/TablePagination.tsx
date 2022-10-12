import * as React from "react";
import { Table } from "react-chakra-pagination";
import { Box, Icon, Button, Heading, Spacer, Flex } from "@chakra-ui/react";
import { FiTrash2, FiUser, FiEdit, FiPlus } from "react-icons/fi";
import { useState } from "react";
import { Column } from "../../types/TableList";
import route from 'next/router'

interface Props {
  routeNew: string
  list: any[]
  tableColumns: any[]
  title: string
  removeButton: boolean
  editButton: boolean
}

const TablePagination = (props: Props) => {

  const [ page, setPage ] = useState(1);

  const onNew = () => {
    route.push(props.routeNew)
  }

  const onRemove = (item: any) => {
    console.log(item)
    //TODO
  }

  const onEdit = (item: any) => {
    console.log(item)
    //TODO
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

  const tableData = props.list.map(item => {
    let obj = {}

    props.tableColumns.map((itemCol: Column) => {
      if(itemCol.nameField == 'active'){
        obj = { ...obj, [itemCol.nameField]: item[itemCol.nameField] ? 'Sim' : 'Não' }
      }else if(itemCol.nameField == 'action'){
        obj = { ...obj, action: (
          renderAction(item)
        )}
      }else{
        obj = { ...obj, [itemCol.nameField]: item[itemCol.nameField] }
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

      <Box mt="6">
        <Table
          colorScheme="blue"
          emptyData={{
            icon: FiUser,
            text: "Nenhum registro encontrado"
          }}
          totalRegisters={props.list.length}
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