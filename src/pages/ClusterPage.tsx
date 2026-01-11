import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { siteData } from "../data/site";
import type { PodRow } from "../models/PodRow";
import { Frame } from "../components/Frame";
import { PodTable } from "../components/PodTable";

export function ClusterPage() {
  const navigate = useNavigate();

  const rows: PodRow[] = useMemo(() => {
    return siteData.namespaces.flatMap((ns) =>
      ns.pods.map((pod) => ({
        namespaceId: ns.id,
        namespaceLabel: ns.label ?? ns.id,
        pod,
      }))
    );
  }, []);

  // Future-proof: selection exists even though v1 is click-only.
  const [selectedKey, setSelectedKey] = useState<string | null>(
    rows.length ? `${rows[0].namespaceId}:${rows[0].pod.id}` : null
  );

  function openLogs(namespaceId: string, podId: string) {
    navigate(
      `/ns/${encodeURIComponent(namespaceId)}/pod/${encodeURIComponent(podId)}/logs`
    );
  }

  return (
    <Frame
      title={
        <>
          <span className="frame-title-cyan">Pods(</span>
          <span className="frame-title-magenta">all</span>
          <span className="frame-title-cyan">)[</span>
          <span className="frame-title-neutral">{rows.length}</span>
          <span className="frame-title-cyan">]</span>
        </>
      }
    >
      <PodTable
        rows={rows}
        selectedKey={selectedKey}
        onSelect={setSelectedKey}
        onOpenLogs={openLogs}
      />
    </Frame>
  );
}
