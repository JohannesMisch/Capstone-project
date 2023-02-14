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
  const [isEdit, setIsEdit] = useState(true);

  if (!currentDevice) {
    return (
      <>
        <p>404 page</p>
        <Link href="/">Back to the overview</Link>;
      </>
    );
  }
  console.log(devices);
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
          <label htmlFor="location">LOCATION</label>
          <StyledSelect
            id="location"
            name="location"
            type="text"
            defaultValue={currentDevice.location}
            required
          >
            <option value="">--Please choose an option--</option>
            <option value="Livingroom">Livingroom</option>
            <option value="Bathroom">Bathroom</option>
            <option value="Bedroom">Bedroom</option>
            <option value="Kitchen">Kitchen</option>
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
            <option value="">--Please choose an option--</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Appliances">Appliances</option>
            <option value="Work">Work</option>
            <option value="Lighting">Lighting</option>
          </StyledSelect>
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
          <label htmlFor="time">AVERAGE USAGE TIME</label>
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
              name="average_usage_time_hour_min"
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
          <StyledButton type="Submit">SAVE</StyledButton>
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
  padding: 40px 50px 80px 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledHeader = styled.h2`
  text-align: center;
  font-size: 20px;
`;

const StyledInput = styled.input`
  text-indent: 10px;
  width: 100%;
  height: 25px;
  border-radius: 50px;
  border: solid #737373 1px;
  :focus {
    outline-color: black;
  }
`;

const StyledSelect = styled.select`
  text-indent: 10px;
  width: 100%;
  height: 25px;
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
  border-radius: 50px;
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
  height: 28px;
  width: 48%;
  color: white;
`;

const StyledLink = styled(Link)`
  background-color: #737373;
  border: 1px solid rgba(54, 54, 54, 0.6);
  position: absolute;
  top: 55px;
  right: 15px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 25px;
  width: 25px;
`;

//   return (
//     <>
//       {isEdit ? (
//         <>
//           <section>
//             {CATEGORY_MAP[currentDevice.device_category]}
//             <p>Device:{currentDevice.device}</p>
//             <ul>
//               <StyledListItem>Model: {currentDevice.model}</StyledListItem>
//               <StyledListItem>
//                 Device category: {currentDevice.device_category}
//               </StyledListItem>
//               <StyledListItem>
//                 Power consumption: {currentDevice.power_consumption} W/h
//               </StyledListItem>
//               <StyledListItem>
//                 Power consumption Standby:{" "}
//                 {currentDevice.power_consumption_standby}
//                 W/h
//               </StyledListItem>
//               <StyledListItem>
//                 Location: {currentDevice.location}
//               </StyledListItem>
//             </ul>
//             <p>
//               Average usage time per day:{" "}
//               {currentDevice.average_usage_time_hour}h{" "}
//               {currentDevice.average_usage_time_min}min
//             </p>
//             <button onClick={() => setShowDeleteModal(true)}>Delete</button>
//             <button onClick={() => setIsEdit(!isEdit)}>Edit</button>
//           </section>
//
//           <Link href="/">Back to the overview</Link>;
//         </>
//       ) : (
//         <EditCard
//           deviceCategory={currentDevice.device_category}
//           name={currentDevice.device}
//           location={currentDevice.location}
//           model={currentDevice.model}
//           powerConsumption={currentDevice.power_consumption}
//           powerConsumptionStandby={currentDevice.power_consumption_standby}
//           averageUsageTimeHour={currentDevice.average_usage_time_hour}
//           averageUsageTimeMin={currentDevice.average_usage_time_min}
//           id={id}
//           setIsEdit={setIsEdit}
//           isEdit={isEdit}
//           setDevices={setDevices}
//           devices={devices}
//         />
//       )}
//     </>
//   );
// }
