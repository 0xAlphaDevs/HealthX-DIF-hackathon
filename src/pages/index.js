import { Web5 } from "@web5/api";
import { useState, useEffect } from "react";
import { NoChatSelected } from "@/components/NoChatSelected";
import { Sidebar } from "@/components/Sidebar";
import { Chat } from "@/components/Chat";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [web5, setWeb5] = useState(null);
  const [myDid, setMyDid] = useState(null);
  const [recordId, setRecordId] = useState();

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setMyDid(did);
    };
    initWeb5();
  }, []);

  async function createJsonRecord() {
    const { record } = await web5.dwn.records.create({
      data: {
        content: "Hello Web5",
        description: "Keep Building!",
      },
      message: {
        dataFormat: "application/json",
        published: true,
      },
    });

    console.log("Record created:", record);
    setRecordId(record._recordId);
    console.log(record._recordId);
  }

  async function queryRecords() {
    const { records } = await web5.dwn.records.query({
      from: did,
      message: {
        filter: {
          schema: "https://schema.org/Playlist",
          dataFormat: "application/json",
        },
      },
    });
  }

  async function readRecord() {
    // Reads the indicated record from the user's DWNs
    let { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: recordId,
        },
      },
    });

    // assuming the record has a text payload
    const text = await record.data.json();

    console.log("Read Record:", text);
  }

  async function updateRecord() {
    // Get the record
    const { record } = await web5.dwn.records.read({
      message: {
        filter: {
          recordId: recordId,
        },
      },
    });

    // Update the record
    const { status } = await record.update({
      data: {
        content: "Hello Web6",
        description: "Keep Building!",
      },
    });
    console.log("Updated record:", status);
  }

  async function deleteRecord() {
    //Query records with plain text data format
    const response = await web5.dwn.records.query({
      message: {
        filter: {
          recordId: recordId,
        },
      },
    });

    // Grab the first indexed record
    const record = response.records[0];

    // Delete the record
    const deleteResult = await record.delete();
    console.log("Delete:", deleteResult);
  }
  return (
    <div className="app-container">
      <Button variant="outline" onClick={createJsonRecord}>
        Create Record
      </Button>
      <Button variant="outline" onClick={readRecord}>
        Read Record
      </Button>
      <Button variant="outline" onClick={updateRecord}>
        Update Record
      </Button>
      <Button variant="outline" onClick={deleteRecord}>
        Delete Record
      </Button>
    </div>
  );
}
