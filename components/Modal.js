import styled from "styled-components";
import { router } from "next/router";

export default function Modal({ onClose, handleDelete, id, currentDevice }) {
  return (
    <Overlay>
      <ModalContainer>
        <StyledHeaderModal>
          ARE YOU SURE YOU WANT TO DELETE YOUR {currentDevice.device}
        </StyledHeaderModal>
        <StyledButtonContainer>
          <StyledButtonYES
            type="button"
            onClick={() => {
              handleDelete(id), router.push("/");
            }}
          >
            YES
          </StyledButtonYES>
          <StyledButtonNO type="button" onClick={onClose}>
            NO
          </StyledButtonNO>
        </StyledButtonContainer>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
`;

const ModalContainer = styled.div`
  z-index: 100;
  position: fixed;
  max-width: 90%;
  width: 80%;
  height: 28%;
  border-radius: 20px;
  background-color: rgba(255, 255, 255);
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const StyledHeaderModal = styled.h2`
  font-size: 20px;
  font-style: none;
  padding: 10px 15px 10px 15px;
`;
const StyledButtonNO = styled.button`
  background-color: #b2da6e;
  border: transparent;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 33px;
  width: 130px;
`;
const StyledButtonYES = styled.button`
  background-color: #defec0;
  border: transparent;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 33px;
  width: 130px;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;
