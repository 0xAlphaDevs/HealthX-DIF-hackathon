import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

export default function CreateDid({ name }) {
  const router = useRouter();
  function handleClick() {
    // go to homepage
    router.push("/");
  }
  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome, {name} </h1>
      <p className="text-xl text-gray-500">
        You can now experience the power of web5
      </p>
      <br />
      <Button onClick={handleClick} className="w-32">
        Enter App
      </Button>
    </div>
  );
}
