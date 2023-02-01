import { useRouter } from "next/router";
import styled from "styled-components";
import EditCard from "@/components/EditCard";
import Link from "next/link";
import { useState } from "react";
import {
  EntertainmentIcon,
  AppliancesIcon,
  WorkIcon,
  LightingIcon,
} from "@/components/Icons";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
};
export default function DetailsCard({ setDevices, devices, handleDelete }) {
  const router = useRouter();
  const { id } = router.query;
  const currentDevice = devices.find((device) => device.id === id);
  const [isEdit, setIsEdit] = useState(true);
  if (!currentDevice) {
    return (
      <>
        <p>404 page</p>
        <Link href="/">Back to the overview</Link>;
      </>
    );
  }

  // function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   const data = Object.fromEntries(formData);
  //   setDevices(
  //     devices.map((device) => {
  //       if (device.id === id)
  //         return {
  //           ...device,
  //           device: data.device,
  //           device_category: data.device_category,
  //           model: data.model,
  //           power_consumption: data.power_consumption,
  //           power_consumption_standby: data.power_consumption_standby,
  //           average_usage_time: data.average_usage_time,
  //           location: data.location,
  //         };
  //       return device;
  //     })
  //   );

  //   setIsEdit(!isEdit);
  //   event.target.reset();
  // }

  return (
    <>
      {isEdit ? (
        <>
          <section>
            {CATEGORY_MAP[currentDevice.device_category]}
            <p>Device:{currentDevice.device}</p>
            <ul>
              <StyledListItem>Model: {currentDevice.model}</StyledListItem>
              <StyledListItem>
                Device category: {currentDevice.device_category}
              </StyledListItem>
              <StyledListItem>
                Power consumption {currentDevice.power_consumption} W/h
              </StyledListItem>
              <StyledListItem>
                Power consumption Standby:{" "}
                {currentDevice.power_consumption_standby}
                W/h
              </StyledListItem>
              <StyledListItem>
                Location: {currentDevice.location}
              </StyledListItem>
            </ul>
            <p>Average usage time:{currentDevice.average_usage_time}h</p>
          </section>
          <button
            type="button"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </button>
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          <Link href="/">Back to the overview</Link>;
        </>
      ) : (
        <EditCard
          deviceCategory={currentDevice.device_category}
          name={currentDevice.device}
          location={currentDevice.location}
          model={currentDevice.model}
          powerConsumption={currentDevice.power_consumption}
          powerConsumptionStandby={currentDevice.power_consumption_standby}
          averageUsageTime={currentDevice.average_usage_time}
          id={id}
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          setDevices={setDevices}
          devices={devices}
        />
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
const StyledListItem = styled.li`
  overflow-wrap: break-word;
`;
