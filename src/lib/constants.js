export const userHealthRecordsData = [
  {
    id: "",
    healthRecordName: "KFT",
    healthRecordCategory: "pathology",
    date: "1-1-2023",
  },
  {
    id: "",
    healthRecordName: "Electroencephalogram",
    healthRecordCategory: "neurology",
    date: "1-1-2023",
  },
  {
    id: "",
    healthRecordName: "Brain MRI ",
    healthRecordCategory: "neurology",
    date: "1-1-2023",
  },
  {
    id: "",
    healthRecordName: "ECG",
    healthRecordCategory: "cardiology",
    date: "1-1-2023",
  },
  {
    id: "",
    healthRecordName: "CECT",
    healthRecordCategory: "radiology",
    date: "1-1-2023",
  },

  {
    id: "",
    healthRecordName: "X-Ray",
    healthRecordCategory: "radiology",
    date: "1-1-2023",
  },
  {
    id: "",
    healthRecordName: "CBC",
    healthRecordCategory: "pathology",
    date: "1-1-2023",
  },
];

export const organizationHealthRecordsData = [
  {
    id: "m5gr84i9",
    healthRecordName: "KFT",
    healthRecordCategory: "pathology",
    issuedOn: "1-1-2023",
    issuedTo: {
      did: "did:ethr:0x123456789abcdefghifjkfjvhjdscbkj,dnj",
      name: "SomeName",
    },
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "Electroencephalogram",
    healthRecordCategory: "neurology",
    issuedOn: "1-1-2023",
    issuedTo: {
      did: "did:ethr:0x123456789abcdefghifjkfjvhjdscbkj,dnj",
      name: "SomeName",
    },
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "Brain MRI ",
    healthRecordCategory: "neurology",
    issuedOn: "1-1-2023",
    issuedTo: {
      did: "did:ethr:0x123456789abcdefghifjkfjvhjdscbkj,dnj",
      name: "SomeName",
    },
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "ECG",
    healthRecordCategory: "cardiology",
    issuedOn: "1-1-2023",
    issuedTo: {
      did: "did:ethr:0x123456789abcdefghifjkfjvhjdscbkj,dnj",
      name: "SomeName",
    },
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "CECT",
    healthRecordCategory: "radiology",
    issuedOn: "1-1-2023",
    issuedTo: {
      did: "did:ethr:0x123456789abcdefghifjkfjvhjdscbkj,dnj",
      name: "SomeName",
    },
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "X-Ray",
    healthRecordCategory: "radiology",
    issuedOn: "1-1-2023",
    issuedTo: {
      did: "did:ethr:0x123456789abcdefghifjkfjvhjdscbkj,dnj",
      name: "SomeName",
    },
    name: "ABC",
  },
];

//schema for the healthRecord category filter
export const healthRecordCategoryOptions = [
  {
    value: "radiology",
    label: "Radiology",
  },
  {
    value: "pathology",
    label: "Pathology",
  },
  {
    value: "cardiology",
    label: "Cardiology",
  },
  {
    value: "neurology",
    label: "Neurology",
  },
];

// export const protocolDefinition = {
//   protocol: "https://alphadevs.dev/healthX-protocol",
//   published: true,
//   types: {
//     healthRecord: {
//       schema: "https://alphadevs.dev/healthX-protocol/healthRecord",
//       dataFormats: ["application/json"],
//     },
//   },
//   structure: {
//     healthRecord: {
//       $actions: [
//         { who: "anyone", can: "write" },
//         { who: "author", of: "healthRecord", can: "read" },
//         { who: "recipient", of: "healthRecord", can: "read" },
//       ],
//     },
//   },
// };
