import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "../loader";
import { Web5 } from "@web5/api";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecoilState } from "recoil";
import didState from "@/atoms/didData";

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

export default function CreateDid({ name, year }) {
  const router = useRouter();
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);

  const [didData, setDidData] = useRecoilState(didState);

  // receiver did
  const recipientDid =
    "did:ion:EiD9u36diW1d-fQ1qgjvMzLWaEsq2Y4ZBX065LnCDh10Qg:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJkd24tc2lnIiwicHVibGljS2V5SndrIjp7ImNydiI6IkVkMjU1MTkiLCJrdHkiOiJPS1AiLCJ4IjoidXo0cnJ5c2ktYk5HOEd3TkM0MnJVU01qSTBydVU4Y0dVRDlYMkJyVTlLSSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiSnNvbldlYktleTIwMjAifSx7ImlkIjoiZHduLWVuYyIsInB1YmxpY0tleUp3ayI6eyJjcnYiOiJzZWNwMjU2azEiLCJrdHkiOiJFQyIsIngiOiJ2Q1dOOEVTaERSa2xlTnhNZHQ5NHMwaEx0RHZTQlpLQ3lvVWFCYVNlYzFFIiwieSI6IlVqZlc2Y2piU0ZKaWZKc1V5dUQ0ZTVadmdfd0hBdzNKR3l1RkpyMG1jdzAifSwicHVycG9zZXMiOlsia2V5QWdyZWVtZW50Il0sInR5cGUiOiJKc29uV2ViS2V5MjAyMCJ9XSwic2VydmljZXMiOlt7ImlkIjoiZHduIiwic2VydmljZUVuZHBvaW50Ijp7ImVuY3J5cHRpb25LZXlzIjpbIiNkd24tZW5jIl0sIm5vZGVzIjpbImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNiIsImh0dHBzOi8vZHduLnRiZGRldi5vcmcvZHduNSJdLCJzaWduaW5nS2V5cyI6WyIjZHduLXNpZyJdfSwidHlwZSI6IkRlY2VudHJhbGl6ZWRXZWJOb2RlIn1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlBUlUxX1ZtdzhGblZlS3AyeThXbDhVTUY0X2NLdVFIOVNFVkpiTDhQeGloZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpREU1Q3V2NkNuTk9xQW5CTWNJZ0dVanhCMzRkQlp1Q0tJT0JzZzN3b3pGNmciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNaTFBlcGRVZkF6S3lQbEhlQzJrRXpqSlFSd1NTUkwzVDdWT2k2S2J3Yjh3In19";
  const [text, setText] = useState(
    " You can now experience the power of web5!"
  );
  const [loading, setLoading] = useState(false);

  // create did using web5
  async function generateDidAndConfigure() {
    const { web5, did } = await Web5.connect({
      techPreview: {
        dwnEndpoints: ["https://dwn.tbddev.org/dwn0/"],
      },
      sync: "5s",
    });

    setWeb5(web5);
    setMyDid(did);

    const { protocol, status } = await web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });

    console.log("Configure protocol status :", protocol, status);
    return did;
  }

  // construct ding
  const constructDing = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    const ding = {
      sender: myDid,
      note: "Test message 3",
      recipient: recipientDid,
      timestampWritten: `${currentDate} ${currentTime}`,
    };
    return ding;
  };

  // write a record
  async function writeRecord(receiverDid) {
    const ding = constructDing();
    const { record } = await web5.dwn.records.create({
      data: ding,
      message: {
        protocol: "dinger-chat-protocol",
        protocolPath: "ding",
        schema: "ding",
        recipient: receiverDid,
      },
    });
    const { status } = await record.send(receiverDid);
    console.log("Send record status", status);
  }

  // read a record

  const fetchDings = async (web5, did) => {
    const { records, status: recordStatus } = await web5.dwn.records.query({
      message: {
        filter: {
          protocol: "dinger-chat-protocol",
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
    // update recoil state
    setDidData({ did: did, name: name, year: year });
    // router.push("/dashboard");
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
          writeRecord(recipientDid);
        }}
        className="w-32"
      >
        Send Message
      </Button>

      <br />

      <Button
        onClick={() => {
          fetchDings(web5, myDid);
        }}
        className="w-32"
      >
        Show Message
      </Button>
    </div>
  );
}
