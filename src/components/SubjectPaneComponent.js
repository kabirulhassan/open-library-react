import React from "react";
import { useNavigate } from "react-router-dom";

const SubjectPaneComponent = ({ subject, subjects, setSubject }) => {
  const navigate = useNavigate();
  const handleSubjectChange = (event) => {
    console.log(event.target.value);
    setSubject(event.target.value);
  };

  return (
    <div className="col subject-pane">
      <h3>Trending Subjects</h3>
      <form>
        <input
          value={subject}
          className="search-bar"
          type="text"
          placeholder="Search Subjects"
          onChange={handleSubjectChange}
        ></input>
      </form>
      <div className="subject-list col">
        {subjects?.map((subject) => (
          <div className="subject-item"
          onClick={()=>{
            subject = subject.replaceAll(" ", "_").toLowerCase();
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
