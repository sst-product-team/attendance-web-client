import React from "react";

const ClassDetails = ({ classDetails }) => {
  const { name } = classDetails;
  return (
    <div>
      <h2 className="text-3xl font-medium">Class: {name}</h2>
    </div>
  );
};

export default ClassDetails;
