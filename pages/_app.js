import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import userDevices from "../db.json";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

export default function App({ Component, pageProps }) {
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [...userDevices],
  });

  function createDevice(newDevice) {
    setDevices((oldDevices) => [
      {
        ...newDevice,
        device: newDevice.device.toUpperCase(),
        id: uuidv4(),
      },
      ...oldDevices,
    ]);
  }

  function handleDelete(id) {
    const devicesAfterDelete = devices.filter((devices) => id !== devices.id);
    setDevices(devicesAfterDelete);
  }

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <StyledHeadline>PowerSum</StyledHeadline>
      <Component
        {...pageProps}
        devices={devices}
        createDevice={createDevice}
        handleDelete={handleDelete}
        setDevices={setDevices}
      />
    </>
  );
}
const StyledHeadline = styled.h1`
  text-align: center;
  background-color: #e7f4ce;
  margin: 0;
  height: 40px;
`;
