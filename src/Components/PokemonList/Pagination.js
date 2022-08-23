import styled from "styled-components";

const S = {
  Pagination: styled.div`
    display: flex;
    background-color: blue;
    justify-content: center;
    align-items: center;
  `,
};

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <S.Pagination>
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </S.Pagination>
  );
}
