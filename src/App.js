import { ThemeProvider } from "styled-components";
import { useState } from "react";
import "./App.css";
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
  const [theme, setTheme] = useState("main");
  const isDarkTheme = theme === "earthy";
  return (
    <>
      <ThemeProvider theme={isDarkTheme ? earthyTheme : mainTheme}>
        <Routing />
      </ThemeProvider>
    </>
  );
}

export default App;
