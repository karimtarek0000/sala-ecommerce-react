import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Profile from "@components/layout/Profile";
import { AuthContext } from "@context/Authentication";
import { selectCart } from "@store/features/cartSlice";
import { onOpenCartDrawerAction } from "@store/features/globalSlice";
import { useAppDispatch, useAppSelector } from "@store/strore";
import { useContext } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { Link, NavLink as RouterNavLink } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  path: string;
}

const Links = [
  {
    path: "products",
    name: "Products",
  },
];

const NavLink = (props: Props) => {
  const { path, children } = props;

  return (
    <Box
      as={RouterNavLink}
      to={path}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: "#9d77ecc4",
      }}
    >
      {children}
    </Box>
  );
};

export default function Simple() {
  const { isAuthenticated } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { prodcuts } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  // ----------------- HANDLER -----------------
  const openDrawerHandler = () => dispatch(onOpenCartDrawerAction());

  return (
    <Box
      height={{ base: "auto", md: "65px" }}
      overflow={"hidden"}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <Container maxW={"8xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} to="/" fontWeight={700} fontSize={"x-large"}>
              Sala
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name} path={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <HStack>
            {isAuthenticated && (
              <Button ms={"auto"} as={Link} to="/dashboard">
                Dashboard
              </Button>
            )}
            <Button onClick={openDrawerHandler}>
              <GiShoppingCart transform="scale(1.3)" />
              <Text width={"30px"}>({prodcuts.length})</Text>
            </Button>
            <Profile statusIconMenu={false} />
          </HStack>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name} path={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}
