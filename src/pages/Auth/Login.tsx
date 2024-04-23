import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useLogin } from "@hooks/mutations/auth";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // ----------------- STATE -----------------
  const [showPassword, setShowPassword] = useState(false);
  const [isPassword, setIsPassword] = useState({
    status: false,
    errorMsg: "",
  });
  const [isEmail, setIsEmail] = useState({
    status: false,
    errorMsg: "",
  });
  const [userData, setUserData] = useState({
    identifier: "testing@gmail.com",
    password: "@@@test1234",
  });
  const { mutate, isLoading } = useLogin();

  // ----------------- HANDLER -----------------
  const changeHandler = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setUserData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };
  const validationOnEmail = () => {
    if (!userData.identifier) {
      return setIsEmail((prev) => ({ ...prev, status: true }));
    }
    return true;
  };
  const resetError = () => {
    setIsEmail({ status: false, errorMsg: "Email is required" });
    setIsPassword({ status: false, errorMsg: "Password is required" });
  };
  const validationOnPassword = () => {
    if (!userData.password) {
      return setIsPassword((prev) => ({ ...prev, status: true }));
    }

    return true;
  };
  const onSubmitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetError();

    const statusEmail = validationOnEmail();
    const statusPassword = validationOnPassword();

    if (statusEmail && statusPassword) mutate(userData);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} width={"100%"} maxW={"lg"} py={12} px={5}>
        <HStack fontSize={"4xl"} justify={"center"} align={"center"}>
          <Heading>Sign in to</Heading>
          <Heading as={Link} color={"orange"} to="/">
            Sala
          </Heading>
        </HStack>

        <Box
          as="form"
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={onSubmitHandler}
        >
          <Stack spacing={4}>
            {/* Email */}
            <FormControl id="email">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                value={userData.identifier}
                onChange={changeHandler}
                _invalid={{ borderColor: "red.500" }}
                autoComplete="off"
                isInvalid={isEmail.status}
                type="email"
                name="identifier"
                id="email"
              />
              {isEmail.status && (
                <FormHelperText>{isEmail.errorMsg}</FormHelperText>
              )}
            </FormControl>

            {/* Password */}
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  _invalid={{ borderColor: "red.500" }}
                  isInvalid={isPassword.status}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={userData.password}
                  onChange={changeHandler}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword.status && (
                <FormHelperText>{isPassword.errorMsg}</FormHelperText>
              )}
            </FormControl>

            {/* Actions */}
            <Stack spacing={10} pt={2}>
              <Button
                type="submit"
                size="lg"
                isLoading={isLoading}
                bg={
                  isPassword.status || isEmail.status ? "red.400" : "blue.400"
                }
                color={"white"}
                _hover={{
                  bg:
                    isPassword.status || isEmail.status
                      ? "red.300"
                      : "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
