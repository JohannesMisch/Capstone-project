import { useRouter } from "next/router";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";
import {
  EntertainmentIcon,
  AppliancesIcon,
  WorkIcon,
  LightingIcon,
  XIcon,
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

  if (!currentDevice) {
    return (
      <>
        <p>404 page</p>
        <Link href="/">Back to the overview</Link>;
      </>
    );
  }
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    setDevices(
      devices.map((device) => {
        if (device.id === id)
          return {
            ...device,
            device: data.device,
            model: data.model,
            location: data.location,
            device_category: data.device_category,
            power_consumption: Number(data.power_consumption),
            power_consumption_standby: Number(data.power_consumption_standby),
            average_usage_time_hour: Number(data.average_usage_time_hour),
            average_usage_time_min: Number(data.average_usage_time_min),
          };
        return device;
      })
    );
    router.back();
    event.target.reset();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledHeader>EDIT DEVICE</StyledHeader>
        <div>
          <label htmlFor="device">NAME</label>
          <StyledInput
            id="device"
            name="device"
            type="text"
            pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
            title="Max 50 characters"
            defaultValue={currentDevice.device}
            required
          />
        </div>
        <div>
          <label htmlFor="model">MODEL</label>
          <StyledInput
            id="model"
            name="model"
            type="text"
            pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
            title="Max 50 characters, a-zA-Z0-9-_ äüöÄÜÖß. "
            defaultValue={currentDevice.model}
            required
          />
        </div>
        <div>
          <label htmlFor="location">LOCATION</label>
          <StyledSelect
            id="location"
            name="location"
            type="text"
            defaultValue={currentDevice.location}
            required
          >
            <option value="">--PLEASE CHOOSE AN OPTION--</option>
            <option value="Bedroom">BEDROOM</option>
            <option value="Bathroom">BATHROOM</option>
            <option value="Basement">BASEMENT</option>
            <option value="Childsroom">CHILDSROOM</option>
            <option value="Home Office">HOME OFFICE</option>
            <option value="Kitchen">KITCHEN</option>
            <option value="Livingroom">LIVINGROOM</option>
          </StyledSelect>
        </div>
        <div>
          <label htmlFor="category">DEVICE CATEGORY</label>
          <StyledSelect
            id="category"
            name="device_category"
            type="text"
            defaultValue={currentDevice.device_category}
            required
          >
            <option value="">--PLEASE CHOOSE AN OPTION--</option>
            <option value="Appliances">APPLIANCES</option>
            <option value="Entertainment">ENTERTAINMENT</option>
            <option value="Lighting">LIGHTING</option>
            <option value="Others">OTHERS</option>
            <option value="Work">OFFICE AIDS </option>
          </StyledSelect>
        </div>

        <div>
          <label htmlFor="consumption">POWER CONSUMPTION</label>
          <StyledInput
            id="consumption"
            name="power_consumption"
            type="text"
            pattern="^[0-9,.]{1,10}"
            title="Max 10 characters and only Numbers"
            defaultValue={currentDevice.power_consumption}
            required
          />
        </div>
        <div>
          <label htmlFor="standby">POWER CONSUMPTION STANDBY</label>
          <StyledInput
            id="standby"
            name="power_consumption_standby"
            type="text"
            title="Max 10 characters and only Numbers"
            pattern="^[0-9,.]{1,10}"
            defaultValue={currentDevice.power_consumption_standby}
            required
          />
        </div>
        <div>
          <label htmlFor="time">AVERAGE USAGE TIME PER DAY</label>
          <StyledDiv>
            <StyledTimeInput
              id="time"
              name="average_usage_time_hour"
              type="number"
              title="Hello there"
              min={0}
              max={24}
              defaultValue={currentDevice.average_usage_time_hour}
              required
            />
            <StyledTime>h</StyledTime>
            <StyledTimeInput
              id="time"
              name="average_usage_time_min"
              type="number"
              title="Hello there"
              min={0}
              max={59}
              defaultValue={currentDevice.average_usage_time_min}
              required
            />
            <StyledTime>min</StyledTime>
          </StyledDiv>
        </div>
        <StyledButtonContainer>
          <StyledButton type="button" onClick={() => setShowDeleteModal(true)}>
            DELETE
          </StyledButton>
          <StyledLink href="/">
            <XIcon />
          </StyledLink>
          <StyledButton>SAVE</StyledButton>
        </StyledButtonContainer>
      </StyledForm>
      {showDeleteModal && (
        <Modal
          id={id}
          currentDevice={currentDevice}
          handleDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}
const StyledForm = styled.form`
  background-color: #eef6df;
  font-size: 11px;
  padding: 55px 50px 85px 50px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 20px;
`;

const StyledInput = styled.input`
  text-indent: 10px;
  background-color: #ffffffcc;
  width: 100%;
  height: 33px;
  border-radius: 50px;
  border: solid #737373 1px;
  :focus {
    outline-color: black;
  }
`;

const StyledSelect = styled.select`
  background-color: #ffffffcc;
  text-indent: 10px;
  width: 100%;
  height: 33px;
  border-radius: 50px;
  border: solid #737373 1px;
  :focus {
    outline-color: black;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  height: 22px;
`;

const StyledTime = styled.p`
  height: 25px;
  margin: 0;
  padding: 4px 10px 4px 0px;
  height: 25px;
`;

const StyledTimeInput = styled.input`
  background-color: #ffffffcc;
  border-radius: 50px;
  height: 33px;
  width: 30%;
  text-align: center;
  border: solid #737373 1px;
  :focus {
    outline-color: black;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledButton = styled.button`
  margin-top: 40px;
  background-color: #737373;
  border-radius: 50px;
  border: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 35px;
  width: 48%;
  color: white;
`;

const StyledLink = styled(Link)`
  background-color: #737373;
  position: absolute;
  top: 65px;
  right: 15px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 25px;
  width: 25px;
`;
