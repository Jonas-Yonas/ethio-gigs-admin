import { auth as nextAuth } from "./lib/auth.config";

export const auth = async () => {
  return await nextAuth();
};
