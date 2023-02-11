import { useState, useEffect, useRef } from "react";
import BooksTableComponent from "./BooksTableComponent";
import SubjectPaneComponent from "./SubjectPaneComponent";
import axios from "axios";
import PaginationComponent from "./PaginationComponent";
import { useParams, useNavigate} from "react-router-dom";
import TitleBarComponent from "./TitleBarComponent";
import RotatingLinesLoader from "./RotatingLinesLoader";

const SearchComponent = () => {
  const navigate = useNavigate();
  const firstRender = useRef(true);
  const apiString = useRef("");
  const totalResults = useRef(0);
  const [books, setBooks] = useState({});
  const [subject, setSubject] = useState(useParams().subject);
  const [keyword, setKeyword] = useState("");
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // const [searchType, setSearchType] = useState("subject");
  let cancel;

  const fetchBooksOnOffsetChange = () => {
    if (apiString.current) {
      setIsLoading(true);
      const url = `${apiString.current}&offset=${offset}`;
      axios
        .get(url)
        .then((response) => {
          console.log(response.data);
          setBooks(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const fetchBooksOnSubject = (subject) => {
    if (subject === "") return;
    if (subject) {
      setIsLoading(true);
      // subject = subject.replaceAll(" ", "_").toLowerCase();
      subject = subject.toLowerCase();
      const url = `https://openlibrary.org/subjects/${subject}.json?limit=10`;
      apiString.current = url;
      axios
        .get(url, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
        .then((response) => {
          console.log(response.data);
          totalResults.current = response.data?.work_count;
          setBooks(response.data);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log("cancelled");
          } else {
            console.log("error: ", error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const search = (keyword) => {
    if (keyword) {
      setIsLoading(true);
      const url = `https://openlibrary.org/search.json?q=${keyword}&limit=10`;
      apiString.current = url;
      axios
        .get(url, {
          cancelToken: new axios.CancelToken((c) => {
            // An executor function receives a cancel function as a parameter
            cancel = c;
          }),
        })
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleReset = () => {
    navigate("/");
    setBooks({});
    setKeyword("");
    setSubject("");
    setOffset(0);
    totalResults.current = 0;
    apiString.current="";
  };

  useEffect(() => {
    if (subject) {
      fetchBooksOnSubject(subject);
    }
    setTimeout(() => {
      firstRender.current = false;
    }, 1000);
  }, []);
  useEffect(() => {
    setOffset(0);
    if (keyword) {
      console.log("called from keyword change");
      search(keyword);
    }
    return () => {
      cancel && cancel();
    };
  }, [keyword]);

  useEffect(() => {
    if (!firstRender.current && subject) {
      setOffset(0);
      console.log("called from subject change: ", subject);
      fetchBooksOnSubject(subject);
    }
    return () => {
      cancel && cancel();
    }
  }, [subject]);

  useEffect(() => {
    if (apiString.current && !firstRender.current) {
      fetchBooksOnOffsetChange();
    }
  }, [offset]);

  const handleKeywordChange = (event) => {
    console.log(event.target.value);
    setKeyword(event.target.value);
  };
  return (
    <div className="row main-page">
      <SubjectPaneComponent
        subject={subject}
        subjects={[
          "Javascript",
          "Harry Potter",
          "Indian History",
          "Crypto Currency",
          "Criminal Law",
        ]}
        setSubject={setSubject}
      ></SubjectPaneComponent>
      <div className="col books-pane">
        <TitleBarComponent
          title={subject}
          keyword={keyword}
          handleKeywordChange={handleKeywordChange}
          handleReset={handleReset}
        />
        <div className="col books-component">
          {isLoading ? (
            <RotatingLinesLoader />
          ) : (
            <BooksTableComponent books={books} />
          )}
          <PaginationComponent
            totalResults={totalResults}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
