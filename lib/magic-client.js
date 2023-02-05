import { Magic } from "magic-sdk";

const MAGIC_PUBLISHABLE_API_KEY =
  process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY;
const createMagic = () => {
  // console.log(MAGIC_PUBLISHABLE_API_KEY);
  return typeof window !== "undefined" && new Magic(MAGIC_PUBLISHABLE_API_KEY);
};
export const magic = createMagic(); // ✨
