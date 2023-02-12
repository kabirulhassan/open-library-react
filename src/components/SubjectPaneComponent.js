import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBarComponent from "./SearchBarComponent";

const SubjectPaneComponent = ({ subject, subjects, setSubject, handleReset }) => {
  const navigate = useNavigate();
  const handleSubjectChange = (event) => {
    // console.log(event.target.value);
    setSubject(event.target.value);
  };

  return (
    <div className="col subject-pane">
      <h3>Trending Subjects</h3>
      <SearchBarComponent keyword={subject} handleKeywordChange={handleSubjectChange} handleReset={handleReset}/>
      <div className="subject-list col">
        {subjects?.map((subject,key) => (
          <div 
          key = {key}
          className="subject-item"
          onClick={()=>{
            setSubject(subject);
            navigate(`/${subject}`);     
          }}>
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectPaneComponent;