import { useToast } from "@chakra-ui/react";
import { setOnlineStatus } from "@store/features/NetworkSlice";
import { useAppDispatch } from "@store/strore";
import { ReactNode, useEffect, useRef } from "react";
import { FiWifiOff } from "react-icons/fi";

function OnlineStatus({ children }: { children: ReactNode }) {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const toastRef = useRef<any>();

  const addToast = (): void => {
    toastRef.current = toast({
      title: "You're now offline",
      description: "Please check your network",
      status: "success",
      duration: null,
      isClosable: false,
      icon: <FiWifiOff />,
    });
    dispatch(setOnlineStatus(true));
  };

  const closeToast = (): void => {
    toast.closeAll(toastRef.current);
    dispatch(setOnlineStatus(false));
  };

  useEffect(() => {
    const handleOnline = () => addToast();
    const handleOffline = () => closeToast();

    window.addEventListener("online", handleOffline);
    window.addEventListener("offline", handleOnline);

    return () => {
      window.removeEventListener("online", handleOffline);
      window.removeEventListener("offline", handleOnline);
    };
  });

  return <>{children}</>;
}

export default OnlineStatus;
