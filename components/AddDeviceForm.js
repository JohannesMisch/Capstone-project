import styled from "styled-components";
import { useState } from "react";

export default function AddForm({ createDevice, setToggleForm }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    createDevice({
      ...data,
      power_consumption: Number(data.power_consumption),
      power_consumption_standby: Number(data.power_consumption_standby),
      average_usage_time_hour: Number(data.average_usage_time_hour),
      average_usage_time_min: Number(data.average_usage_time_min),
    });
    setToggleForm(false);
    event.target.reset();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledHeader>CREATE NEW DEVICE</StyledHeader>
      <div>
        <StyledLable htmlFor="device">NAME</StyledLable>
        <Styledinput
          id="device"
          name="device"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
          title="Max 50 characters"
          required
        />
      </div>
      <div>
        <StyledLable htmlFor="model">MODEL</StyledLable>
        <Styledinput
          id="model"
          name="model"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
          title="Max 50 characters, a-zA-Z0-9-_ äüöÄÜÖß. "
          required
        />
      </div>
      <div>
        <StyledLable htmlFor="location">LOCATION</StyledLable>
        <StyledSelect id="location" name="location" type="text" required>
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
        <StyledLable htmlFor="category">DEVICE CATEGORY</StyledLable>
        <StyledSelect id="category" name="device_category" type="text" required>
          <option value="">--PLEASE CHOOSE AN OPTION--</option>
          <option value="Appliances">APPLIANCES</option>
          <option value="Entertainment">ENTERTAINMENT</option>
          <option value="Lighting">LIGHTING</option>
          <option value="Others">OTHERS</option>
          <option value="Work">WORK</option>
        </StyledSelect>
      </div>

      <div>
        <StyledLable htmlFor="consumption">POWER CONSUMPTION</StyledLable>
        <Styledinput
          id="consumption"
          name="power_consumption"
          placeholder="in W/h"
          type="text"
          pattern="^[0-9,.]{1,10}"
          title="Max 10 characters and only Numbers"
          required
        />
      </div>
      <div>
        <StyledLable htmlFor="standby">POWER CONSUMPTION STANDBY </StyledLable>
        <Styledinput
          id="standby"
          name="power_consumption_standby"
          type="text"
          placeholder="in W/h"
          title="Max 10 characters and only Numbers"
          pattern="^[0-9,.]{1,10}"
          required
        />
      </div>
      <div>
        <StyledLable htmlFor="time"> AVERAGE USAGE TIME PER DAY </StyledLable>
        <StyledDiv>
          <StyledTimeInput
            id="time"
            name="average_usage_time_hour"
            type="number"
            placeholder="0"
            min={0}
            max={24}
            defaultValue={0}
            required
          />
          <StyledTime>h</StyledTime>
          <StyledTimeInput
            id="time"
            name="average_usage_time_min"
            type="number"
            placeholder="0"
            min={0}
            max={60}
            defaultValue={0}
            required
          />
          <StyledTime>min</StyledTime>
        </StyledDiv>
      </div>

      <StyledAddDeviceButton type="submit">CREATE</StyledAddDeviceButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  background-color: white;
  font-size: 10px;
  border-radius: 10px;
  z-index: 2;
  position: fixed;
  height: 90%;
  width: 85%;
  top: 40px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  gap: 15px;
  box-shadow: 10px 13px 13px 5px rgba(0, 0, 0, 0.55);
`;

const StyledLable = styled.label`
  display: block;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 20px;
  padding: 5px;
  margin: 0;
`;

const Styledinput = styled.input`
  background-color: transparent;
  border: solid #737373 1px;
  text-indent: 10px;
  height: 33px;
  border-radius: 50px;
  width: 100%;
  :focus {
    outline-color: black;
  }
`;

const StyledSelect = styled.select`
  background-color: transparent;
  border: solid #737373 1px;
  text-indent: 10px;
  font-size: 11px;
  height: 33px;
  border-radius: 50px;
  width: 100%;
  :focus {
    outline-color: black;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  gap: 5px;
  height: 22px;
  padding-bottom: 35px;
`;

const StyledTime = styled.p`
  margin: 0;
  font-size: 15px;
  padding: 4px 10px 4px 0px;
  height: 25px;
`;

const StyledTimeInput = styled.input`
  background-color: transparent;
  border: solid #737373 1px;
  border-radius: 50px;
  height: 33px;
  width: 30%;
  text-align: center;
  :focus {
    outline-color: black;
  }
`;
const StyledAddDeviceButton = styled.button`
  grid-area: IN-USE;
  background-color: #737373;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 35px;
  width: 100%;
  color: white;
`;
