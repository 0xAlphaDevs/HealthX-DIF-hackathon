import { atom } from "recoil";

const didState = atom({
  key: "didState", // unique ID (with respect to other atoms/selectors)
  default: { did: "", name: "", year: "" }, // default value (aka initial value)
});

export default didState;
