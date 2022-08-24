import { Button } from "@mui/material";
import styled from "styled-components";

const S = {
  Pagination: styled.div`
    display: flex;
    background-color: #ffef96;
    justify-content: center;
    align-items: center;
  `,
};

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <S.Pagination>
      {gotoPrevPage && <Button onClick={gotoPrevPage}>Previous</Button>}
      {gotoNextPage && <Button onClick={gotoNextPage}>Next</Button>}
    </S.Pagination>
  );
}
