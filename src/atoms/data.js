import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const web5State = atom({
  key: "web5State", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export const didState = atom({
  key: "didState", // unique ID (with respect to other atoms/selectors)
  default: { did: "", name: "", year: "", userType: "" }, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export const healthRecordsState = atom({
  key: "healthRecordsState", // unique ID (with respect to other atoms/selectors)
  default: [{}], // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export const base64ImageState = atom({
  key: "base64ImageState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});
