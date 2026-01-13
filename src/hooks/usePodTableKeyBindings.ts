import { useEffect } from "react";
import { rowKey } from "../utils/rowKey";
import type { PodRow } from "../models/PodRow";

type Namespace = { id: string };

export function usePodTableKeyBindings(params: {
  activeNamespaceRows: PodRow[];
  selectedRowIndex: number;
  selectedPodRowKey: string | null;
  activeNamespace: string | null;
  setActiveNamespace: (ns: string | null) => void;

  setSelectedPodRowKey: (key: string | null) => void;

  siteNamespaces: Namespace[];
  openLogs: (namespaceId: string, podId: string) => void;
}) {
  const {
    activeNamespaceRows,
    selectedRowIndex,
    activeNamespace,
    setActiveNamespace,
    setSelectedPodRowKey,
    siteNamespaces,
    openLogs,
  } = params;

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (activeNamespaceRows.length === 0) return;

      const current = selectedRowIndex >= 0 ? selectedRowIndex : 0;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = Math.min(activeNamespaceRows.length - 1, current + 1);
        setSelectedPodRowKey(rowKey(activeNamespaceRows[next]));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = Math.max(0, current - 1);
        setSelectedPodRowKey(rowKey(activeNamespaceRows[prev]));
        return;
      }

      if (e.key === "l" || e.key === "L" || e.key === "Enter") {
        e.preventDefault();
        const r = activeNamespaceRows[current];
        openLogs(r.namespaceId, r.pod.id);
        return;
      }

      if (e.key >= "0" && e.key <= "9") {
        e.preventDefault();
        const n = Number(e.key);

        if (n === 0) {
          setActiveNamespace(null);
          return;
        }

        const ns = siteNamespaces[n - 1];
        if (ns) setActiveNamespace(ns.id);
        return;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    activeNamespaceRows,
    selectedRowIndex,
    activeNamespace,
    setActiveNamespace,
    setSelectedPodRowKey,
    siteNamespaces,
    openLogs,
  ]);
}
