import styled from "styled-components";

export default function EditCard({
  deviceCategory,
  name,
  location,
  model,
  powerConsumption,
  powerConsumptionStandby,
  averageUsageTimeHour,
  averageUsageTimeMin,
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
        <StyledHeader>Edit Device</StyledHeader>
        <label htmlFor="device">Device:</label>
        <StyledInput
          id="device"
          name="device"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
          title="Max 50 characters"
          defaultValue={name}
          required
        />
        <label htmlFor="location">Location:</label>
        <StyledSelect
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
        </StyledSelect>
        <label htmlFor="category">Devices category:</label>
        <StyledSelect
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
        </StyledSelect>
        <label htmlFor="model">Model:</label>
        <StyledInput
          id="model"
          name="model"
          type="text"
          pattern="^[a-zA-Z0-9äüöÄÜÖ][a-zA-Z0-9-_ äüöÄÜÖß.]{1,50}"
          title="Max 50 characters, a-zA-Z0-9-_ äüöÄÜÖß. "
          defaultValue={model}
          required
        />
        <label htmlFor="consumption">Power consumption:</label>
        <StyledInput
          id="consumption"
          name="power_consumption"
          type="text"
          pattern="^[0-9,.]{1,10}"
          title="Max 10 characters and only Numbers"
          defaultValue={powerConsumption}
          required
        />
        <label htmlFor="standby">Power consumption Standby:</label>
        <StyledInput
          id="standby"
          name="power_consumption_standby"
          type="text"
          title="Max 10 characters and only Numbers"
          pattern="^[0-9,.]{1,10}"
          defaultValue={powerConsumptionStandby}
          required
        />
        <label htmlFor="time">Average usage time:</label>
        <StyledDiv>
          <StyledTimeInput
            id="time"
            name="average_usage_time_hour"
            type="number"
            title="Hello there"
            min={0}
            max={24}
            defaultValue={averageUsageTimeHour}
            required
          />
          <StyledTime>h</StyledTime>
          <StyledTimeInput
            id="time"
            name="average_usage_time_hour_min"
            type="number"
            title="Hello there"
            min={0}
            max={24}
            defaultValue={averageUsageTimeMin}
            required
          />
          <StyledTime>min</StyledTime>
        </StyledDiv>
        <StyledButtom type="button" onClick={() => setIsEdit(!isEdit)}>
          Cancel
        </StyledButtom>

        <StyledButtom>Save</StyledButtom>
      </StyledForm>
    </>
  );
}
const StyledForm = styled.form`
  background-color: #eef6df;
  padding: 50px 50px 80px 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 20px;
`;

const StyledInput = styled.input`
  border-radius: 50px;
`;

const StyledSelect = styled.select`
  border-radius: 50px;
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
  width: 30%;
  text-align: center;
`;
const StyledButtom = styled.button`
  grid-area: Location;
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
