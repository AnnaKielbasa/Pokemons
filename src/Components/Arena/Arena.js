import styled from "styled-components";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";

const LeftContainer = styled.div`
  width: 100px;
  height: 200px;
  color: red;
  background-color: red;
`;
const Arena = () => {
  return (
    <>
      Arena
      <LeftContainer>
        <div>
          {/* <FacebookIcon sx={{ color: "red" }} />
        <GitHubIcon sx={{ color: "green" }} /> */}
        </div>
      </LeftContainer>
    </>
  );
};

export default Arena;
