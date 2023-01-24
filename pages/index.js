import styled from "styled-components";
import { EntertainmentIcon } from "@/components/Icons";
import { AppliancesIcon } from "@/components/Icons";
import { WorkIcon } from "@/components/Icons";
import { LightingIcon } from "@/components/Icons";
import Card from "@/components/Card";

export default function Home({ devices }) {
  return (
    <StyledList>
      {devices.map((device) => (
        <Card
          key={device.id}
          deviceCategory={device.device_category}
          name={device.device}
          location={device.location}
          model={device.model}
          powerConsumption={device.power_consumption}
          powerConsupmtionStandby={device.power_consumption_standby}
          averageUsageTime={device.average_usage_time}
        />
      ))}
    </StyledList>
  );
}

const StyledCard = styled.li`
  border: solid black 3px;
`;
const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
`;
