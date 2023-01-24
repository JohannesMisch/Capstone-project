import styled from "styled-components";

export default function AddNewDevice({ createDevice }) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    createDevice(data);
  }
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="device">Device:</label>
        <input
          id="device"
          name="device"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖ.]{1,30}"
        />
        <label htmlFor="category">Devices category:</label>
        <select id="category" name="device_category" type="text">
          <option value="">--Please choose an option--</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Appliances">Appliances</option>
          <option value="Work">Work</option>
          <option value="Lighting">Lighting</option>
        </select>
        <label htmlFor="model">Model:</label>
        <input
          id="model"
          name="model"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖ.]{1,40}"
        />
        <label htmlFor="consumption">Power consumption:</label>
        <input id="consumption" name="power_consumption" type="number" />
        <label htmlFor="standby">Power consumption Standby:</label>
        <input id="standby" name="power_consumption_standby" type="number" />
        <label htmlFor="time">Average usage time:</label>
        <input id="time" name="average_usage_time" type="number" max={24} />
        <label htmlFor="location">Location:</label>
        <select id="location" name="location" type="text">
          <option value="">--Please choose an option--</option>
          <option value="Livingroom">Livingroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
        </select>
        <button className="form__button" type="submit">
          Create
        </button>
      </StyledForm>
    </>
  );
}
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px 50px;
  gap: 10px;
`;
