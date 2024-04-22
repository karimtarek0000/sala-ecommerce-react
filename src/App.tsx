import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Authentication from "@context/Authentication";
import router from "@routes/index";
import { RouterProvider } from "react-router-dom";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <Authentication>
      <ChakraProvider
        theme={theme}
        toastOptions={{
          defaultOptions: { position: "top", isClosable: false },
        }}
      >
        <RouterProvider router={router} />
      </ChakraProvider>
    </Authentication>
  );
}

export default App;
