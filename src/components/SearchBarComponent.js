import { ImCross } from "react-icons/im";
import { FaSearch} from 'react-icons/fa';

const SearchBarComponent = ({ keyword, handleKeywordChange, handleReset }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={keyword}
        placeholder="Search for a book"
        className="search-bar"
        onChange={handleKeywordChange}
      ></input>
      <div className="search-bar-icon">
        {keyword ? (
          <button className="reset-button" onClick={handleReset}>
            <ImCross />
          </button>
        ): <FaSearch/>}
      </div>
    </div>
  );
};

export default SearchBarComponent;
