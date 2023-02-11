import styled from "styled-components";
import { SearchIcon } from "./Icons";

export default function SearchBar({ handleSearch }) {
  return (
    <StyledSearchContainer>
      <StyledSearchIcon />
      <StyledInput
        onChange={handleSearch}
        aria-label="Searchbar"
        placeholder="Search"
        type="text"
        name="search"
        id="search"
        maxLength={60}
      />
    </StyledSearchContainer>
  );
}
const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 50px;
  height: 28px;
  width: 85%;

  background-color: transparent;
`;
const StyledSearchContainer = styled.div`
  text-align: center;
  position: relative;
`;
const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 50px;
`;
