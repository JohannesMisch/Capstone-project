import GlobalStyle from "@/styles";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";
import Devices from "../db.json";

export default function App({ Component, pageProps }) {
  const [devices, setDevices] = useLocalStorageState("devices", {
    defaultValue: [...Devices],
  });
  function createDevice(device) {
    setDevices([...devices, device]);
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
