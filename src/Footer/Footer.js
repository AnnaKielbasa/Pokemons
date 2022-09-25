import styled from "styled-components";

const Footer = () => {
  return (
    <S.Container>
      <div>Made by: Anna Kiełbasa</div>
    </S.Container>
  );
};

export default Footer;
const S = {
  Container: styled.div`
    position: fixed;
    bottom: 0;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};
