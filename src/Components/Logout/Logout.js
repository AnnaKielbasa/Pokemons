import LoginContext from "../../Context/LoginContext";
import { useContext } from "react";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";

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
    <S.Container>
      <S.Button onClick={handleLogout}>Wyloguj się</S.Button>
    </S.Container>
  );
};

export default Logout;

const S = {
  Container: styled.div`
    display: flex;
    justify-content: center;
  `,
  Button: styled(Button)`
    && {
      font-size: 2rem;
      color: ${({ theme }) => theme.text};
    }
  `,
};
