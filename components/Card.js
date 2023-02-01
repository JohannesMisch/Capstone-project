import { useState } from "react";
import styled from "styled-components";
import {
  EntertainmentIcon,
  AppliancesIcon,
  WorkIcon,
  LightingIcon,
} from "@/components/Icons";
import EditCard from "./EditCard";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
};

export default function Card({
  deviceCategory,
  name,
  location,
  model,
  powerConsumption,
  powerConsumptionStandby,
  averageUsageTime,
  id,
  handleDelete,
  createDevice,
  setDevices,
  devices,
}) {
  const [areDetailsDisplayed, setAreDetailsDisplayed] = useState(false);
  const [isEdit, setIsEdit] = useState(true);
  return (
    <>
      {isEdit ? (
        <>
          <section>
            {CATEGORY_MAP[deviceCategory]}
            <p>Device:{name}</p>
            {areDetailsDisplayed && (
              <ul>
                <StyledListItem>Model: {model}</StyledListItem>
                <StyledListItem>
                  Device category: {deviceCategory}
                </StyledListItem>
                <StyledListItem>
                  Power consumption {powerConsumption} W/h
                </StyledListItem>
                <StyledListItem>
                  Power consumption Standby: {powerConsumptionStandby} W/h
                </StyledListItem>
                <StyledListItem>Location: {location}</StyledListItem>
              </ul>
            )}
            <p>Average usage time:{averageUsageTime}h</p>
          </section>
          <button onClick={() => setAreDetailsDisplayed(!areDetailsDisplayed)}>
            Details
          </button>
          <button
            type="button"
            onClick={() => {
              handleDelete(id);
            }}
          >
            Delete
          </button>
          <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
        </>
      ) : (
        <EditCard
          deviceCategory={deviceCategory}
          name={name}
          location={location}
          model={model}
          powerConsumption={powerConsumption}
          powerConsumptionStandby={powerConsumptionStandby}
          averageUsageTime={averageUsageTime}
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

const StyledListItem = styled.li`
  overflow-wrap: break-word;
`;
