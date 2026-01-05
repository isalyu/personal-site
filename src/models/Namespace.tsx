import type { Pod } from "./Pod";

export type Namespace = {
  id: string;
  label?: string;
  pods: Pod[];
};
