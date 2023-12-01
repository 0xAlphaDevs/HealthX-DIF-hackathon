import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyIcon } from "@radix-ui/react-icons";

function handleCopyToClipboard() {
  navigator.clipboard.writeText(didData.did);
}

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
    issuedTo: (
      <div className="flex mt-2">
        <p>did:ethr:0x123456789abcd</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="cursor-pointer ml-2 mr-4 h-8 text-md"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "Electroencephalogram",
    healthRecordCategory: "neurology",
    issuedOn: "1-1-2023",
    issuedTo: (
      <div className="flex mt-2">
        <p>did:ethr:0x123456789abcd</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="cursor-pointer ml-2 mr-4 h-8 text-md"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "Brain MRI ",
    healthRecordCategory: "neurology",
    issuedOn: "1-1-2023",
    issuedTo: (
      <div className="flex mt-2">
        <p>did:ethr:0x123456789abcd</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="cursor-pointer ml-2 mr-4 h-8 text-md"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "ECG",
    healthRecordCategory: "cardiology",
    issuedOn: "1-1-2023",
    issuedTo: (
      <div className="flex mt-2">
        <p>did:ethr:0x123456789abcd</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="cursor-pointer ml-2 mr-4 h-8 text-md"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "CECT",
    healthRecordCategory: "radiology",
    issuedOn: "1-1-2023",
    issuedTo: (
      <div className="flex mt-2">
        <p>did:ethr:0x123456789abcd</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="cursor-pointer ml-2 mr-4 h-8 text-md"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
    name: "ABC",
  },
  {
    id: "m5gr84i9",
    healthRecordName: "X-Ray",
    healthRecordCategory: "radiology",
    issuedOn: "1-1-2023",
    issuedTo: (
      <div className="flex mt-2">
        <p>did:ethr:0x123456789abcd</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div
                className="cursor-pointer ml-2 mr-4 h-8 text-md"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy DID</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
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

export const protocolDefinition = {
  protocol: "https://alphadevs.dev/healthX-protocol",
  published: true,
  types: {
    healthRecord: {
      schema: "healthRecord",
      dataFormats: ["application/json"],
    },
  },
  structure: {
    healthRecord: {
      $actions: [
        { who: "anyone", can: "write" },
        { who: "author", of: "healthRecord", can: "read" },
        { who: "recipient", of: "healthRecord", can: "read" },
      ],
    },
  },
};
