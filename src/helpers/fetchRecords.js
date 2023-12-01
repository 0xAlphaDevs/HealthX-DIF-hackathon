export const fetchRecords = async (web5, did) => {
  const { records, status: recordStatus } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: "https://alphadevs.dev/healthX-protocol",
        protocolPath: "healthRecord",
      },
      dateSort: "createdAscending",
    },
  });

  let receivedRecords = [];
  let sentRecords = [];

  try {
    const results = await Promise.all(
      records.map(async (record) => record.data.json())
    );

    if (recordStatus.code == 200) {
      receivedRecords = results.filter((result) => result?.recipient === did);
      sentRecords = results.filter((result) => result?.sender === did);
      console.log("Received Health Records", receivedRecords);
      console.log("Sent Health Records", sentRecords);
    }
  } catch (error) {
    console.error(error);
  }

  return { receivedRecords, sentRecords };
};
