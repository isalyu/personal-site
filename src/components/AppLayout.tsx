import { useState } from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";

export type AppLayoutContext = {
  activeNamespace: string | null;
  setActiveNamespace: (ns: string | null) => void;
};

export function AppLayout() {
  const [activeNamespace, setActiveNamespace] = useState<string | null>(null);

  return (
    <div className="container">
      <TopBar />
      <Outlet
        context={
          { activeNamespace, setActiveNamespace } satisfies AppLayoutContext
        }
      />
    </div>
  );
}
