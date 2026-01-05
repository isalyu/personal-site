export type LogEntry =
  | { type: "text"; tag: string; message: string }
  | { type: "link"; tag: string; message: string; url: string }
  | { type: "spacer" };
