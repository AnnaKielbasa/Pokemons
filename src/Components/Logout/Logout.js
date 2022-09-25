import LoginContext from "../../Context/LoginContext";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const Logout = () => {
  const { isLoggedIn, setIsLoggedIn, logoutUser } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleLogout = () => {
    enqueueSnackbar("Zostałeś wylogowana/y");
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
