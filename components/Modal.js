import styled from "styled-components";
import Link from "next/link";
import { router } from "next/router";

export default function Modal({
  showModalDelete,
  onClose,
  handleDelete,
  id,
  currentDevice,
}) {
  if (!showModalDelete) return null;
  return (
    <Overlay>
      <ModalContainer>
        <h2>Are you sure you want to delete your {currentDevice.device}</h2>
        <button
          onClick={() => {
            handleDelete(id), router.push("/");
          }}
        >
          YES
        </button>
        <button onClick={onClose}>NO</button>
      </ModalContainer>
    </Overlay>
  );
}
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
`;
const ModalContainer = styled.div`
  background-color: rgba(255, 255, 255);
  top: 50%;
  left: 50%;
`;
