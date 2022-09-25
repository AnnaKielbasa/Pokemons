import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "./globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FavProvider } from "./Context/FavContext";
import { LoginProvider } from "./Context/LoginContext";
import { ArenaProvider } from "./Context/ArenaContext";
import { ModifiedPokemonsContextProvider } from "./Context/ModifiedPokemonsContext";
import { NewPokemonsContextProvider } from "./Context/NewPokemonsContext";
import { SnackbarProvider } from "notistack";

import { theme } from "./Theme";

import Routing from "./Routing";

const mainTheme = {
  subtitle: "#ffef96",
  title: "#50394c",
  background: "#b2b2b2",
  body: "#f4e1d2",
};
const earthyTheme = {
  title: "#3e4444",
  body: "#82b74b",
  subtitle: "#405d27",
  background: "#c1946a",
};

function App() {
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
  const [theme, setTheme] = useState("main");
  const isDarkTheme = theme === "earthy";

  return (
    <QueryClientProvider client={client}>
      <SnackbarProvider>
        <ThemeProvider theme={isDarkTheme ? earthyTheme : mainTheme}>
          <NewPokemonsContextProvider>
            <ModifiedPokemonsContextProvider>
              <FavProvider>
                <LoginProvider>
                  <ArenaProvider>
                    <GlobalStyle />
                    <Routing />
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
