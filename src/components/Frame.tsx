import React from "react";

export function Frame(props: {
  title: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="frame">
      <div className="frame-header">
        <div className="frame-title">{props.title}</div>
        <div className="frame-actions">{props.actions}</div>
      </div>
      <div className="frame-body">{props.children}</div>
    </div>
  );
}
