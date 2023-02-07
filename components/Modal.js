import styled from "styled-components";
import { router } from "next/router";

export default function Modal({
  showDeleteModal,
  onClose,
  handleDelete,
  id,
  currentDevice,
}) {
  return (
    <Overlay>
      <ModalContainer>
        <h2>Are you sure you want to delete your {currentDevice.device}</h2>
        <button
          type="button"
          onClick={() => {
            handleDelete(id), router.push("/");
          }}
        >
          YES
        </button>
        <button type="button" onClick={onClose}>
          NO
        </button>
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
  background-color: rgba(255, 255, 255);
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
