import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import SelectType from "@/components/form/selectType";
import EnterDetails from "@/components/form/EnterDetails";
import CreateDid from "@/components/form/createDid";

// Three Components
// 1. Select Type
// 2. Enter Details
// 3. DID Creation

export default function Form() {
  const [type, setType] = useState(""); // "individual" or "organization"
  const [details, setDetails] = useState({}); // user or organization details
  const [did, setDid] = useState(""); // DID of user or organization
  const [loading, setLoading] = useState(false); // loading state
  const [step, setStep] = useState(0); // step state
  console.log("Step: ", step);
  console.log("Type: ", type);
  console.log("Details: ", details);

  return (
    <div className="app-container">
      {step === 0 && <SelectType setType={setType} setStep={setStep} />}
      {step === 1 && (
        <EnterDetails type={type} setDetails={setDetails} setStep={setStep} />
      )}
      {step === 2 && <CreateDid />}
    </div>
  );
}
