import Devices from "../db.json";
import styled from "styled-components";

export default function Home({ devices }) {
  return (
    <StyledList>
      {devices.map((device) => (
        <ul key={device.id}>
          <li>{device.image}</li>
          <li>{device.decive}</li>
          <li>{device.decive_category}</li>
          <li>{device.model}</li>
          <li>{device.power_consumption}</li>
          <li>{device.power_consumption_standby}</li>
          <li>{device.average_usage_time}</li>
          <li>{device.location}</li>
        </ul>
      ))}
    </StyledList>
  );
}
const StyledList = styled.list`
  border: solid black 3px;
`;
