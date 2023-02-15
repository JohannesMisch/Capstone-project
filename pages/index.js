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
    defaultValue: 0.45,
  });
  const [activeChartData, setActiveChartData] = useState(true);
  // const [selectedChart, setSelectedChart] = useState(null);
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
    defaultValue: false,
  });
  const [isStandby, setIsStandby] = useLocalStorageState("isStandby", {
    defaultValue: false,
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

  function calculateSums(devices) {
    return devices.reduce(
      (accumulator, device) => {
        //--------------------------------------------------------------categories
        accumulator.categories[device.device_category] =
          (accumulator.categories[device.device_category] ?? 0) +
          (device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60)) /
            1000;
        //--------------------------------------------------------------categoriesStandby
        accumulator.categoriesStandby[device.device_category] =
          (accumulator.categoriesStandby[device.device_category] ?? 0) +
          (device.power_consumption_standby *
            (24 -
              (device.average_usage_time_hour +
                device.average_usage_time_min / 60))) /
            1000;

        //--------------------------------------------------------------categoriesOverall
        accumulator.categoriesOverall[device.device_category] =
          (accumulator.categoriesOverall[device.device_category] ?? 0) +
          (device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60) +
            device.power_consumption_standby *
              (24 -
                (device.average_usage_time_hour +
                  device.average_usage_time_min / 60))) /
            1000;
        //--------------------------------------------------------------location
        accumulator.location[device.location] =
          (accumulator.location[device.location] ?? 0) +
          (device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60)) /
            1000;
        //---------------------------------------------------------------locationStandby
        accumulator.locationStandby[device.location] =
          (accumulator.locationStandby[device.location] ?? 0) +
          (device.power_consumption_standby *
            (24 -
              (device.average_usage_time_hour +
                device.average_usage_time_min / 60))) /
            1000;
        //--------------------------------------------------------------locationOverall
        accumulator.locationOverall[device.location] =
          (accumulator.locationOverall[device.location] ?? 0) +
          (device.power_consumption *
            (device.average_usage_time_hour +
              device.average_usage_time_min / 60) +
            device.power_consumption_standby *
              (24 -
                (device.average_usage_time_hour +
                  device.average_usage_time_min / 60))) /
            1000;

        // console.log({
        //   lo: Object.values(accumulator.locationOverall).reduce(sum, 0),
        //   co: Object.values(accumulator.categoriesOverall).reduce(sum, 0),
        //   same:
        //     Object.values(accumulator.locationOverall).reduce(sum, 0) ===
        //     Object.values(accumulator.categoriesOverall).reduce(sum, 0),
        //   device,
        // });

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
            "#008000",
            // "#2f4b7c",
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

  function prepareDisplayData(object, unit = 1, days = 1) {
    const copy = structuredClone(object);
    for (const key of Object.keys(copy)) {
      copy[key] = copy[key] * unit * days;
    }

    return [createChartData(copy), handleDisplaySum(copy)];
  }

  function generateStateString() {
    const categoryOrLocation = isClicked ? "Category" : "Location";
    function poweredState(isInUse, isStandby) {
      if (isInUse && isStandby) {
        throw new Error("illegal state");
      }

      if (!isInUse && !isStandby) {
        return "";
      } else if (isInUse) {
        return "Standby";
      } else {
        return "Active";
      }
    }
    const powered = poweredState(isInUse, isStandby);
    const unit = isEuroClicked ? "Euro" : "kWh";
    const timeRange = isPerDayClicked ? "Day" : "Year";
    return `${categoryOrLocation}-${powered}-${unit}-${timeRange}`;
  }

  function createDisplayData() {
    const sums = calculateSums(devices);

    const stateString = generateStateString();
    switch (stateString) {
      //--------default Calc with kWh and 1 day ------
      case "Category--kWh-Day":
        return prepareDisplayData(sums.categoriesOverall, 1, 1);
      case "Location--kWh-Day":
        return prepareDisplayData(sums.locationOverall, 1, 1);
      case "Category-Active-kWh-Day":
        return prepareDisplayData(sums.categories, 1, 1);
      case "Category-Standby-kWh-Day":
        return prepareDisplayData(sums.categoriesStandby, 1, 1);
      case "Location-Active-kWh-Day":
        return prepareDisplayData(sums.location, 1, 1);
      case "Location-Standby-kWh-Day":
        return prepareDisplayData(sums.locationStandby, 1, 1);
      //----------Calc with Euro and 1 Day-----
      case "Category--Euro-Day":
        return prepareDisplayData(sums.categoriesOverall, price, 1);
      case "Location--Euro-Day":
        return prepareDisplayData(sums.locationOverall, price, 1);
      case "Category-Active-Euro-Day":
        return prepareDisplayData(sums.categories, price, 1);
      case "Category-Standby-Euro-Day":
        return prepareDisplayData(sums.categoriesStandby, price, 1);
      case "Location-Active-Euro-Day":
        return prepareDisplayData(sums.location, price, 1);
      case "Location-Standby-Euro-Day":
        return prepareDisplayData(sums.locationStandby, price, 1);
      //------Calc with Euro and 365 Days(YEAR)----
      case "Category--Euro-Year":
        return prepareDisplayData(sums.categoriesOverall, price, 365);
      case "Location--Euro-Year":
        return prepareDisplayData(sums.locationOverall, price, 365);
      case "Category-Active-Euro-Year":
        return prepareDisplayData(sums.categories, price, 365);
      case "Category-Standby-Euro-Year":
        return prepareDisplayData(sums.categoriesStandby, price, 365);
      case "Location-Active-Euro-Year":
        return prepareDisplayData(sums.location, price, 365);
      case "Location-Standby-Euro-Year":
        return prepareDisplayData(sums.locationStandby, price, 365);
      //--------Calc with kWh and 365 Days(YEAR)-----
      case "Category--kWh-Year":
        return prepareDisplayData(sums.categoriesOverall, 1, 365);
      case "Location--kWh-Year":
        return prepareDisplayData(sums.locationOverall, 1, 365);
      case "Category-Active-kWh-Year":
        return prepareDisplayData(sums.categories, 1, 365);
      case "Category-Standby-kWh-Year":
        return prepareDisplayData(sums.categoriesStandby, 1, 365);
      case "Location-Active-kWh-Year":
        return prepareDisplayData(sums.location, 1, 365);
      case "Location-Standby-kWh-Year":
        return prepareDisplayData(sums.locationStandby, 1, 365);
      default:
        return prepareDisplayData(sums.categories, 1, 1);
    }
  }

  const [chartData, displaySum] = createDisplayData();
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
          <StyledSavePriceButton type="Submit">SAVE</StyledSavePriceButton>
        </StyledPriceForm>
      )}
      <ButtonContainer>
        <StyledChartButtonCategory
          clicked={isClicked}
          onClick={() => {
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
                setIsStandby(true);
                setIsInUse(false);
              }}
            >
              IN USE
            </StyledChartButtonInUse>
            <StyledChartButtonStandby
              clicked={isStandby}
              onClick={() => {
                setIsStandby(false);
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
                setIsStandby(true);
                setIsInUse(false);
              }}
            >
              IN USE
            </StyledChartButtonInUse>
            <StyledChartButtonStandby
              clicked={isStandby}
              onClick={() => {
                setIsStandby(false);
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
            setIsEuroClicked(true);
          }}
        >
          EURO
        </StyledChartButtonEuro>
        <StyledChartButtonKWH
          clicked={isEuroClicked}
          onClick={() => {
            setIsEuroClicked(false);
          }}
        >
          kWh
        </StyledChartButtonKWH>
        <StyledChartButtonPerDay
          clicked={isPerDayClicked}
          onClick={() => {
            setIsPerDayClicked(true);
          }}
        >
          PER DAY
        </StyledChartButtonPerDay>
        <StyledChartButtonPerYear
          clicked={isPerDayClicked}
          onClick={() => {
            setIsPerDayClicked(false);
          }}
        >
          PER YEAR
        </StyledChartButtonPerYear>
      </ButtonContainer>

      <ChartContainer>
        <Doughnut
          data={chartData}
          displaySum={
            isEuroClicked
              ? new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                }).format(displaySum)
              : displaySum.toFixed(2) + " kWh"
          }
        />
      </ChartContainer>
      {toggleForm && (
        <AddForm createDevice={createDevice} setToggleForm={setToggleForm} />
      )}
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
  top: 16px;
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
  height: 30%;
  width: 85%;
  top: 55px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  padding: 5px 40px;
  gap: 10px;
  box-shadow: 10px 13px 13px 5px rgba(0, 0, 0, 0.55);
`;

const Styledinput = styled.input`
  :focus {
    outline-color: black;
  }
  text-indent: 15px;
  height: 25px;
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
  height: 28px;
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
  border: transparent;
  height: 40px;
  width: 40px;
`;
const ChartContainer = styled.div`
  margin: auto;
  height: 80%;
  width: 80%;
  max-width: 500px;
  padding-bottom: 10px;
`;
const Wrapper = styled.li`
  background-color: #ffffffcc;
  border: transparent;
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
  grid-template-rows: 2.8fr 0.5fr 0.2fr 0.5fr 1fr;
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
  border-right: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonLocation = styled.button`
  grid-area: Location;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border-left: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonInUse = styled.button`
  grid-area: IN-USE;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border-right: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  white-space: nowrap;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonStandby = styled.button`
  grid-area: STANDBY;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border-left: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonEuro = styled.button`
  grid-area: EURO;
  background-color: ${(props) => (props.clicked ? "#dfefc0" : "#eef6df")};
  border-right: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonKWH = styled.button`
  grid-area: kWh;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  border-left: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonPerDay = styled.button`
  grid-area: PER-DAY;
  background-color: ${(props) => (props.clicked ? "#dfefc0" : "#eef6df")};
  border-right: none;
  border: transparent;
  cursor: pointer;
  height: 25px;
  width: 100%;
  white-space: nowrap;
  color: #737373;
  font-size: 11px;
`;

const StyledChartButtonPerYear = styled.button`
  grid-area: PER-YEAR;
  background-color: ${(props) => (props.clicked ? "#eef6df" : "#dfefc0")};
  white-space: nowrap;
  border: transparent;
  border-left: none;
  cursor: pointer;
  height: 25px;
  width: 100%;
  color: #737373;
  font-size: 11px;
`;
