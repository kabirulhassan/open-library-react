const TitleBarComponent = ({ title, keyword, handleKeywordChange, handleReset}) => {
    const changeTitleFormat = (title) => {
        let newTitle = title?.replaceAll("_", " ").toUpperCase();
        return newTitle;
    }
  return (
    <div className="row">
    {title ?
    <h1>{changeTitleFormat(title)}</h1>
    :
    <form>
      <input
        type="text"
        value={keyword}
        placeholder="Search for a book"
        onChange={handleKeywordChange}
      ></input>
    </form>
    }
    <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default TitleBarComponent;
