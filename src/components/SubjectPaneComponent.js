import React from "react";

const SubjectPaneComponent = (props) => {
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
          <button key={subject} onClick={() => setSubject(subject)}>
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectPaneComponent;
