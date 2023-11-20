import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../loader";

export default function CreateDid({ name }) {
  const router = useRouter();

  const [text, setText] = useState(
    " You can now experience the power of web5!"
  );
  const [loading, setLoading] = useState(false);
  function handleClick() {
    // go to homepage
    // router.push("/");
    setLoading(true);
    setText("Please wait while we create your DID");
  }
  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome, {name} </h1>
      <div className="flex space-x-3">
        {loading && <Loader />}
        <p className="text-xl text-gray-500">{text}</p>
      </div>

      <br />
      <Button onClick={handleClick} className="w-32">
        Enter App
      </Button>
    </div>
  );
}
