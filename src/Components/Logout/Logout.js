import LoginContext from "../../LoginContext";
import { useContext } from "react";
import { Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { isLoggedIn, setIsLoggedIn, logoutUser } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleLogout = () => {
    enqueueSnackbar("Zostałeś wylogowany");
    setIsLoggedIn({ email: "", password: "" });
    logoutUser(isLoggedIn);
    navigate("/favs");
  };

  return (
    <div>
      <Button onClick={handleLogout}>Wyloguj się</Button>
    </div>
  );
};

export default Logout;
