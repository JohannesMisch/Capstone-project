import { useState } from "react";
import styled from "styled-components";
import {
  EntertainmentIcon,
  AppliancesIcon,
  WorkIcon,
  LightingIcon,
} from "@/components/Icons";
import EditCard from "./EditCard";
import Link from "next/link";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
};

export default function Card({ deviceCategory, name, averageUsageTime }) {
  const [areDetailsDisplayed, setAreDetailsDisplayed] = useState(false);

  return (
    <section>
      {CATEGORY_MAP[deviceCategory]}
      <p>Device:{name}</p>
      <p>Average usage time:{averageUsageTime}h</p>
    </section>
  );
}

const StyledListItem = styled.li`
  overflow-wrap: break-word;
`;
