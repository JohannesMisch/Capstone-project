import styled from "styled-components";
import {
  EntertainmentIcon,
  AppliancesIcon,
  WorkIcon,
  LightingIcon,
} from "@/components/Icons";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
};

export default function Card({
  deviceCategory,
  name,
  averageUsageTime,
  powerConsumption,
  powerConsumptionStandby,
  price,
}) {
  const devicePowerConsumption =
    ((averageUsageTime * powerConsumption +
      (24 - averageUsageTime) * powerConsumptionStandby) /
      1000) *
    price;
  return (
    <CardContent>
      {CATEGORY_MAP[deviceCategory]}
      <p>{name}</p>
      <p>Average usage time:{averageUsageTime}h</p>
      <p>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(devicePowerConsumption)}
      </p>
    </CardContent>
  );
}
const CardContent = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
