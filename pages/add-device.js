import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import AddForm from "@/components/AddDeviceForm";
import Card from "@/components/Card";
import Doughnut from "@/components/DoughnutChart";
import useLocalStorageState from "use-local-storage-state";

export default function AddNewDevice({ createDevice, devices, handleDelete }) {
  const [toggleForm, setToggleForm] = useState(false);
  const sortedDevices = [...devices];

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setChartData(
      chartData,
      (chartData[1].price = data.price),
      (chartData[2].overallCost = (sumUpDevices / 1000) * data.price)
    );
    event.target.reset();
  }

  function filterByCategory(category) {
    return (device) => device.device_category === category;
  }

  const calculateDailyPowerConsumption = (device) =>
    device.power_consumption * device.average_usage_time;

  const sum = (accumulator, currentValue) => accumulator + currentValue;

  const sumUpDevices = devices
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

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

  const chartDataPowerConsumption = {
    labels: ["Entertainment", "Appliances", "Work", "Lighting"],
    datasets: [
      {
        label: "Power consumption",
        data: [sumUpEntertainment, sumUpAppliances, sumUpWork, sumUpLighting],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const [chartData, setChartData] = useLocalStorageState("chartData", {
    defaultValue: [
      { chartDataPowerConsumption },
      { price: 0 },
      { overallCost: 0 },
    ],
  });
  return (
    <>
      <Link href="/">Home</Link>
      <Doughnut chartData={chartData[0].chartDataPowerConsumption} />
      <h2>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(chartData[2].overallCost)}
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">Price for 1 kW/h</label>
        <input
          id="price"
          name="price"
          type="number"
          min={1}
          max={100}
          step="0.01"
          title=" 4 digits, the first digit needs to be a number,[0-9.,] "
          required
        />
        <button>send it</button>
      </form>
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
