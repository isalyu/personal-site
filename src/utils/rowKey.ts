import type { PodRow } from "../models/PodRow";

export function rowKey(r: PodRow) {
  return `${r.namespaceId}:${r.pod.id}`;
}
