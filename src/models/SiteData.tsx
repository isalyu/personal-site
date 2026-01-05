import type { Namespace } from "./Namespace";

export type SiteData = {
  environment: {
    cluster: string;
    context: string;
    user: string;
    version: string;
  };
  namespaces: Namespace[];
};
