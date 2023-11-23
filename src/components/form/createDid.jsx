import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../loader";
import { Web5 } from "@web5/api";
import { Skeleton } from "@/components/ui/skeleton";

const protocolDefinition = {
  protocol: "dinger-chat-protocol",
  published: true,
  types: {
    ding: {
      schema: "ding",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    ding: {
      $actions: [
        { who: "anyone", can: "write" },
        { who: "author", of: "ding", can: "read" },
        { who: "recipient", of: "ding", can: "read" },
      ],
    },
  },
};

export default function CreateDid({ name }) {
  const router = useRouter();
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  // receiver did
  const recipientDid =
    "did:ion:EiAzbnE6S_e2QxvQ4iXWt7F6cMOuMIvjQtcbtypY3u9lRw:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoiMVBoYlY5MmFkc09UaFNWazFaOEUwVk5hMGFTWEtOZS1pb3V6bzhDc1pPTSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiI0M1NzZGo5N0V2NWhBVUZSNm1GeWU2UWt2TzBNelJKVzVrZmpMQm1QZ3NBIiwieSI6Il9nb1JDajdpVldpSXJyRFY0TXdyU1VOd0dtcW15OThLcEtweXpBUnhTa00ifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNCIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduMyJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDNGpfX21FZjFJZ004eENFNEpseEEydjlpMGJsVnE4QncyN1d2TVd0WW1TZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpRHhXVVc5UEM4WFRMODZBYV8xdmE5RUl0YnZoVUlVNmVaaFhzMXVlOU54QkEiLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUI0bjhUcE5Ld1ZKakpRTGpobXYzVkJUU1I5Y1NsZU5JRmY2ZEptazVVNi1nIn19";

  const [text, setText] = useState(
    " You can now experience the power of web5!"
  );
  const [loading, setLoading] = useState(false);

  // create did using web5
  async function generateDidAndConfigure() {
    const { web5, did } = await Web5.connect();
    setWeb5(web5);
    setMyDid(did);
    const { protocolStatus } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });
    console.log("Configure protocol status", protocolStatus);
    return did;
  }

  // construct ding
  const constructDing = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const ding = {
      sender: myDid,
      note: "This is a test message",
      recipient: recipientDid,
      timestampWritten: `${currentDate} ${currentTime}`,
    };
    return ding;
  };

  // write a record
  async function writeRecord() {
    const ding = constructDing();
    const { record } = await web5.dwn.records.write({
      data: ding,
      message: {
        protocol: "dinger-chat-protocol",
        protocolPath: "ding",
        schema: "ding",
        recipient: recipientDid,
      },
    });
    const { status } = await record.send(recipientDid);
    console.log("Send record status", status);
  }

  // read a record

  const fetchDings = async (web5, did) => {
    const { records, status: recordStatus } = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: "https://blackgirlbytes.dev/dinger-chat-protocol",
          protocolPath: "ding",
        },
        dateSort: "createdAscending",
      },
    });

    try {
      const results = await Promise.all(
        records.map(async (record) => record.data.json())
      );

      if (recordStatus.code == 200) {
        const received = results.filter((result) => result?.recipient === did);
        const sent = results.filter((result) => result?.sender === did);
        console.log("Received", received);
        console.log("Sent", sent);
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function handleClick() {
    setLoading(true);
    setText("Please wait while we create your DID");
    const did = await generateDidAndConfigure();
    console.log(did);
    setText("DID created successfully!");
    setLoading(false);
  }

  return (
    <div className=" flex flex-col h-screen justify-center items-center">
      <h1 className="text-3xl font-bold text-emerald-600">Welcome, {name} </h1>
      <div className="flex space-x-3">
        {loading && <Loader />}
        <p className="text-xl text-emerald-500">{text}</p>
      </div>

      <br />
      <Button
        onClick={handleClick}
        className="w-32 bg-emerald-700 hover:bg-emerald-400"
      >
        {loading ? (
          <div className="flex gap-2">
            {" "}
            <Skeleton className="w-[10px] h-[10px] rounded-full bg-emerald-100" />
            <Skeleton className="w-[10px] h-[10px] rounded-full bg-emerald-100" />
            <Skeleton className="w-[10px] h-[10px] rounded-full bg-emerald-100" />
          </div>
        ) : (
          "Enter App"
        )}
      </Button>

      <br />

      <Button
        onClick={() => {
          writeRecord();
        }}
        className="w-32"
      >
        Send Message
      </Button>

      <br />

      <Button
        onClick={() => {
          fetchDings(web5, did);
        }}
        className="w-32"
      >
        Show Message
      </Button>
    </div>
  );
}
