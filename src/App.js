import { ThemeProvider } from "styled-components";
import GlobalStyle from "./Theme/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavProvider } from "./Context/FavContext";
import { LoginProvider } from "./Context/LoginContext";
import { ArenaProvider } from "./Context/ArenaContext";
import { ModifiedPokemonsContextProvider } from "./Context/ModifiedPokemonsContext";
import { NewPokemonsContextProvider } from "./Context/NewPokemonsContext";
import { SnackbarProvider } from "notistack";
import { lightTheme, darkTheme } from "./Theme/Theme";
import { useDarkMode } from "./Theme/useDarkMode";

import Routing from "./Routing";

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  });
  if (!mountedComponent) return <div />;

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider>
        <ThemeProvider theme={themeMode}>
          <GlobalStyle />
          <NewPokemonsContextProvider>
            <ModifiedPokemonsContextProvider>
              <FavProvider>
                <LoginProvider>
                  <ArenaProvider>
                    <Routing theme={theme} themeToggler={themeToggler} />
                  </ArenaProvider>
                </LoginProvider>
              </FavProvider>
            </ModifiedPokemonsContextProvider>
          </NewPokemonsContextProvider>
        </ThemeProvider>
      </SnackbarProvider>
    </QueryClientProvider>
  );
}

export default App;
