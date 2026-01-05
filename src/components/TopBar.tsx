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
