import { useToast } from "@chakra-ui/react";
import cookiesServics from "@services/cookies.servics";
import { createContext, ReactNode, useState } from "react";

interface IAuthContext {
  isAuthenticated: boolean;
  userData: IUser;
  setUserInformation: (data: IUserData) => void;
  logout: () => void;
}
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

interface IAuth {
  children: ReactNode;
}

const Authentication = ({ children }: IAuth) => {
  const TOKEN_NAME = "token";
  const USER_DATA = "userData";

  // ----------------- STATE -----------------
  const toast = useToast();
  const [userData, setUserData] = useState<IUser>({} as IUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ----------------- HANDLER -----------------
  const setUserInformation = (data: IUserData): void => {
    cookiesServics.setCookie(TOKEN_NAME, data.jwt, {});
    localStorage.setItem(USER_DATA, JSON.stringify(data.user));
    setIsAuthenticated(true);
    setUserData(data.user);
  };
  const logout = (): void => {
    setUserData({} as IUser);
    setIsAuthenticated(false);
    cookiesServics.removeCookie(TOKEN_NAME);
    localStorage.removeItem(USER_DATA);
    toast({
      title: "Logout successfully",
      status: "success",
      position: "top",
    });
  };

  if (
    cookiesServics.getCookie(TOKEN_NAME) &&
    localStorage.getItem(USER_DATA) &&
    !Object.keys(userData).length
  ) {
    setIsAuthenticated(true);
    setUserData(JSON.parse(localStorage.getItem(USER_DATA) as string));
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, logout, userData, setUserInformation }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default Authentication;
