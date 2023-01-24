import styled from "styled-components";
import { EntertainmentIcon } from "@/components/Icons";
import { AppliancesIcon } from "@/components/Icons";
import { WorkIcon } from "@/components/Icons";
const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
};

export default function Home({ devices }) {
  return (
    <StyledList>
      {devices.map((device) => (
        <StyledCard key={device.id}>
          <section>
            {CATEGORY_MAP[device.device_category]}
            <p>Device:{device.device}</p>
            <p>Device category: {device.device_category}</p>
            <p>Model: {device.model}</p>
            <p>Power consumption {device.power_consumption} W/h</p>
            <p>
              Power consumption Standby: {device.power_consumption_standby} W/h
            </p>
            <p>Average usage time:{device.average_usage_time}h</p>
            <p>Location: {device.location}</p>
          </section>
        </StyledCard>
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
