import { useState } from "react";
import styled from "styled-components";
import { EntertainmentIcon } from "@/components/Icons";
import { AppliancesIcon } from "@/components/Icons";
import { WorkIcon } from "@/components/Icons";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
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
            <li>Location: {location}</li>
            <li>Device category: {deviceCategory}</li>
            <li>Model: {model}</li>
            <li>Power consumption {powerConsumption} W/h</li>
            <li>Power consumption Standby: {powerConsumptionStandby} W/h</li>
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
