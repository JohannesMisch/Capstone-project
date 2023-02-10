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
      <label htmlFor="device">Device:</label>
      <input
        id="device"
        name="device"
        type="text"
        pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
        title="Max 50 characters"
        required
      />
      <label htmlFor="category">Devices category:</label>
      <select id="category" name="device_category" type="text" required>
        <option value="">--Please choose an option--</option>
        <option value="Appliances">Appliances</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Domestic_appliances">Home appliances</option>
        <option value="Lighting">Lighting</option>
        <option value="Others">Others</option>
        <option value="Work">Work</option>
      </select>
      <label htmlFor="model">Model:</label>
      <input
        id="model"
        name="model"
        type="text"
        pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
        title="Max 50 characters, a-zA-Z0-9-_ äüöÄÜÖß. "
        required
      />
      <label htmlFor="consumption">Power consumption:</label>
      <input
        id="consumption"
        name="power_consumption"
        type="text"
        pattern="^[0-9,.]{1,10}"
        title="Max 10 characters and only Numbers"
        required
      />
      <label htmlFor="standby">Power consumption Standby:</label>
      <input
        id="standby"
        name="power_consumption_standby"
        type="text"
        title="Max 10 characters and only Numbers"
        pattern="^[0-9,.]{1,10}"
        required
      />
      <label htmlFor="time">Average usage time per day:</label>
      <input
        id="time"
        name="average_usage_time"
        type="number"
        title="Hello"
        min={0}
        max={24}
        required
      />
      <label htmlFor="location">Location:</label>
      <select id="location" name="location" type="text" required>
        <option value="">--Please choose an option--</option>
        <option value="Bedroom">Bedroom</option>
        <option value="Bathroom">Bathroom</option>
        <option value="Basement">Basement</option>
        <option value="Childsroom">Childsroom</option>
        <option value="Home Office">Home Office</option>
        <option value="Kitchen">Kitchen</option>
        <option value="Livingroom">Livingroom</option>
      </select>
      <button type="submit">Create</button>
    </StyledForm>
  );
}
const StyledForm = styled.form`
  background-color: white;
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
  gap: 10px;
`;
