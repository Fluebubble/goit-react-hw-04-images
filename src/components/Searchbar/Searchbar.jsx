import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const Searchbar = ({ onSubmit, onChange, query }) => {
  // const [query, setQuery] = useState('Cocker');

  // const handleChange = e => {
  //   setQuery(e.currentTarget.value);
  // };

  return (
    <div className="Searchbar">
      <form className="SearchForm" onSubmit={e => onSubmit(e, query)}>
        <button className="SearchForm-button" type="submit">
          <AiOutlineSearch size={20} />
        </button>
        <input
          className="SearchForm-input"
          type="text"
          placeholder="Search images and photos"
          name="searchQuery"
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;
