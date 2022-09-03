import { Button } from "@mui/material";
import styled from "styled-components";

const S = {
  Pagination: styled.div`
    display: flex;
    background-color: #ffef96;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  `,
};

export default function Pagination({ setPage, page }) {
  return (
    <S.Pagination>
      {page !== 0 ? (
        <Button onClick={() => setPage((old) => Math.max(old - 15))}>
          Previous
        </Button>
      ) : null}
      {page < 150 ? (
        <Button onClick={() => setPage((old) => old + 15)}>Next</Button>
      ) : null}
    </S.Pagination>
  );
}
