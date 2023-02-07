export default function SearchBar({ handleSearch }) {
  return (
    <section>
      <label htmlFor="search">Search</label>
      <input
        onChange={handleSearch}
        type="text"
        name="search"
        id="search"
        maxLength={60}
      />
    </section>
  );
}
