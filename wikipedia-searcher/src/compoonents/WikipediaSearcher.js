import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import axios from 'axios';

const WikipediaSearcher = observer(() => {
  const [querySearch, setQuerySearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      let noSpaceText = querySearch.replace(/\s/g, '%20');
      if (!noSpaceText) {
        setSearchResults([]);
        return;
      }

      const response = await axios.get(
        `https://en.wikipedia.org/w/api.php`,
        {
          params: {
            action: 'opensearch',
            datatype: 'json',
            limit: 15,
            search: noSpaceText,
            origin: '*'
          }
        }
      );

      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenPage = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          value={querySearch}
          onChange={(event) => setQuerySearch(event.target.value)}
          type="text"
          placeholder="Search here"
          required
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults[1].map((title, index) => (
            <li
              key={index}
              className="search-result"
              onClick={() => handleOpenPage(searchResults[3][index])}
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default WikipediaSearcher;
