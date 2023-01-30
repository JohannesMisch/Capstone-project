import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import AddForm from "@/components/AddDeviceForm";
import Card from "@/components/Card";
import { Doughnut } from "react-chartjs-2";

export default function AddNewDevice({ createDevice, devices, handleDelete }) {
  const [toggleForm, setToggleForm] = useState(false);
  const sortedDevices = [...devices];
  const chartData = [...devices];
  const sumUpAppliances = chartData.filter(
    (Appliances) => Appliances.device_category === "Appliances"
  );
  const sumUpEntertainment = chartData.filter(
    (Entertainment) => Entertainment.device_category === "Entertainment"
  );
  const sumUpWork = chartData.filter((Work) => Work.device_category === "Work");
  const sumUpLighting = chartData.filter(
    (Lighting) => Lighting.device_category === "Lighting"
  );

  let sumAllDevices = 0;
  devices.forEach((object) => {
    sumAllDevices =
      sumAllDevices + object.power_consumption * object.average_usage_time;
  });
  console.log(sumAllDevices);

  let sumEntertainment = 0;
  sumUpEntertainment.forEach((object) => {
    sumEntertainment =
      sumEntertainment + object.power_consumption * object.average_usage_time;
  });
  console.log("Enter " + sumEntertainment);

  let sumAppliances = 0;
  sumUpAppliances.forEach((object) => {
    sumAppliances =
      sumAppliances + object.power_consumption * object.average_usage_time;
  });
  console.log("App " + sumAppliances);

  let sumWork = 0;
  sumUpWork.forEach((object) => {
    sumWork = sumWork + object.power_consumption * object.average_usage_time;
  });
  console.log("Work " + sumWork);

  let sumLighting = 0;
  sumUpLighting.forEach((object) => {
    sumLighting =
      sumLighting + object.power_consumption * object.average_usage_time;
  });
  console.log("Lighting " + sumLighting);

  // let chartArray = [
  //   { category: "Entertainment", sumCategory: sumEntertainment },
  //   { category: "Appliances", sumCategory: sumAppliances },
  //   { category: "Work", sumCategory: sumWork },
  //   { category: "Lighting", sumCategory: sumLighting },
  // ];
  const chartarray = {
    label: "Entertainment",
    datasets: [
      {
        label: "??",
        data: sumEntertainment,
        sumAppliances,
        sumWork,
        sumLighting,
        borderWidth: 1,
      },
    ],
  };
  //  const [deviceData, setDeviceData] = useState([

  //  ])

  // const [deviceData, setDeviceData] = useState({
  //   labels: "Entertainment","Appliances","Work","Lighting"
  //   datasets: [
  //     {
  //       label: "??",
  //       data: sumLighting,
  //     },
  //   ],
  // });

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = Object.fromEntries(formData);
  //   createDevice(data);
  //   event.target.reset();
  // }

  return (
    <>
      <Link href="/">Home</Link>
      <Doughnut chartData={chartarray} />
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
