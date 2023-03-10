
import SearchBarComponent from './SearchBarComponent';

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
    <SearchBarComponent keyword={keyword} handleKeywordChange={handleKeywordChange} handleReset={handleReset} placeholder="Search Book By Titles or By Author"/>
    }
    {/* <button className="reset-button" onClick={handleReset}><ImCross/></button> */}
    </div>
  );
};

export default TitleBarComponent;
