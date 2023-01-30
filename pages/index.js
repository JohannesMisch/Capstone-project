import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";
import { useState } from "react";

export default function Home({ devices, handleDelete }) {
  const [isFiltered, setIsFiltered] = useState(true);
  const [isData, setIsData] = useState({ device_category: "" });

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setIsFiltered(false);
    setIsData(data);
    event.target.reset();
  }

  const filteredDevices = devices.filter(
    (devices) =>
      devices.device_category === isData.device_category ||
      devices.location === isData.device_category
  );
  return (
    <>
      <Link href="/add-device">Add Device</Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">How do you want to sort your List?</label>
        <select id="searchInput" name="device_category" type="text" required>
          <option value="">--Please choose a category--</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Appliances">Appliances</option>
          <option value="Work">Work</option>
          <option value="Lighting">Lighting</option>
          <option value="Livingroom">Livingroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
        </select>
        <button type="submit">Search</button>
        <button type="button" onClick={() => setIsFiltered(true)}>
          Reset
        </button>
      </form>
      {isFiltered ? (
        <StyledList>
          {devices.map((device) => (
            <Wrapper key={device.id}>
              <Card
                id={device.id}
                deviceCategory={device.device_category}
                name={device.device}
                location={device.location}
                model={device.model}
                powerConsumption={device.power_consumption}
                powerConsumptionStandby={device.power_consumption_standby}
                averageUsageTime={device.average_usage_time}
                handleDelete={handleDelete}
              />
            </Wrapper>
          ))}
        </StyledList>
      ) : (
        <StyledList>
          {filteredDevices.map((device) => (
            <Wrapper key={device.id}>
              <Card
                id={device.id}
                deviceCategory={device.device_category}
                name={device.device}
                location={device.location}
                model={device.model}
                powerConsumption={device.power_consumption}
                powerConsumptionStandby={device.power_consumption_standby}
                averageUsageTime={device.average_usage_time}
                handleDelete={handleDelete}
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
