import React from "react";
import { useNavigate } from "react-router-dom";

const SubjectPaneComponent = (props) => {
  const navigate = useNavigate();
  const handleSubjectChange = (event) => {
    console.log(event.target.value);
    setSubject(event.target.value);
  };

  const { subjects, setSubject } = props;
  return (
    <div className="col subject-pane">
      <h3>Trending Subjects</h3>
      <form>
        <input
          className="search-bar"
          type="text"
          placeholder="Search Subjects"
          onChange={handleSubjectChange}
        ></input>
      </form>
      <div className="subject-list col">
        {subjects?.map((subject) => (
          <div onClick={()=>{
            subject = subject.replaceAll(" ", "_");
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
