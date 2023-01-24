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

const Wrapper = styled.li`
  border: solid black 3px;
`;

export default function Card({
  deviceCategory,
  name,
  location,
  model,
  powerConsumption,
  powerConsumptionStandby,
  averageUsageTime,
}) {
  const [areDetailsDisplayed, setAreDetailsDisplayed] = useState(false);

  return (
    <Wrapper>
      <section>
        {CATEGORY_MAP[deviceCategory]}
        <p>Device:{name}</p>
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
    </Wrapper>
  );
}

const StyledListItem = styled.li`
  overflow-wrap: break-word;
`;
