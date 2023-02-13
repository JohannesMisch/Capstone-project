import styled from "styled-components";
import Card from "@/components/Card";
import Link from "next/link";
import { useState } from "react";
import AddForm from "@/components/AddDeviceForm";
import Doughnut from "@/components/DoughnutChart";
import useLocalStorageState from "use-local-storage-state";
import SearchBar from "@/components/Searchbar";
import {
  MinusIcon,
  PlusIcon,
  OptionIcon,
  SearchIcon,
  XIcon,
} from "@/components/Icons";

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

  const [isEuroClicked, setIsEuroClicked] = useState(true);
  const [isPerDayClicked, setIsPerDayClicked] = useState(true);
  const [isClicked, setIsClicked] = useState("");
  const [isOptionClicked, setIsOptionClicked] = useState(false);

  function handleSearch(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }
  function handlePriceSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setPrice(data.price / 100);
    setIsOptionClicked(false);
    event.target.reset();
  }

  const filteredBySearch = devices.filter(
    (filterDevice) =>
      filterDevice.device.toLowerCase().includes(searchTerm) ||
      filterDevice.device_category.toLowerCase().includes(searchTerm) ||
      filterDevice.model.toLowerCase().includes(searchTerm) ||
      filterDevice.location.toLowerCase().includes(searchTerm)
  );

  const calculateDailyPowerConsumption = (device) =>
    ((device.power_consumption_standby *
      (24 -
        (device.average_usage_time_hour + device.average_usage_time_min / 60)) +
      device.power_consumption *
        (device.average_usage_time_hour + device.average_usage_time_min / 60)) *
      price) /
    1000;

  const sum = (accumulator, currentValue) => accumulator + currentValue;

  const sumUpDevices = devices
    .map(calculateDailyPowerConsumption)
    .reduce(sum, 0);

  function calculateSums(devices, priceInput, days) {
    let priceCalc = 1;
    let daysCalc = 1;
    if (priceInput !== 1) {
      priceCalc = priceInput;
    }
    if (days !== undefined) {
      daysCalc = days;
    }

    return devices.reduce(
      (accumulator, device) => {
        //--------------------------------------------------------------categories
        accumulator.categories[device.device_category] =
          (accumulator.categories[device.device_category] ?? 0) +
          ((device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60)) /
            1000) *
            priceCalc *
            daysCalc;
        //--------------------------------------------------------------categoriesStandby
        accumulator.categoriesStandby[device.device_category] =
          (accumulator.categoriesStandby[device.device_category] ?? 0) +
          ((device.power_consumption_standby *
            (24 -
              (device.average_usage_time_hour +
                device.average_usage_time_min / 60))) /
            1000) *
            priceCalc *
            daysCalc;
        //--------------------------------------------------------------categoriesOverall
        accumulator.categoriesOverall[device.device_category] =
          (accumulator.categoriesOverall[device.device_category] ?? 0) +
          ((device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60) +
            device.power_consumption_standby *
              (24 -
                (device.average_usage_time_hour +
                  device.average_usage_time_min / 60))) /
            1000) *
            priceCalc *
            daysCalc;
        //--------------------------------------------------------------location
        accumulator.location[device.location] =
          (accumulator.location[device.location] ?? 0) +
          ((device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60)) /
            1000) *
            priceCalc *
            daysCalc;
        //---------------------------------------------------------------locationStandby
        accumulator.locationStandby[device.location] =
          (accumulator.locationStandby[device.location] ?? 0) +
          ((device.power_consumption_standby *
            (24 -
              (device.average_usage_time_hour +
                device.average_usage_time_min / 60))) /
            1000) *
            priceCalc *
            daysCalc;
        //--------------------------------------------------------------locationOverall
        accumulator.locationOverall[device.location] =
          (accumulator.locationOverall[device.location] ?? 0) +
          ((device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60) +
            device.power_consumption_standby *
              (24 -
                (device.average_usage_time_hour +
                  device.average_usage_time_min / 60))) /
            1000) *
            priceCalc *
            daysCalc;
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
  const [sums, setSums] = useLocalStorageState("sums", {
    defaultValue: calculateSums(devices, price, 1),
  });
  console.log(sums);
  function euro(devices, price) {
    if (isPerDayClicked) {
      setSums(calculateSums(devices, price, 1));
    } else {
      setSums(calculateSums(devices, price, 365));
    }
  }

  function kWh(devices) {
    if (isPerDayClicked) {
      setSums(calculateSums(devices, 1, 1));
    } else {
      setSums(calculateSums(devices, 1, 365));
    }
  }

  function perDay() {
    if (isEuroClicked) {
      setSums(calculateSums(devices, price, 1));
    } else {
      setSums(calculateSums(devices, 1, 1));
    }
  }

  function perYear() {
    if (isEuroClicked) {
      setSums(calculateSums(devices, price, 365));
    } else {
      setSums(calculateSums(devices, 1, 365));
    }
  }

  function createChartData(object) {
    return {
      labels: Object.keys(object),
      datasets: [
        {
          label: "Cost",
          data: Object.values(object).map((item) => Number(item).toFixed(2)),
          backgroundColor: [
            "hsl(180,30%,50%)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderColor: [
            "hsl(180,30%,50%)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
          ],
          borderWidth: 3,
          cutout: "65%",
          offset: 15,
        },
      ],
    };
  }

  // function handleDisplaySum(SumsPlus) {
  //   return SumsPlus.reduce(
  //     (accumulator, object) => {
  //       accumulator.sum[object];
  //       return accumulator;
  //     },
  //     {
  //       sum: {},
  //     }
  //   );
  // }
  // const displaySum = handleDisplaySum(sums.categoriesOverall);
  console.log(sums.categoriesOverall);
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
    <StyledBackground>
      <StyledOptionButton onClick={() => setIsOptionClicked(!isOptionClicked)}>
        <OptionIcon />
      </StyledOptionButton>
      {isOptionClicked && (
        <StyledPriceForm onSubmit={handlePriceSubmit}>
          <StyledHeader>ADD YOUR PRICE OD ELECTRICITY</StyledHeader>
          <label htmlFor="price">PRICE IN CENT PER kWh</label>
          <Styledinput
            id="price"
            name="price"
            type="number"
            placeholder="Cent"
            min={1}
            max={100}
            step="0.01"
            title=" 4 digits, the first digit needs to be a number,[0-9.,] "
            required
          />
          <StyledCancelButtonPrice
            type="button"
            onClick={() => setIsOptionClicked(false)}
          >
            <XIcon />
          </StyledCancelButtonPrice>
          <StyledSavePriceButton type="Submit">
            SAVE CHANGES
          </StyledSavePriceButton>
        </StyledPriceForm>
      )}
      <ButtonContainer>
        <StyledChartButtonCategory
          onClick={() => {
            setSelectedChart("Category");
            setActiveChartData(true);
          }}
        >
          CATEGORY
        </StyledChartButtonCategory>
        <StyledChartButtonLocation
          onClick={() => {
            setSelectedChart("Location");
            setActiveChartData(false);
          }}
        >
          LOCATION
        </StyledChartButtonLocation>
        {activeChartData ? (
          <>
            <StyledChartButtonInUse
              onClick={() => setSelectedChart("CategoryActive")}
            >
              IN USE
            </StyledChartButtonInUse>
            <StyledChartButtonStandby
              onClick={() => setSelectedChart("CategoryStandby")}
            >
              STANDBY
            </StyledChartButtonStandby>
          </>
        ) : (
          <>
            <StyledChartButtonInUse
              onClick={() => setSelectedChart("LocationActive")}
            >
              IN USE
            </StyledChartButtonInUse>
            <StyledChartButtonStandby
              onClick={() => setSelectedChart("LocationStandby")}
            >
              STANDBY
            </StyledChartButtonStandby>
          </>
        )}
        <StyledChartButtonEuro
          onClick={() => {
            setIsEuroClicked(true), euro(devices, price);
          }}
        >
          EURO
        </StyledChartButtonEuro>
        <StyledChartButtonKWH
          onClick={() => {
            setIsEuroClicked(false), kWh(devices);
          }}
        >
          kWh
        </StyledChartButtonKWH>
        <StyledChartButtonPerDay
          onClick={() => {
            setIsPerDayClicked(true), perDay();
          }}
        >
          PER DAY
        </StyledChartButtonPerDay>
        <StyledChartButtonPerYear
          onClick={() => {
            setIsPerDayClicked(false), perYear();
          }}
        >
          PER YEAR
        </StyledChartButtonPerYear>
      </ButtonContainer>

      <ChartContainer>
        <Doughnut data={createChartDataForSelectedChart()} />
      </ChartContainer>
      <h2>
        Overall cost{" "}
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(sumUpDevices)}
      </h2>
      {toggleForm && <AddForm createDevice={createDevice} />}
      <StyledFormButton
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        {toggleForm ? <MinusIcon /> : <PlusIcon />}
      </StyledFormButton>

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
                  averageUsageTimeHour={device.average_usage_time_hour}
                  averageUsageTimeMin={device.average_usage_time_min}
                  handleDelete={handleDelete}
                  setDevices={setDevices}
                  devices={devices}
                />
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
                averageUsageTimeHour={device.average_usage_time_hour}
                averageUsageTimeMin={device.average_usage_time_min}
                handleDelete={handleDelete}
                handleSubmit={handleSubmit}
                setDevices={setDevices}
                devices={devices}
              />
            </Wrapper>
          ))}
        </StyledList>
      )}
    </StyledBackground>
  );
}
const StyledBackground = styled.div`
  position: relative;
  margin: 0;
  background: linear-gradient(
    to bottom,
    #ffffff 0%,
    #f9fef5 350px,
    #dfefc0 650px,
    #e7f4ce 100%
  );
`;
const StyledOptionButton = styled.button`
  position: fixed;
  z-index: 10;
  right: 10px;
  top: 8px;
  background-color: transparent;
  border: transparent;
`;

const StyledHeader = styled.h2`
  text-decoration: none;
  font-size: 16px;
  text-align: center;
`;

const StyledPriceForm = styled.form`
  background-color: white;
  border-radius: 10px;
  z-index: 2;
  position: fixed;
  height: 35%;
  width: 85%;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  gap: 10px;
  box-shadow: 10px 13px 13px 5px rgba(0, 0, 0, 0.55);
`;

const Styledinput = styled.input`
  border-radius: 50px;
  text-align: 10px;
`;

const StyledCancelButtonPrice = styled.button`
  padding: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #737373;
  border-radius: 50px;
  height: 25px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledSavePriceButton = styled.button`
  background-color: #737373;
  border-radius: 50px;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: white;
`;

const StyledFormButton = styled.button`
  z-index: 3;
  position: fixed;
  bottom: 20px;
  left: 20px;
  background-color: #737373;
  border-radius: 50px;
  height: 40px;
  width: 40px;
`;
const ChartContainer = styled.div`
  margin: auto;
  height: 80%;
  width: 80%;
  max-width: 500px;
`;
const Wrapper = styled.li`
  background-color: white;
  border: solid white 3px;
  border-radius: 20px;
  width: 90%;
  box-shadow: 5px 8px 8px 2px rgba(0, 0, 0, 0.37);
`;

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 10px 50px 10px;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 0.1fr 1fr 1fr 0.1fr;
  grid-template-rows: 2fr 0.5fr 0.2fr 0.5fr 1fr;
  grid-template-areas:
    ". . . . . . ."
    ". Category Location . IN-USE STANDBY ."
    ". . . . . . ."
    ". EURO kWh . PER-DAY PER-YEAR ."
    ". . . . . . .";
`;

const StyledChartButtonCategory = styled.button`
  grid-area: Category;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-right: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
const StyledChartButtonLocation = styled.button`
  grid-area: Location;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
const StyledChartButtonInUse = styled.button`
  grid-area: IN-USE;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-right: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  white-space: nowrap;
  color: #737373;
`;
const StyledChartButtonStandby = styled.button`
  grid-area: STANDBY;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
const StyledChartButtonEuro = styled.button`
  grid-area: EURO;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-right: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
const StyledChartButtonKWH = styled.button`
  grid-area: kWh;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
const StyledChartButtonPerDay = styled.button`
  grid-area: PER-DAY;
  background-color: #e7f4ce;
  border: #737373 1px solid;
  border-right: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  white-space: nowrap;
  color: #737373;
`;
const StyledChartButtonPerYear = styled.button`
  grid-area: PER-YEAR;
  background-color: #e7f4ce;
  white-space: nowrap;
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
