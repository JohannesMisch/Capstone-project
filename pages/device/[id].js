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
import Modal from "@/components/Modal";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
};
export default function DetailsCard({ setDevices, devices, handleDelete }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                Power consumption: {currentDevice.power_consumption} W/h
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
            <p>
              Average usage time per day:{" "}
              {currentDevice.average_usage_time_hour}h{" "}
              {currentDevice.average_usage_time_min}min
            </p>
            <button onClick={() => setShowDeleteModal(true)}>Delete</button>
            <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
          </section>
          {showDeleteModal && (
            <Modal
              id={id}
              currentDevice={currentDevice}
              handleDelete={handleDelete}
              onClose={() => setShowDeleteModal(false)}
            />
          )}
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
          averageUsageTimeHour={currentDevice.average_usage_time_hour}
          averageUsageTimeMin={currentDevice.average_usage_time_min}
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
