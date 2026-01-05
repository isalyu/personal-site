import { useNow } from "../hooks/useNow";
import type { PodRow } from "../models/PodRow";
import { formatAge } from "../utils/podAge";

export function PodTable(props: {
  rows: PodRow[];
  selectedKey: string | null; // namespaceId:podId
  onSelect: (key: string) => void;
  onOpenLogs: (namespaceId: string, podId: string) => void;
}) {
  const currentTs = useNow();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>NAMESPACE</th>
          <th>NAME</th>
          <th>READY</th>
          <th>RESTARTS</th>
          <th>STATUS</th>
          <th>AGE</th>
        </tr>
      </thead>
      <tbody>
        {props.rows.map((r) => {
          const key = `${r.namespaceId}:${r.pod.id}`;
          const selected = props.selectedKey === key;
          return (
            <tr
              key={key}
              className={selected ? "selected" : ""}
              onClick={() => {
                props.onSelect(key);
                props.onOpenLogs(r.namespaceId, r.pod.id);
              }}
            >
              <td>{r.namespaceLabel}</td>
              <td>{r.pod.id}</td>
              <td>{r.pod.ready ?? "-"}</td>
              <td>
                {typeof r.pod.restarts === "number" ? r.pod.restarts : "-"}
              </td>
              <td>{r.pod.status}</td>
              <td>{formatAge(r.pod.startedAt, currentTs)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
