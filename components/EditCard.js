import styled from "styled-components";
import dynamic from "next/dynamic";

export default function EditCard({
  deviceCategory,
  name,
  location,
  model,
  powerConsumption,
  powerConsumptionStandby,
  averageUsageTime,
  setIsEdit,
  isEdit,
  setDevices,
  id,
  devices,
}) {
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
            device_category: data.device_category,
            model: data.model,
            power_consumption: data.power_consumption,
            power_consumption_standby: data.power_consumption_standby,
            average_usage_time: data.average_usage_time,
            location: data.location,
          };
        return device;
      })
    );

    setIsEdit(!isEdit);
    event.target.reset();
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="device">Device:</label>
        <input
          id="device"
          name="device"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
          title="Max 50 characters"
          defaultValue={name}
          required
        />
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          name="location"
          type="text"
          defaultValue={location}
          required
        >
          <option value="">--Please choose an option--</option>
          <option value="Livingroom">Livingroom</option>
          <option value="Bathroom">Bathroom</option>
          <option value="Bedroom">Bedroom</option>
          <option value="Kitchen">Kitchen</option>
        </select>
        <label htmlFor="category">Devices category:</label>
        <select
          id="category"
          name="device_category"
          type="text"
          defaultValue={deviceCategory}
          required
        >
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
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
          title="Max 50 characters, a-zA-Z0-9-_ äüöÄÜÖß. "
          defaultValue={model}
          required
        />
        <label htmlFor="consumption">Power consumption:</label>
        <input
          id="consumption"
          name="power_consumption"
          type="text"
          pattern="^[0-9,.]{1,10}"
          title="Max 10 characters and only Numbers"
          defaultValue={powerConsumption}
          required
        />
        <label htmlFor="standby">Power consumption Standby:</label>
        <input
          id="standby"
          name="power_consumption_standby"
          type="text"
          title="Max 10 characters and only Numbers"
          pattern="^[0-9,.]{1,10}"
          defaultValue={powerConsumptionStandby}
          required
        />
        <label htmlFor="time">Average usage time:</label>
        <input
          id="time"
          name="average_usage_time"
          type="number"
          title="Hello there"
          min={0}
          max={24}
          defaultValue={averageUsageTime}
          required
        />
        <button type="button" onClick={() => setIsEdit(!isEdit)}>
          Cancel
        </button>

        <button>Save</button>
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
