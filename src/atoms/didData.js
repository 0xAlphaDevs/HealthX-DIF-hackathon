"use client";
import { atom } from "recoil";

import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const didState = atom({
  key: "didState", // unique ID (with respect to other atoms/selectors)
  default: { did: "", name: "", year: "", userType: "" }, // default value (aka initial value)
  effects_UNSTABLE: [persistAtom],
});

export default didState;
