import styled from "styled-components";
import Link from "next/link";
import {
  EntertainmentIcon,
  AppliancesIcon,
  WorkIcon,
  LightingIcon,
  OthersIcon,
} from "@/components/Icons";

const CATEGORY_MAP = {
  Entertainment: <EntertainmentIcon />,
  Appliances: <AppliancesIcon />,
  Work: <WorkIcon />,
  Lighting: <LightingIcon />,
  Others: <OthersIcon />,
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

  return (
    <CardContent>
      <StyledName>{name}</StyledName>
      <StyledSVG>{CATEGORY_MAP[deviceCategory]}</StyledSVG>
      <StyledTime>
        TIME PER DAY {averageUsageTimeHour} h {averageUsageTimeMin}
        min
      </StyledTime>
      <StyledCost>
        COST PER DAY{" "}
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(devicePowerConsumption)}
      </StyledCost>
      <StyledCategory>{deviceCategory.toUpperCase()}</StyledCategory>
      <StyledLink href={`/device/${id}`}>DETAILS</StyledLink>
    </CardContent>
  );
}

const CardContent = styled.section`
  font-size: 13px;
  padding: 5%;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
  grid-template-rows: repeat(12, 1fr);
`;
const StyledName = styled.p`
  font-size: 15px;
  margin: 0;
  grid-column: 1;
  grid-row: 1/5;
  text-align: left;
  padding-left: 5px;
`;
const StyledSVG = styled.p`
  margin: 0;
  grid-column: 1;
  grid-row: 6/13;
  justify-self: left;
`;
const StyledTime = styled.p`
  margin: 0;
  grid-column: 2;
  grid-row: 1/3;
  justify-self: left;
`;
const StyledCost = styled.p`
  margin: 0;
  grid-column: 2;
  grid-row: 4/6;
  justify-self: left;
`;
const StyledCategory = styled.p`
  margin: 0;
  grid-column: 2;
  grid-row: 7/9;
  justify-self: left;
`;
const StyledLink = styled(Link)`
  grid-column: 2;
  grid-row: 10/13;
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
  text-decoration: none;
  color: white;
`;
