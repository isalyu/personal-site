import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { siteData } from "../data/site";
import { Frame } from "../components/Frame";
import { formatTag } from "../utils/renderLogLine";

export function LogsPage() {
  const params = useParams();
  const namespaceId = params.namespace ?? "";
  const podId = params.podId ?? "";

  const pod = useMemo(() => {
    const ns = siteData.namespaces.find((n) => n.id === namespaceId);
    return ns?.pods.find((p) => p.id === podId) ?? null;
  }, [namespaceId, podId]);

  if (!pod) {
    return (
      <Frame
        title="Logs"
        actions={
          <Link className="button" to="/">
            ← Back
          </Link>
        }
      >
        <div style={{ color: "var(--muted)" }}>Pod not found</div>
      </Frame>
    );
  }

  return (
    <Frame
      title={
        <>
          <span className="frame-title-text">Logs(</span>
          <span className="frame-title-cyan">
            {namespaceId}/{pod.id}
          </span>
          <span className="frame-title-text">)</span>
        </>
      }
      actions={
        <Link className="button" to="/">
          ← Back
        </Link>
      }
    >
      <div className="logs">
        {pod.logs.map((entry, i) => {
          if (entry.type === "spacer") {
            return <div key={i} className="spacer" />;
          }

          return (
            <div key={i}>
              {entry.type === "link" ? (
                <a href={entry.url} target="_blank" rel="noreferrer">
                  {formatTag(entry.tag)}
                  {entry.message}
                </a>
              ) : (
                <>
                  {formatTag(entry.tag)}
                  {entry.message}
                </>
              )}
            </div>
          );
        })}
      </div>
    </Frame>
  );
}
