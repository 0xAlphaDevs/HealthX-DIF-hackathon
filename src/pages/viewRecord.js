// This is a image viewer page
import React from "react";
import { useRecoilState } from "recoil";
import { base64ImageState } from "../atoms/data";

const ViewHealthRecord = () => {
  const [base64Image, setBase64Image] = useRecoilState(base64ImageState);

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Health Record</h1>
      <img className="mx-16" src={base64Image} alt="Picture of the author" />
    </div>
  );
};

export default ViewHealthRecord;
