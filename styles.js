import { createGlobalStyle } from "styled-components";
import { Tenor_Sans } from "@next/font/google";

const Tenor = Tenor_Sans({ subsets: ["latin"], weight: ["400"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding:0;
    color: #4d4d4d;
    font-family: ${Tenor.style.fontFamily};
  }
`;
