// This is a image viewer page
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { base64ImageState } from "../atoms/data";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { testBase64Image } from "@/helpers/mock";

const ViewHealthRecord = () => {
  const base64Image = useRecoilValue(base64ImageState);
  const [image, setImage] = useState("");

  useEffect(() => {
    // get base64 image from atom state

    console.log("Base 64 image :", base64Image);
    setImage(base64Image);
  }, []);

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Health Record</h1>
      <img className="mx-16" src={image} alt="Health record image" />
    </div>
  );
};

export default ViewHealthRecord;
