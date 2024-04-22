import { useColorMode } from "@chakra-ui/react";

interface IColor {
  light: string;
  dark: string;
}

const useColorForMode = ({ light, dark }: IColor): string => {
  const { colorMode } = useColorMode();

  return colorMode === "light" ? light : dark;
};

export default useColorForMode;
