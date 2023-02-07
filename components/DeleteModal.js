import styled from "styled-components";
import Modal from "./Modal";

export default function ModalDelete({
  showModalDelete,
  handleDelete,
  handleClose,
  currentDevice,
}) {
  return (
    <Modal show={showModalDelete}>
      <GridWrapper>
        <h2>Are you sure, you want to delete your {currentDevice}?</h2>
        <Wrapper>
          <StyledButton onClick={handleClose}>No</StyledButton>
          <StyledButton onClick={handleDelete}>Yes</StyledButton>
        </Wrapper>
      </GridWrapper>
    </Modal>
  );
}

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 1.2em;
  background: none;
  border: 1px solid black;
  border-radius: 5px;
  &:hover {
    background-color: lightblue;
  }
`;

const GridWrapper = styled.div`
  background-color: rgb(250, 250, 250);
  width: 95vw;
  height: 30vh;
  border-radius: 5px;
  padding: 10px;
  display: grid;
  align-items: flex-start;
  justify-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
`;
