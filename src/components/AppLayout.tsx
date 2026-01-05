import React from "react";
import { TopBar } from "./TopBar";

export function AppLayout(props: { children: React.ReactNode }) {
  return (
    <div className="container">
      <TopBar />
      {props.children}
    </div>
  );
}
