import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "@mui/material";

const LeftContainer = styled.div`
  width: 100px;
  height: 200px;
  background-color: red;
`;
const Arena = () => {
  return (
    <>
      Arena
      <LeftContainer>
        <div>hello</div>
      </LeftContainer>
      <Button>
        <Link to="/">Powrót do strony głównej</Link>
      </Button>
    </>
  );
};

export default Arena;
