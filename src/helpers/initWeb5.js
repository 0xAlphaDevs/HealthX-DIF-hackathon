import { Web5 } from "@web5/api";

export const initWeb5 = async () => {
  const { web5, did } = await Web5.connect({});
  return { web5, did };
};
