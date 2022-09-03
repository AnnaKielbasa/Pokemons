import { ThemeProvider } from "styled-components";
import { useState } from "react";
import GlobalStyle from "./globalStyles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { theme } from "./Theme";

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
  const client = new QueryClient();
  const [theme, setTheme] = useState("main");
  const isDarkTheme = theme === "earthy";
  return (
    <QueryClientProvider client={client}>
      <ThemeProvider theme={isDarkTheme ? earthyTheme : mainTheme}>
        <GlobalStyle />
        <Routing />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
