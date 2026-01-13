import { useEffect } from "react";

export function useValidatePodRowSelection<Row>(
  activeNamespaceRows: Row[],
  selectedPodRowKey: string | null,
  setSelectedPodRowKey: (key: string | null) => void,
  rowKey: (row: Row) => string
) {
  useEffect(() => {
    if (activeNamespaceRows.length === 0) {
      setSelectedPodRowKey(null);
      return;
    }

    if (!selectedPodRowKey) {
      setSelectedPodRowKey(rowKey(activeNamespaceRows[0]));
      return;
    }

    const stillVisible = activeNamespaceRows.some(
      (r) => rowKey(r) === selectedPodRowKey
    );

    if (!stillVisible) {
      setSelectedPodRowKey(rowKey(activeNamespaceRows[0]));
    }
  }, [activeNamespaceRows, selectedPodRowKey, setSelectedPodRowKey, rowKey]);
}
