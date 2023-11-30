// This is a image viewer page
import React from "react";

const ViewHealthRecord = () => {
  return (
    <div className="p-8 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Health Record</h1>
      <img className="mx-16" src="/report.png" alt="Picture of the author" />
    </div>
  );
};

export default ViewHealthRecord;
