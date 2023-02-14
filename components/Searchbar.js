import styled from "styled-components";
import { SearchIcon } from "./Icons";

export default function SearchBar({ handleSearch }) {
  return (
    <StyledSearchContainer>
      <StyledIconContainer>
        <SearchIcon />
      </StyledIconContainer>
      <StyledInput
        onChange={handleSearch}
        aria-label="Searchbar"
        type="text"
        name="search"
        id="search"
        maxLength={60}
      />
    </StyledSearchContainer>
  );
}
const StyledInput = styled.input`
  border: solid #737373 1px;
  text-indent: 25px;
  border-radius: 50px;
  height: 28px;
  width: 85%;
  background-color: transparent;
  :focus {
    outline-color: black;
  }
`;
const StyledSearchContainer = styled.div`
  position: relative;
  text-align: center;
`;
const StyledIconContainer = styled.div`
  position: absolute;
  left: 35px;
  top: 6px;
`;
