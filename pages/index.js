import styled from "styled-components";

export default function Home({ devices }) {
  console.log(devices);
  return (
    <ul>
      {devices.map((device) => (
        <StyledCard key={device.id}>
          <li>{device.image}</li>
          <li>{device.device}</li>
          <li>{device.device_category}</li>
          <li>{device.model}</li>
          <li>{device.power_consumption}</li>
          {/* {console.log(device.powerConsumption)} */}
          <li>{device.power_consumption_standby}</li>
          <li>{device.average_usage_time}</li>
          <li>{device.location}</li>
        </StyledCard>
      ))}
    </ul>
  );
}
const StyledCard = styled.ul`
  border: solid black 3px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
