import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";
import { useState } from "react";

export default function Home({ devices }) {
  const [isFiltered, setIsFiltered] = useState(true);
  const [isData, setIsData] = useState({ device_category: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setIsFiltered(false);
    setIsData(data);
  }

  const filteredDevices = devices.filter(
    (devices) => devices.device_category === isData.device_category
  );
  return (
    <>
      <Link href="/AddNewDevicePage">Add Device</Link>
      <button onClick={() => setIsFiltered(true)}>Reset</button>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">How do you want to sort your List?</label>
        <select id="searchInput" name="device_category" type="text" required>
          <option value="">--Please choose a category--</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Appliances">Appliances</option>
          <option value="Work">Work</option>
          <option value="Lighting">Lighting</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {isFiltered ? (
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
      ) : (
        <StyledList>
          {filteredDevices.map((device) => (
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
      )}
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
