import React from 'react';
import { IconButton, Avatar, Box, CloseButton, Flex, HStack,
  VStack, Icon, useColorModeValue, Link, Drawer, DrawerContent,
  Text, useDisclosure, BoxProps, FlexProps, Menu, MenuButton,
  MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar,
  FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';
import Head from 'next/head'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from '@chakra-ui/react'
import ForceAuth from './ForceAuth';
import { titlePage } from '../../utils/Functions';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Inicio', icon: FiHome, route: '/' },
  { name: 'Estoque', icon: FiTrendingUp, route: '/stock' },
  { name: 'Financeiro', icon: FiCompass, route: '/finance' },
  { name: 'Faturamento', icon: FiStar, route: '/invoicing' },
  { name: 'Usuários', icon: FiSettings, route: '/users' },
];

const renderBreadcrumb = (firstName: string, firstRoute: string, 
  secondName: string, secondRoute: string, 
  thirthName: string, thirthRoute: string,
  fourthName: string, fourthRoute: string) => {

  return (
    <Breadcrumb spacing='8px' pb={2}>
      {
        firstName && firstRoute ? (
          <BreadcrumbItem isCurrentPage={!secondRoute}>
            <BreadcrumbLink href={firstRoute}>{firstName}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : null
      }
      {
        secondName && secondRoute ? (
          <BreadcrumbItem isCurrentPage={!thirthRoute}>
            <BreadcrumbLink href={secondRoute}>{secondName}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : null
      }
      {
        thirthName && thirthRoute ? (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={thirthRoute}>{thirthName}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : null
      }
      {
        fourthName && fourthRoute ? (
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href={fourthRoute}>{fourthName}</BreadcrumbLink>
          </BreadcrumbItem>
        ) : null
      }
    </Breadcrumb>
  )
}

const MenuDefault = (props: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ForceAuth>
      <Head>
        <title>{titlePage()}</title>
        <link rel="icon" href="favicon.ico" />
      </Head>
    
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: 'none', md: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav onOpen={onOpen} />

        <Box ml={{ base: 10, md: 60 }} p="4">
          { renderBreadcrumb(props?.firstName, props?.firstRoute, 
            props?.secondName, props?.secondRoute, props?.thirthName, props?.thirthRoute,
            props?.fourthName, props?.fourthRoute) }
          {props.children}
        </Box>
      </Box>
    </ForceAuth>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.route} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: any;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Meu perfil</MenuItem>
              <MenuItem>Configurações</MenuItem>
              <MenuDivider />
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export default MenuDefault