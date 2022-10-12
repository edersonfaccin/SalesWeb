import * as React from "react";
import { Table } from "react-chakra-pagination";
import { Flex, Avatar, Text, Box, Icon, Button, Heading } from "@chakra-ui/react";
import { FiTrash2, FiUser } from "react-icons/fi";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  avatar_url: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Carlin Gwinn",
    email: "cgwinn0@buzzfeed.com",
    phone: "(684) 9842794",
    birthday: "04/11/2009",
    avatar_url: "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  }, {
    id: 2,
    name: "Yetta Snape",
    email: "ysnape1@princeton.edu",
    phone: "(645) 8617506",
    birthday: "06/08/1989",
    avatar_url: "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  }
];

const TablePagination = () => {

  const [ page, setPage ] = useState(1);

  const tableData = users.map((user) => ({
    name: (
      <Flex align="center" key={user.id}>
        <Avatar name={user.name} src={user.avatar_url} size="sm" mr="4" />
        <Text>{user.name}</Text>
      </Flex>
    ),
    email: user.email,
    phone: user.phone,
    birthday: user.birthday,
    action: (
      <Button
        colorScheme="gray"
        onClick={() => console.log("remove user!")}
        size="sm"
      >
        <Icon as={FiTrash2} fontSize="20" />
      </Button>
    )
  }));

  const tableColumns = [
    {
      Header: "Name",
      accessor: "name" as const
    },
    {
      Header: "Email",
      accessor: "email" as const
    },
    {
      Header: "Phone",
      accessor: "phone" as const
    },
    {
      Header: "Birthday",
      accessor: "birthday" as const
    },
    {
      Header: "",
      accessor: "action" as const
    }
  ];

  return (
    <Box p="12">
      <Heading size="sm" as="h3">
        List of Users
      </Heading>

      <Box mt="6">
        <Table
          colorScheme="blue"
          emptyData={{
            icon: FiUser,
            text: "Nobody is registered here."
          }}
          totalRegisters={users.length}
          page={page}
          onPageChange={(page) => setPage(page)}
          columns={tableColumns}
          data={tableData}
        />
      </Box>
    </Box>
  );
}

export default TablePagination