import type { SiteData, Pod } from "../models";
import namespacesDef from "./namespaces.json";

const podModules = import.meta.glob("./pods/**/*.json", { eager: true });

const podsById = new Map<string, Pod>();

for (const mod of Object.values(podModules)) {
  const pod = (mod as { default: Pod }).default;
  podsById.set(pod.id, pod);
}

export const siteData: SiteData = {
  environment: {
    cluster: "local",
    context: "public",
    user: "guest",
    version: "v1.1.0",
  },
  namespaces: (
    namespacesDef as Array<{
      id: string;
      label?: string;
      podIds: string[];
    }>
  ).map((ns) => ({
    id: ns.id,
    label: ns.label ?? ns.id,
    pods: ns.podIds
      .map((podId) => {
        const pod = podsById.get(podId);
        if (!pod) return null;
        return pod;
      })
      .filter((p): p is Pod => p !== null),
  })),
};
