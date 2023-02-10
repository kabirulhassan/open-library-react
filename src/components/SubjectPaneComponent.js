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
    <div className="col">
      <h1>Trending Subjects</h1>
      <form>
        <input
          type="text"
          placeholder="Search Subjects"
          onChange={handleSubjectChange}
        ></input>
      </form>
      <div className="subject-list col">
        {subjects?.map((subject) => (
          <div onClick={()=>{
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
