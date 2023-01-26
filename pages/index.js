import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home({ devices }) {
  return (
    <>
      <Link href="/addNewDevicePage">Add Device</Link>
      <StyledList>
        {devices.map((device) => (
          <Wrapper key={device.id}>
            <Card
              deviceCategory={device.device_category}
              name={device.device}
              location={device.location}
              model={device.model}
              powerConsumption={device.power_consumption}
              powerConsumptionStandby={device.power_consumption_standby}
              averageUsageTime={device.average_usage_time}
            />
          </Wrapper>
        ))}
      </StyledList>
    </>
  );
}

const Wrapper = styled.li`
  border: solid black 3px;
`;

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
