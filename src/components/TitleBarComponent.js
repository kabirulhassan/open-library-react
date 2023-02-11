const TitleBarComponent = ({ title, handleKeywordChange }) => {
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
        placeholder="Search for a book"
        onChange={handleKeywordChange}
      ></input>
    </form>
    }
    <button>Reset</button>
    </div>
  );
};

export default TitleBarComponent;
