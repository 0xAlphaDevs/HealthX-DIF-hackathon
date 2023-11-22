import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../loader";
import { Web5 } from "@web5/api";
import { Skeleton } from "@/components/ui/skeleton";

export default function CreateDid({ name }) {
  const router = useRouter();
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  const [text, setText] = useState(
    " You can now experience the power of web5!"
  );
  const [loading, setLoading] = useState(false);

  // create did using web5
  async function generateDid() {
    const { web5, did } = await Web5.connect();
    setWeb5(web5);
    setMyDid(did);
    return did;
  }

  async function getDidDocument(did) {
    const didDocument = await web5.did.resolve(did);
    return didDocument;
  }

  async function handleClick() {
    setLoading(true);
    setText("Please wait while we create your DID");
    const did = await generateDid();
    console.log(did);
    const didDocument = await getDidDocument(did);
    console.log(didDocument);
  }

  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome, {name} </h1>
      <div className="flex space-x-3">
        {loading && <Loader />}
        <p className="text-xl text-gray-500">{text}</p>
      </div>

      <br />
      {loading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <Button onClick={handleClick} className="w-32">
          Enter App
        </Button>
      )}
    </div>
  );
}
