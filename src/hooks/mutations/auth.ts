import { useToast } from "@chakra-ui/react";
import { AuthContext } from "@context/Authentication";
import { login } from "@services/auth.servics";
import { AxiosError } from "axios";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setUserInformation } = useContext(AuthContext);

  return useMutation({
    mutationFn: (userData: ILogin) => login(userData),
    onSuccess(data: IUserData) {
      toast({
        title: "Login successfully",
        status: "success",
      });
      setUserInformation(data);
      navigate("/", { replace: true });
    },
    onError(error: AxiosError<IError>) {
      toast({
        title: `${error.response?.data.error.message as string}`,
        status: "error",
        isClosable: true,
      });
    },
  });
};
