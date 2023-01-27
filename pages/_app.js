import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import userDevices from "../db.json";
import { v4 as uuidv4 } from "uuid";

export default function App({ Component, pageProps }) {
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [...userDevices],
  });
  function createDevice(newDevice) {
    setDevices((oldDevices) => [
      {
        ...newDevice,
        id: uuidv4(),
      },
      ...oldDevices,
    ]);
  }
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Capstone Project</title>
      </Head>
      <Component {...pageProps} devices={devices} createDevice={createDevice} />
    </>
  );
}
