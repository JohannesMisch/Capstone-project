import styled from "styled-components";
import Link from "next/link";
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
  averageUsageTimeHour,
  averageUsageTimeMin,
  powerConsumption,
  powerConsumptionStandby,
  price,
  id,
}) {
  const devicePowerConsumption =
    (((averageUsageTimeHour + averageUsageTimeMin / 60) * powerConsumption +
      (24 - (averageUsageTimeHour + averageUsageTimeMin / 60)) *
        powerConsumptionStandby) /
      1000) *
    price;
  console.log(averageUsageTimeHour);
  console.log(averageUsageTimeMin);
  return (
    <CardContent>
      <StyledName>{name}</StyledName>
      <StyledSVG>{CATEGORY_MAP[deviceCategory]}</StyledSVG>
      <StyledTime>
        Average usage time per day:{averageUsageTimeHour}h {averageUsageTimeMin}
        min
      </StyledTime>
      <StyledCost>
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(devicePowerConsumption)}
      </StyledCost>
      <StyledLink href={`/device/${id}`}>Details</StyledLink>
    </CardContent>
  );
}
const CardContent = styled.section`
  padding: 5%;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
  grid-template-rows: repeat(3, 1fr);
`;
const StyledName = styled.p`
  margin: 0;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 1;
  grid-row-end: 2;
  text-align: center;
`;
const StyledSVG = styled.p`
  margin: 0;
  grid-column-start: 1;
  grid-column-end: 1;
  grid-row-start: 2;
  grid-row-end: 4;
  justify-self: center;
`;
const StyledTime = styled.p`
  margin: 0;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row-end: 1;
  justify-self: center;
`;
const StyledCost = styled.p`
  margin: 0;
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 2;
  justify-self: center;
`;
const StyledLink = styled(Link)`
  grid-column-start: 2;
  grid-column-end: 2;
  grid-row-start: 3;
  grid-row-end: 3;
  background-color: #737373;
  border: 1px solid rgba(54, 54, 54, 0.6);
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
