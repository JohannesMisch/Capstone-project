import { useState } from "react";
import styled from "styled-components";
import { EntertainmentIcon } from "@/components/Icons";
import { AppliancesIcon } from "@/components/Icons";
import { WorkIcon } from "@/components/Icons";
import { LightingIcon } from "@/components/Icons";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
};

export default function Card({
  deviceCategory,
  name,
  location,
  model,
  powerConsumption,
  powerConsumptionStandby,
  averageUsageTime,
  id,
  handleDelete,
}) {
  const [areDetailsDisplayed, setAreDetailsDisplayed] = useState(false);

  return (
    <>
      <section>
        {CATEGORY_MAP[deviceCategory]}
        <p>Device:{name.toUpperCase()}</p>
        {areDetailsDisplayed && (
          <ul>
            <StyledListItem>Location: {location}</StyledListItem>
            <StyledListItem>Device category: {deviceCategory}</StyledListItem>
            <StyledListItem>Model: {model}</StyledListItem>
            <StyledListItem>
              Power consumption {powerConsumption} W/h
            </StyledListItem>
            <StyledListItem>
              Power consumption Standby: {powerConsumptionStandby} W/h
            </StyledListItem>
          </ul>
        )}
        <p>Average usage time:{averageUsageTime}h</p>
      </section>
      <button onClick={() => setAreDetailsDisplayed(!areDetailsDisplayed)}>
        Details
      </button>
      <button onClick={() => handleDelete(id)}>ID</button>
    </>
  );
}

const StyledListItem = styled.li`
  overflow-wrap: break-word;
`;
