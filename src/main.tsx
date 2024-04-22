import { ChakraProvider } from "@chakra-ui/react";
import OnlineStatus from "@components/ui/OnlineStatus";
import { persistor, store } from "@store/strore";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import App from "src/App";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <OnlineStatus>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </OnlineStatus>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
