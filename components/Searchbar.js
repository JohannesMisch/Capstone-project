import styled from "styled-components";

export default function SearchBar({ handleSearch }) {
  return (
    <StyledSearchContainer>
      <StyledInput
        onChange={handleSearch}
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
  border-radius: 5px;
  height: 22px;
  width: 90%;
  background-color: white;
`;
const StyledSearchContainer = styled.div`
  display: flex;
`;
