import {useState, useEffect, useRef} from "react";
import BooksTableComponent from "./BooksTableComponent";
import SubjectPaneComponent from "./SubjectPaneComponent";
import axios from "axios";
import PaginationComponent from "./PaginationComponent";
import { useParams } from "react-router-dom";

const SearchComponent = () => {
  const firstAPICall = useRef(true);
  const [books, setBooks] = useState({});
  const [subject, setSubject] = useState(useParams().subject);
  const [keyword, setKeyword] = useState("");
  const [offset, setOffset] = useState(0);
  // const [searchType, setSearchType] = useState("subject");
  let cancel;
  const apiString = useRef("");
  const totalResults = useRef(0);


  const fetchBooksOnOffsetChange = () => {
      const url = `${apiString.current}&offset=${offset}`;
      axios.get(url).then((response) => {
        console.log(response.data);
        setBooks(response.data);
      });
  };
  
  const fetchBooksOnSubject = (subject) => {
    subject = subject.replaceAll(" ", "_");
    const url = `https://openlibrary.org/subjects/${subject}.json?limit=10`;
    apiString.current = url;
    axios.get(url).then((response) => {
      firstAPICall.current = false;
      console.log(response.data);
      totalResults.current = response.data?.work_count;
      setBooks(response.data);
    });
  };


  const search = (keyword) => {
    if(keyword){
    const url = `https://openlibrary.org/search.json?q=${keyword}&limit=10`;
    apiString.current = url;
    axios.get(url, {
      cancelToken: new axios.CancelToken(c=> {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })})
      .then((response) => {
      console.log(response.data);
      console.log(keyword);
      totalResults.current = response.data?.numFound;
      setBooks(response.data);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("cancelled");
      } else {
        console.log("error: ", error);
      }
    });
    }
  };
  useEffect(() => {
    if(subject){
      fetchBooksOnSubject(subject);
    }
  }, []);
  useEffect(() => {
    setOffset(0);
    if (keyword) {
      console.log("called from keyword change");
      search(keyword);
    }
    return () => {
      cancel && cancel();
    }
  }, [keyword]);
  useEffect(() => {
    if(!firstAPICall.current){
      fetchBooksOnSubject(subject);
    }
  }, [subject]);
  useEffect(() => {
    if(apiString.current && !firstAPICall.current){
      fetchBooksOnOffsetChange();
    }
  }, [offset]);



  const handleKeywordChange = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };
  return (
    <div className="row">
      <SubjectPaneComponent
        subjects={["the lord of the rings", "harry potter", "the hobbit","love"]}
        setSubject={setSubject}
      ></SubjectPaneComponent>
      <div className="col">
        <form>
          <input
            type="text"
            placeholder="Search for a book"
            onChange={handleKeywordChange}
          ></input>
        </form>
        <BooksTableComponent books={books} />
        <PaginationComponent totalResults={totalResults} offset={offset} setOffset={setOffset}/>
      </div>
    </div>
  );
};

export default SearchComponent;
