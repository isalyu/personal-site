import { Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { ClusterPage } from "./pages/ClusterPage";
import { LogsPage } from "./pages/LogsPage";

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ClusterPage />} />
        <Route path="/ns/:namespace/pod/:podId/logs" element={<LogsPage />} />
      </Routes>
    </AppLayout>
  );
}
