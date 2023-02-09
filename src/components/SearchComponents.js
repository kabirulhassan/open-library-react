import React from "react";
import BooksTableComponent from "./BooksTableComponent";
import SubjectPaneComponent from "./SubjectPaneComponent";

const SearchComponent = () => {
  const [books, setBooks] = React.useState({});
  const [subject, setSubject] = React.useState("");
  const [keyword, setKeyword] = React.useState("");
  const search = (keyword) => {
    // https://openlibrary.org/search.json?q=the+lord+of+the+rings&limit=10&offset=10
    const url = `https://openlibrary.org/search.json?q=${keyword}&limit=10&offset=10&mode=everything`;
    fetch(url).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setBooks(data);
      });
    });
  };
  React.useEffect(() => {
    console.log("subject changed: " + subject);
  }, [subject]);
  const handleKeywordChange = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };
  return (
    <div className="row">
      <SubjectPaneComponent
        subjects={["the lord of the rings", "harry potter", "the hobbit"]}
        setSubject={setSubject}
      ></SubjectPaneComponent>
      <div className="col">
        <form>
          <input
            type="text"
            placeholder="Search for a book"
            onChange={handleKeywordChange}
          ></input>
          <button type="button" onClick={() => search(keyword)}>
            Search
          </button>
        </form>
        <BooksTableComponent books={books} />
      </div>
    </div>
  );
};

export default SearchComponent;
