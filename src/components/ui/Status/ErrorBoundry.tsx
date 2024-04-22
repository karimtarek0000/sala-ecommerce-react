import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdErrorOutline } from "react-icons/md";

interface IErrorBoundry {
  isError: boolean;
  errorText: string;
  children: ReactNode;
}
const ErrorBoundry = ({ isError, errorText, children }: IErrorBoundry) => {
  return isError ? (
    <Box display={"flex"} fontSize={"2rem"} alignItems={"center"} gap={"5px"}>
      <MdErrorOutline color="red" fontSize={"2.5rem"} />
      <Text>{errorText}</Text>
    </Box>
  ) : (
    children
  );
};

export default ErrorBoundry;
