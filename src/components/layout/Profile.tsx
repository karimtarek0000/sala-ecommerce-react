import {
  Avatar,
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { AuthContext } from "@context/Authentication";
import { useContext } from "react";
import { FiChevronDown, FiMenu } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

interface MobileProps extends FlexProps {
  statusIconMenu?: boolean;
  onOpen?: () => void;
}

const Profile = ({ onOpen, statusIconMenu = true, ...rest }: MobileProps) => {
  const { isAuthenticated, logout, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  // ----------------- HANDLER -----------------
  const logoutHandler = () => {
    logout();
    navigate("/auth", { replace: true });
  };

  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      {statusIconMenu && (
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
      )}

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          {isAuthenticated && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar size={"sm"} />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{userData.username}</Text>
                  </VStack>
                  <Box>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>

              <MenuList bg="gray.900" p={"10px"} borderColor="gray.700">
                <Button width={"100%"} onClick={logoutHandler}>
                  logout
                </Button>
              </MenuList>
            </Menu>
          )}
          {!isAuthenticated && (
            <Button as={Link} to="/auth">
              Login
            </Button>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};

export default Profile;
