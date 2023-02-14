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
  const [price, setPrice] = useLocalStorageState("Price", {
    defaultValue: 1,
  });
  const [activeChartData, setActiveChartData] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);
  const [toggleForm, setToggleForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEuroClicked, setIsEuroClicked] = useLocalStorageState(
    "isEuroClicked",
    {
      defaultValue: true,
    }
  );
  const [isPerDayClicked, setIsPerDayClicked] = useLocalStorageState(
    "isPerDayClicked",
    {
      defaultValue: true,
    }
  );
  const [isClicked, setIsClicked] = useLocalStorageState("isClicked", {
    defaultValue: true,
  });
  const [isInUse, setIsInUse] = useLocalStorageState("isInUse", {
    defaultValue: "",
  });
  const [isStandby, setIsStandby] = useLocalStorageState("isStandby", {
    defaultValue: "",
  });
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
            "#003f5c",
            "#ff7c43",
            "#2f4b7c",
            "#f95d6a",
            "#665191",
            "#d45087",
            "#a05195",
          ],
          borderWidth: 3,
          cutout: "65%",
        },
      ],
    };
  }

  function handleDisplaySum(object) {
    return Object.values(object).reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
  }

  function createChartDataForSelectedChart() {
    switch (selectedChart) {
      case "Category":
        return [
          createChartData(sums.categoriesOverall),
          handleDisplaySum(sums.categoriesOverall),
        ];
      case "Location":
        return [
          createChartData(sums.locationOverall),
          handleDisplaySum(sums.locationOverall),
        ];
      case "CategoryActive":
        return [
          createChartData(sums.categories),
          handleDisplaySum(sums.categories),
        ];
      case "CategoryStandby":
        return [
          createChartData(sums.categoriesStandby),
          handleDisplaySum(sums.categoriesStandby),
        ];
      case "LocationActive":
        return [
          createChartData(sums.location),
          handleDisplaySum(sums.location),
        ];
      case "LocationStandby":
        return [
          createChartData(sums.locationStandby),
          handleDisplaySum(sums.locationStandby),
        ];
      default:
        return [
          createChartData(sums.categories),
          handleDisplaySum(sums.categories),
        ];
    }
  }
  const [chartData, displaySum] = createChartDataForSelectedChart();
  return (
    <StyledBackground>
      <StyledOptionButton onClick={() => setIsOptionClicked(!isOptionClicked)}>
        <OptionIcon />
      </StyledOptionButton>
      {isOptionClicked && (
        <StyledPriceForm onSubmit={handlePriceSubmit}>
          <StyledHeader>ADD YOUR PRICE OF ELECTRICITY</StyledHeader>
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
          clicked={isClicked}
          onClick={() => {
            setSelectedChart("Category");
            setActiveChartData(true);
            setIsClicked(true);
            setIsStandby(false);
            setIsInUse(false);
          }}
        >
          CATEGORY
        </StyledChartButtonCategory>
        <StyledChartButtonLocation
          clicked={isClicked}
          onClick={() => {
            setSelectedChart("Location");
            setActiveChartData(false);
            setIsClicked(false);
            setIsStandby(false);
            setIsInUse(false);
          }}
        >
          LOCATION
        </StyledChartButtonLocation>
        {activeChartData ? (
          <>
            <StyledChartButtonInUse
              clicked={isInUse}
              onClick={() => {
                setSelectedChart("CategoryActive"),
                  setIsStandby(true),
                  setIsInUse(false);
              }}
            >
              IN USE
            </StyledChartButtonInUse>
            <StyledChartButtonStandby
              clicked={isStandby}
              onClick={() => {
                setSelectedChart("CategoryStandby"),
                  setIsStandby(false),
                  setIsInUse(true);
              }}
            >
              STANDBY
            </StyledChartButtonStandby>
          </>
        ) : (
          <>
            <StyledChartButtonInUse
              clicked={isInUse}
              onClick={() => {
                setSelectedChart("LocationActive"),
                  setIsStandby(true),
                  setIsInUse(false);
              }}
            >
              IN USE
            </StyledChartButtonInUse>
            <StyledChartButtonStandby
              clicked={isStandby}
              onClick={() => {
                setSelectedChart("LocationStandby"),
                  setIsStandby(false),
                  setIsInUse(true);
              }}
            >
              STANDBY
            </StyledChartButtonStandby>
          </>
        )}
        <StyledChartButtonEuro
          clicked={isEuroClicked}
          onClick={() => {
            setIsEuroClicked(true), euro(devices, price);
          }}
        >
          EURO
        </StyledChartButtonEuro>
        <StyledChartButtonKWH
          clicked={isEuroClicked}
          onClick={() => {
            setIsEuroClicked(false), kWh(devices);
          }}
        >
          kWh
        </StyledChartButtonKWH>
        <StyledChartButtonPerDay
          clicked={isPerDayClicked}
          onClick={() => {
            setIsPerDayClicked(true), perDay();
          }}
        >
          PER DAY
        </StyledChartButtonPerDay>
        <StyledChartButtonPerYear
          clicked={isPerDayClicked}
          onClick={() => {
            setIsPerDayClicked(false), perYear();
          }}
        >
          PER YEAR
        </StyledChartButtonPerYear>
      </ButtonContainer>

      <ChartContainer>
        <Doughnut data={chartData} />
      </ChartContainer>
      <h2>
        Overall cost{" "}
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(displaySum)}
      </h2>
      {toggleForm && <AddForm createDevice={createDevice} />}
      <StyledFormButton
        onClick={() => {
          setToggleForm(!toggleForm);
        }}
      >
        {toggleForm ? <MinusIcon /> : <PlusIcon />}
      </StyledFormButton>
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
  font-style: none;
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
  border: transparent;
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
  background-color: ${(props) => (props.clicked ? "#dfefc0" : "#eef6df")};
  border: #737373 1px solid;
  border-right: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;

const StyledChartButtonLocation = styled.button`
  grid-area: Location;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;

const StyledChartButtonInUse = styled.button`
  grid-area: IN-USE;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
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
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;

const StyledChartButtonEuro = styled.button`
  grid-area: EURO;
  background-color: ${(props) => (props.clicked ? "#dfefc0" : "#eef6df")};
  border: #737373 1px solid;
  border-right: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;

const StyledChartButtonKWH = styled.button`
  grid-area: kWh;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;

const StyledChartButtonPerDay = styled.button`
  grid-area: PER-DAY;
  background-color: ${(props) => (props.clicked ? "#dfefc0" : "#eef6df")};
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
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  white-space: nowrap;
  border: #737373 1px solid;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
`;
