import styled from "styled-components";
import { useState } from "react";

export default function AddForm({ createDevice }) {
  const [toggleForm, setToggleForm] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    createDevice(data);
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
        <StyledLable htmlFor="category">DEVICE CATEGORY</StyledLable>
        <StyledSelect id="category" name="device_category" type="text" required>
          <option value="">--Please choose an option--</option>
          <option value="Appliances">Appliances</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Domestic_appliances">Home appliances</option>
          <option value="Lighting">Lighting</option>
          <option value="Others">Others</option>
          <option value="Work">Work</option>
        </StyledSelect>
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
        <StyledLable htmlFor="consumption">POWER CONSUMPTION</StyledLable>
        <Styledinput
          id="consumption"
          name="power_consumption"
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
      <div>
        <StyledLable htmlFor="location">LOCATION</StyledLable>
        <StyledSelect id="location" name="location" type="text" required>
          <option value="">--Please choose an option--</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Basement">Basement</option>
          <option value="Childsroom">Childsroom</option>
          <option value="Home Office">Home Office</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Livingroom">Livingroom</option>
        </StyledSelect>
      </div>
      <StyledAddDeviceButton type="submit">CREATE</StyledAddDeviceButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  background-color: white;
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
`;

const Styledinput = styled.input`
  text-indent: 10px;
  height: 25px;
  border-radius: 50px;
  width: 100%;
  :focus {
    outline-color: black;
  }
`;

const StyledSelect = styled.select`
  text-indent: 10px;
  height: 25px;
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
`;

const StyledTime = styled.p`
  margin: 0;
  padding: 4px 10px 4px 0px;
  height: 25px;
`;

const StyledTimeInput = styled.input`
  border-radius: 50px;
  height: 20px;
  width: 30%;
  text-align: center;
  :focus {
    outline-color: black;
  }
`;
const StyledAddDeviceButton = styled.button`
  grid-area: IN-USE;
  background-color: #737373;
  position: relative;
  outline: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 25px;
  width: 100%;
  opacity: 1;
  text-decoration: none;
  color: white;
`;
