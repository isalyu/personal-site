import { useMemo, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { siteData } from "../data/site";
import type { PodRow } from "../models/PodRow";
import { Frame } from "../components/Frame";
import { PodTable } from "../components/PodTable";
import { rowKey } from "../utils/rowKey";
import { useValidatePodRowSelection } from "../hooks/useValidatePodRowSelection";
import { usePodTableKeyBindings } from "../hooks/usePodTableKeyBindings";
import type { AppLayoutContext } from "../components/AppLayout";

export function ClusterPage() {
  const navigate = useNavigate();

  const allRows: PodRow[] = useMemo(() => {
    return siteData.namespaces.flatMap((ns) =>
      ns.pods.map((pod) => ({
        namespaceId: ns.id,
        namespaceLabel: ns.label ?? ns.id,
        pod,
      }))
    );
  }, []);

  const { activeNamespace, setActiveNamespace } =
    useOutletContext<AppLayoutContext>();

  const activeNamespaceRows = useMemo(() => {
    if (!activeNamespace) return allRows;
    return allRows.filter((r) => r.namespaceId === activeNamespace);
  }, [allRows, activeNamespace]);

  const [selectedPodRowKey, setSelectedPodRowKey] = useState<string | null>(
    allRows.length ? rowKey(allRows[0]) : null
  );

  useValidatePodRowSelection(
    activeNamespaceRows,
    selectedPodRowKey,
    setSelectedPodRowKey,
    rowKey
  );

  const selectedRowIndex = useMemo(() => {
    if (!selectedPodRowKey) return -1;
    return activeNamespaceRows.findIndex(
      (r) => rowKey(r) === selectedPodRowKey
    );
  }, [activeNamespaceRows, selectedPodRowKey]);

  function openLogs(namespaceId: string, podId: string) {
    navigate(
      `/ns/${encodeURIComponent(namespaceId)}/pod/${encodeURIComponent(podId)}/logs`
    );
  }

  usePodTableKeyBindings({
    activeNamespaceRows,
    selectedRowIndex,
    selectedPodRowKey,
    activeNamespace,
    setActiveNamespace,
    setSelectedPodRowKey,
    siteNamespaces: siteData.namespaces,
    openLogs,
  });

  return (
    <Frame
      title={
        <>
          <span className="frame-title-cyan">Pods(</span>
          <span className="frame-title-magenta">
            {activeNamespace ? activeNamespace : "all"}
          </span>
          <span className="frame-title-cyan">)[</span>
          <span className="frame-title-neutral">
            {activeNamespaceRows.length}
          </span>
          <span className="frame-title-cyan">]</span>
        </>
      }
    >
      <PodTable
        rows={activeNamespaceRows}
        selectedKey={selectedPodRowKey}
        onSelect={setSelectedPodRowKey}
        onOpenLogs={openLogs}
      />
    </Frame>
  );
}
