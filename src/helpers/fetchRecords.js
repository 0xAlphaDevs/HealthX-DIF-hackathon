export const fetchRecords = async (web5, did) => {
  const { records, status: recordStatus } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: "https://alphadevs.dev/healthX-protocol",
        protocolPath: "healthRecord",
      },
    },
  });

  console.log("Records:", records);

  let receivedRecords = [];
  let sentRecords = [];

  try {
    await Promise.allSettled(
      records.map(async (record) => {
        const result = await record.data.json();
        return result;
      })
    ).then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          if (result.value.recipient === did) {
            receivedRecords.push(result.value);
          } else if (result.value.sender === did) {
            sentRecords.push(result.value);
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }

  console.log("Received Records:", receivedRecords);
  console.log("Sent Records:", sentRecords);

  return { receivedRecords, sentRecords };
};

export const fetchImageRecords = async (web5, did) => {
  const { records, status: recordStatus } = await web5.dwn.records.query({
    message: {
      filter: {
        protocol: "https://alphadevs.dev/healthX-protocol",
        protocolPath: "healthRecordImage",
      },
    },
  });

  console.log("Records:", records);

  let receivedRecords = [];
  let sentRecords = [];

  try {
    await Promise.allSettled(
      records.map(async (record) => {
        const result = await record.data.stream();
        return result;
      })
    ).then((results) => {
      results.forEach((result) => {
        if (result.status === "fulfilled") {
          if (result.value.recipient === did) {
            receivedRecords.push(result.value);
          } else if (result.value.sender === did) {
            sentRecords.push(result.value);
          }
        }
      });
    });
  } catch (error) {
    console.error(error);
  }

  console.log("Received Records:", receivedRecords);
  console.log("Sent Records:", sentRecords);

  return { receivedRecords, sentRecords };
};
