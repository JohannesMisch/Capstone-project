import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";
import { useState } from "react";
import AddForm from "@/components/AddDeviceForm";
import Doughnut from "@/components/DoughnutChart";
import useLocalStorageState from "use-local-storage-state";

export default function Home({
  devices,
  handleDelete,
  setDevices,
  createDevice,
}) {
  const [isFiltered, setIsFiltered] = useState(true);
  const [isData, setIsData] = useState({ device_category: "" });

  function handleSubmitFilter(event) {
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

  const [toggleForm, setToggleForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setPrice(data.price);
    event.target.reset();
  }

  function filterByCategory(category) {
    return (device) => device.device_category === category;
  }

  const calculateDailyPowerConsumption = (device) =>
    device.power_consumption * device.average_usage_time;

  const sum = (accumulator, currentValue) => accumulator + currentValue;

  const usedCategories = ["Entertainment", "Appliances", "Work", "Lighting"];

  const allTheData = usedCategories.map((category) =>
    testmap(devices, category)
  );
  function testmap(devices, category) {
    return devices
      .filter(filterByCategory(category))
      .map(calculateDailyPowerConsumption)
      .reduce(sum, 0);
  }
  console.log(allTheData);

  function calculateSums(devices) {
    return devices.reduce(
      (accumulator, device) => {
        accumulator.categories[device.device_category] =
          accumulator.categories[device.device_category] ??
          0 + device.power_consumption * device.average_usage_time;
        accumulator.location[device.location] =
          accumulator.location[device.location] ??
          0 + device.power_consumption * device.average_usage_time;
        return accumulator;
      },
      { categories: {}, location: {} }
    );
  }
  const sums = calculateSums(devices);
  console.log(calculateSums(devices));
  // [["Entertainment", 2838],["Appliances", 389] ...]

  // {Entertainment: 2838,  Appliances:389, Work: 2893 , Lighting:383}

  const chartDataPowerConsumption = {
    labels: Object.keys(sums.categories),
    datasets: [
      {
        label: "Power consumption",
        data: Object.values(sums.categories),
        backgroundColor: [
          "hsl(180,30%,50%)",
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
  const [price, setPrice] = useLocalStorageState("Price", {
    defaultValue: 0,
  });

  return (
    <>
      <ChartContainer>
        <Doughnut chartData={chartDataPowerConsumption} />
      </ChartContainer>
      <h2>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(999)}
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="price">Price per 1 kW/h</label>
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
      {toggleForm && <AddForm createDevice={createDevice} />}
      <StyledButton
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        {toggleForm ? "-" : "+"}
      </StyledButton>
      <form onSubmit={handleSubmitFilter}>
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
                handleSubmit={handleSubmit}
                setDevices={setDevices}
                devices={devices}
              />
              <Link href={`/device/${device.id}/device`}>Details</Link>
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
                handleSubmit={handleSubmit}
                setDevices={setDevices}
                devices={devices}
              />
              <Link href={`/device/${device.id}/device`}>Details</Link>
            </Wrapper>
          ))}
        </StyledList>
      )}
    </>
  );
}

const StyledCard = styled.li`
  border: solid black 3px;
`;

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
  padding: 20px 10px 50px 10px;
`;
const ChartContainer = styled.div`
  height: 50%;
  max-width: 500px;
`;
