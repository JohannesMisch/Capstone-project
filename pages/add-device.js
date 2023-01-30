import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import AddForm from "@/components/AddDeviceForm";
import Card from "@/components/Card";
import Doughnut from "@/components/DoughnutChart";

export default function AddNewDevice({ createDevice, devices, handleDelete }) {
  const [toggleForm, setToggleForm] = useState(false);
  const sortedDevices = [...devices];

  function filterByCategory(category) {
    return (device) => device.device_category === category;
  }

  const calculateDailyPowerConsumption = (device) =>
    device.power_consumption * device.average_usage_time;
  const sum = (accumulator, currentValue) => accumulator + currentValue;

  const sumUpAppliances = devices
    .filter(filterByCategory("Appliances"))
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

  const sumUpEntertainment = devices
    .filter(filterByCategory("Entertainment"))
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

  const sumUpWork = devices
    .filter(filterByCategory("Work"))
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

  const sumUpLighting = devices
    .filter(filterByCategory("Lighting"))
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

  const chartData = {
    labels: ["Entertainment", "Appliances", "Work", "Lighting"],
    datasets: [
      {
        label: "Power consumption",
        data: [sumUpEntertainment, sumUpAppliances, sumUpWork, sumUpLighting],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Link href="/">Home</Link>
      <Doughnut chartData={chartData} />
      <StyledList>
        {sortedDevices
          .sort((a, b) =>
            a.device_category > b.device_category
              ? 1
              : a.device_category === b.device_category
              ? a.device > b.device
                ? 1
                : -1
              : -1
          )
          .map((sortedDevice) => (
            <Wrapper key={sortedDevice.id}>
              <Card
                id={sortedDevice.id}
                deviceCategory={sortedDevice.device_category}
                name={sortedDevice.device}
                location={sortedDevice.location}
                model={sortedDevice.model}
                powerConsumption={sortedDevice.power_consumption}
                powerConsumptionStandby={sortedDevice.power_consumption_standby}
                averageUsageTime={sortedDevice.average_usage_time}
                handleDelete={handleDelete}
              />
            </Wrapper>
          ))}
      </StyledList>
      {toggleForm && <AddForm createDevice={createDevice} />}
      <StyledButton
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        {toggleForm ? "-" : "+"}
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  z-index: 3;
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: red;
  height: 40px;
  width: 40px;
`;

const Wrapper = styled.li`
  border: solid black 3px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
`;
