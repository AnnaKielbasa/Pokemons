import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./Components/Nav/Nav";
import HomepageContent from "./Components/HomepageContent/HomepageContent";
import Favs from "./Components/Favs/Favs";
import Arena from "./Components/Arena/Arena";
import Login from "./Components/Login/Login";
import Edit from "./Components/Edit/Edit";
import Error from "./Components/Error/Error";
import Register from "./Components/Register/Register";

const Routing = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<HomepageContent />} />
        <Route path="favs" element={<Favs />} />
        <Route path="arena" element={<Arena />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="edit" element={<Edit />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
