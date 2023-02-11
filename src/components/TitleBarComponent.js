import {FaUndo, FaSearch} from 'react-icons/fa';

const TitleBarComponent = ({ title, keyword, handleKeywordChange, handleReset}) => {
    const changeTitleFormat = (title) => {
        let newTitle = title?.replaceAll("_", " ").toUpperCase();
        return newTitle;
    }
  return (
    <div className="row title-bar">
    {title ?
    <h1>{changeTitleFormat(title)}</h1>
    :
    <div className="search-bar-container">
      <input
        type="text"
        value={keyword}
        placeholder="Search for a book"
        className="search-bar"
        onChange={handleKeywordChange}
      ></input>
      <div className="search-bar-icon"><FaSearch/></div>
    </div>
    }
    <button onClick={handleReset}><FaUndo/></button>
    </div>
  );
};

export default TitleBarComponent;
