import { Button } from "@mui/material";
import styled from "styled-components";

export default function Pagination({ page, setPage }) {
  return (
    <S.Pagination>
      {page !== 0 ? (
        <S.Button onClick={() => setPage((old) => old - 15)}>Previous</S.Button>
      ) : null}
      {page < 150 ? (
        <S.Button onClick={() => setPage((old) => old + 15)}>Next</S.Button>
      ) : null}
    </S.Pagination>
  );
}

const S = {
  Pagination: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    gap: 1rem;
  `,
  Button: styled(Button)`
    && {
      background-color: ${({ theme }) => theme.background};
      color: ${({ theme }) => theme.text};
    }
  `,
};
