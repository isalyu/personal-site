import { siteData } from "../data/site";

export function TopBar() {
  return (
    <div className="topbar">
      <div className="status">
        <div className="metadata">
          <span className="label">Context:</span>
          <span className="value">{siteData.environment.context}</span>

          <span className="label">Cluster:</span>
          <span className="value">{siteData.environment.cluster}</span>

          <span className="label">User:</span>
          <span className="value">{siteData.environment.user}</span>

          <span className="label">Version:</span>
          <span className="value">{siteData.environment.version}</span>
        </div>
      </div>

      <div className="topbar-center">
        <div className="topbar-hint-display namespaces">
          <span className="label">{"<0>"}</span>
          <span className="value">all</span>

          {siteData.namespaces.map((ns, i) => (
            <>
              <span key={`${ns.id}-k`} className="label"> {`<${i + 1}>`} </span>
              <span key={`${ns.id}-v`} className="value"> {ns.label ?? ns.id} </span>
            </>
          ))}
        </div>

        <div className="topbar-hint-display shortcuts">
          <span className="label">{"<↑/↓>"}</span>
          <span className="value">Nav</span>

          <span className="label">{"<l>"}</span>
          <span className="value">Logs</span>

          <span className="label">{"<esc>"}</span>
          <span className="value">Back</span>
        </div>
      </div>

      <div className="brand">
        <pre className="brand-ascii-art">{String.raw`
        .___  _________   _____
        |   |/   _____/  /  _  \
        |   |\_____  \  /  /_\  \
        |   |/        \/    |    \
        |___/_______  /\____|__  /
                    \/         \/`}</pre>
      </div>
    </div>
  );
}
