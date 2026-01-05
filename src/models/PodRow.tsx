import type { Pod } from "./Pod";

export type PodRow = {
  namespaceId: string;
  namespaceLabel: string;
  pod: Pod;
};
