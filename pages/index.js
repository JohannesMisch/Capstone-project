import styled from "styled-components";
import { EntertainmentIcon } from "@/components/Icons";
import { AppliancesIcon } from "@/components/Icons";
import { WorkIcon } from "@/components/Icons";
import { useState } from "react";
import { useEffect } from "react";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
};

export default function Home({ devices }) {
  const [showDetails, setShowDetails] = useState(devices);

  function handleButtonClick(id) {
    setShowDetails(
      showDetails.map((item) => {
        if (item.id === id) {
          return { ...item, isActive: !item.isActive };
        } else {
          return item;
        }
      })
    );
  }
  useEffect(() => {
    function handleDevices() {
      const temp = showDetails.map((item) => {
        return { ...item, isActive: true };
      });
      setShowDetails(temp);
    }
    handleDevices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledList>
      {showDetails.map((device) => (
        <StyledCard key={device.id}>
          <section>
            {CATEGORY_MAP[device.device_category]}
            <p>Device:{device.device}</p>
            {device.isActive ? (
              ""
            ) : (
              <>
                <p>Location: {device.location}</p>
                <p>Device category: {device.device_category}</p>
                <p>Model: {device.model}</p>
                <p>Power consumption {device.power_consumption} W/h</p>
                <p>
                  Power consumption Standby: {device.power_consumption_standby}{" "}
                  W/h
                </p>
              </>
            )}
            <p>Average usage time:{device.average_usage_time}h</p>
          </section>
          <button
            onClick={() => {
              handleButtonClick(device.id);
            }}
          >
            Details
          </button>
        </StyledCard>
      ))}
    </StyledList>
  );
}

const StyledCard = styled.li`
  border: solid black 3px;
`;
const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px 10px;
`;
