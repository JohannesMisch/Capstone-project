import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";
import { useState } from "react";
import AddForm from "@/components/AddDeviceForm";
import Doughnut from "@/components/DoughnutChart";
import useLocalStorageState from "use-local-storage-state";
import SearchBar from "@/components/Searchbar";

export default function Home({
  devices,
  handleDelete,
  setDevices,
  createDevice,
}) {
  const [isFiltered, setIsFiltered] = useState(true);
  const [isData, setIsData] = useState({ device_category: "" });
  const [price, setPrice] = useLocalStorageState("Price", {
    defaultValue: 1,
  });
  const [activeChartData, setActiveChartData] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

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

  const filteredBySearch = devices.filter(
    (filterDevice) =>
      filterDevice.device.toLowerCase().includes(searchTerm) ||
      filterDevice.device_category.toLowerCase().includes(searchTerm) ||
      filterDevice.model.toLowerCase().includes(searchTerm) ||
      filterDevice.location.includes(searchTerm)
  );

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setPrice(data.price);
    event.target.reset();
  }

  const calculateDailyPowerConsumption = (device) =>
    ((device.power_consumption_standby * (24 - device.average_usage_time) +
      device.power_consumption * device.average_usage_time) *
      price) /
    1000;

  const sum = (accumulator, currentValue) => accumulator + currentValue;

  const sumUpDevices = devices
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

  function calculateSums(devices) {
    return devices.reduce(
      (accumulator, device) => {
        //--------------------------------------------------------------categories
        accumulator.categories[device.device_category] =
          (accumulator.categories[device.device_category] ?? 0) +
          ((device.power_consumption * device.average_usage_time) / 1000) *
            price;
        //--------------------------------------------------------------categoriesStandby
        accumulator.categoriesStandby[device.device_category] =
          (accumulator.categoriesStandby[device.device_category] ?? 0) +
          ((device.power_consumption_standby *
            (24 - device.average_usage_time)) /
            1000) *
            price;
        //--------------------------------------------------------------categoriesOverall
        accumulator.categoriesOverall[device.device_category] =
          (accumulator.categoriesOverall[device.device_category] ?? 0) +
          ((device.power_consumption * device.average_usage_time +
            device.power_consumption_standby *
              (24 - device.average_usage_time)) /
            1000) *
            price;
        //--------------------------------------------------------------location
        accumulator.location[device.location] =
          (accumulator.location[device.location] ?? 0) +
          ((device.power_consumption * device.average_usage_time) / 1000) *
            price;
        //---------------------------------------------------------------locationStandby
        accumulator.locationStandby[device.location] =
          (accumulator.locationStandby[device.location] ?? 0) +
          ((device.power_consumption_standby *
            (24 - device.average_usage_time)) /
            1000) *
            price;
        //--------------------------------------------------------------locationOverall
        accumulator.locationOverall[device.location] =
          (accumulator.locationOverall[device.location] ?? 0) +
          ((device.power_consumption * device.average_usage_time +
            device.power_consumption_standby *
              (24 - device.average_usage_time)) /
            1000) *
            price;
        return accumulator;
      },
      {
        categories: {},
        categoriesStandby: {},
        categoriesOverall: {},
        location: {},
        locationStandby: {},
        locationOverall: {},
      }
    );
  }

  const sums = calculateSums(devices);

  function createChartData(object) {
    return {
      labels: Object.keys(object),
      datasets: [
        {
          label: "Power consumption",
          data: Object.values(object),
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
  }

  function createChartDataForSelectedChart() {
    switch (selectedChart) {
      case "Category":
        return createChartData(sums.categoriesOverall);
      case "Location":
        return createChartData(sums.locationOverall);
      case "CategoryActive":
        return createChartData(sums.categories);
      case "CategoryStandby":
        return createChartData(sums.categoriesStandby);
      case "LocationActive":
        return createChartData(sums.location);
      case "LocationStandby":
        return createChartData(sums.locationStandby);
      default:
        return createChartData(sums.categories);
    }
  }

  return (
    <>
      <ButtonContainer>
        <StyledChartButton
          onClick={() => {
            setSelectedChart("Category");
            setActiveChartData(true);
          }}
        >
          Category
        </StyledChartButton>
        <StyledChartButton
          onClick={() => {
            setSelectedChart("Location");
            setActiveChartData(false);
          }}
        >
          Location
        </StyledChartButton>
        {activeChartData ? (
          <>
            <StyledChartButton
              onClick={() => setSelectedChart("CategoryActive")}
            >
              CategoryActive
            </StyledChartButton>
            <StyledChartButton
              onClick={() => setSelectedChart("CategoryStandby")}
            >
              CategoryStandby
            </StyledChartButton>
          </>
        ) : (
          <>
            <StyledChartButton
              onClick={() => setSelectedChart("LocationActive")}
            >
              LocationActive
            </StyledChartButton>
            <StyledChartButton
              onClick={() => setSelectedChart("LocationStandby")}
            >
              LocationStandby
            </StyledChartButton>
          </>
        )}
      </ButtonContainer>
      <ChartContainer>
        <Doughnut chartData={createChartDataForSelectedChart()} />
      </ChartContainer>
      <h2>
        Overall cost{" "}
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(sumUpDevices)}
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
      <StyledFormButton
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        {toggleForm ? "-" : "+"}
      </StyledFormButton>
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
        <>
          <SearchBar devices={devices} handleSearch={handleSearch} />
          <StyledList>
            {filteredBySearch.map((device) => (
              <Wrapper key={device.id}>
                <Card
                  price={price}
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
                <StyledLink href={`/device/${device.id}`}>Details</StyledLink>
              </Wrapper>
            ))}
          </StyledList>
        </>
      ) : (
        <StyledList>
          {filteredDevices.map((device) => (
            <Wrapper key={device.id}>
              <Card
                price={price}
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
              <StyledLink href={`/device/${device.id}/device`}>
                Details
              </StyledLink>
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

const StyledFormButton = styled.button`
  z-index: 3;
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: green;
  border-radius: 50px;
  height: 40px;
  width: 40px;
`;
const ChartContainer = styled.div`
  height: 50%;
  max-width: 500px;
`;
const Wrapper = styled.li`
  border: solid black 3px;
  border-radius: 20px;
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px 50px 10px;
`;
const StyledLink = styled(Link)`
  padding: 10px;
  border: solid black 3px;
  border-radius: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const StyledChartButton = styled.button``;
