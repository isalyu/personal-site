import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ClusterPage } from "./pages/ClusterPage";
import { LogsPage } from "./pages/LogsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<ClusterPage />} />
        <Route path="/ns/:namespace/pod/:podId/logs" element={<LogsPage />} />
      </Route>
    </Routes>
  );
}
