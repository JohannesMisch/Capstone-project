import styled from "styled-components";
import { SearchIcon } from "./Icons";

export default function SearchBar({ handleSearch }) {
  return (
    <StyledSearchContainer>
      <StyledInput
        onChange={handleSearch}
        aria-label="Searchbar"
        placeholder="Search"
        type="text"
        name="search"
        id="search"
        maxLength={60}
      />
      <StyledSearchIcon />
    </StyledSearchContainer>
  );
}
const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  height: 22px;
  width: 90%;
  background-color: white;
  box-shadow: 8px 13px 13px 2px rgba(0, 0, 0, 0.37);
`;
const StyledSearchContainer = styled.div`
  text-align: center;
  position: relative;
`;
const StyledSearchIcon = styled(SearchIcon)`
  position: absolute;
  right: 50px;
`;
