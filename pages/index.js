import styled from "styled-components";
import { ReactComponent as Entertainment } from "../assets/Entertainment.svg";

export default function Home({ devices }) {
  console.log(devices, Entertainment);

  function handleImage(category) {
    console.log(category);
    if (category === "Entertainment") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M7.35 38q-1.9 0-2.975-1.275Q3.3 35.45 3.6 33.2L6 16.45q.4-2.65 2.475-4.55T13.2 10h21.65q2.65 0 4.725 1.9 2.075 1.9 2.475 4.55L44.4 33.2q.3 2.25-.775 3.525T40.65 38q-1.15 0-1.95-.375t-1.35-.925l-5.2-5.2h-16.3l-5.2 5.2q-.55.55-1.35.925T7.35 38Zm.9-3.2 6.3-6.3h18.9l6.3 6.3q.25.25.9.45.45 0 .675-.45.225-.45.125-.9l-2.4-16.95q-.25-1.75-1.475-2.85T34.85 13h-21.7q-1.5 0-2.725 1.1T8.95 16.95L6.55 33.9q-.1.45.125.9t.675.45q.35 0 .9-.45ZM35 26q.8 0 1.4-.6.6-.6.6-1.4 0-.8-.6-1.4-.6-.6-1.4-.6-.8 0-1.4.6-.6.6-.6 1.4 0 .8.6 1.4.6.6 1.4.6Zm-4.25-6.5q.8 0 1.4-.6.6-.6.6-1.4 0-.8-.6-1.4-.6-.6-1.4-.6-.8 0-1.4.6-.6.6-.6 1.4 0 .8.6 1.4.6.6 1.4.6ZM15 25.75h2.5V22h3.75v-2.5H17.5v-3.75H15v3.75h-3.75V22H15Zm9-1.65Z" />
        </svg>
      );
    }
    if (category === "Appliances") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M4 36v-6q0-3.3 2.35-5.65Q8.7 22 12 22h19v-2.5q0-1.05-.725-1.775Q29.55 17 28.5 17h-8.95q-1.05 0-1.775.725-.725.725-.725 1.775H14q0-2.3 1.6-3.9t3.9-1.6h9q2.3 0 3.9 1.6t1.6 3.9v9q1.15 0 2.075-.675Q37 27.15 37 26v-8.5q0-2.3 1.6-3.9t3.9-1.6H44v3h-1.5q-1.05 0-1.775.725Q40 16.45 40 17.5V26q0 2.4-1.775 3.95Q36.45 31.5 34 31.5V36Zm3-3h24v-8H12q-2.1 0-3.55 1.45Q7 27.9 7 30Zm24 0v-8 8Z" />
        </svg>
      );
    }
    if (category === "Work") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M16.7 42v-3H21v-5H7q-1.2 0-2.1-.9Q4 32.2 4 31V9q0-1.2.9-2.1Q5.8 6 7 6h34q1.2 0 2.1.9.9.9.9 2.1v22q0 1.2-.9 2.1-.9.9-2.1.9H27v5h4.3v3ZM7 31h34V9H7v22Zm0 0V9v22Z" />
        </svg>
      );
    }
    if (category === "Lighting") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
          <path d="M24 44q-1.7 0-2.875-1.175T19.95 39.95h8.1q0 1.7-1.175 2.875T24 44Zm-8.1-7.15v-3h16.2v3Zm.25-6.05q-3.3-2.15-5.225-5.375Q9 22.2 9 18.15q0-6.1 4.45-10.55Q17.9 3.15 24 3.15q6.1 0 10.55 4.45Q39 12.05 39 18.15q0 4.05-1.9 7.275-1.9 3.225-5.25 5.375Zm1.1-3H30.8q2.4-1.6 3.8-4.15 1.4-2.55 1.4-5.5 0-4.95-3.525-8.475Q28.95 6.15 24 6.15q-4.95 0-8.475 3.525Q12 13.2 12 18.15q0 2.95 1.4 5.5t3.85 4.15Zm6.75 0Z" />
        </svg>
      );
    }
  }
  return (
    <StyledList>
      {devices.map((device) => (
        <StyledCard key={device.id}>
          <p>{handleImage(device.device_category)}</p>
          <p>Device:{device.device}</p>
          <p>Device category: {device.device_category}</p>
          <p>Model: {device.model}</p>
          <p>Power consumption {device.power_consumption} W/h</p>
          <p>
            Power consumption Standby: {device.power_consumption_standby} W/h
          </p>
          <p>Average usage time:{device.average_usage_time}h</p>
          <p>Location: {device.location}</p>
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
  padding: 20px 10px 20px 10px;
`;
const StyledIcon = styled.img``;
