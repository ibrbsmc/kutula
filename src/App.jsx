import { Route, Routes } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import RoomsPage from "@/features/rooms/RoomsPage";
import BoxesPage from "@/features/boxes/BoxesPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="odalar" element={<RoomsPage />} />
        <Route path="kutular" element={<BoxesPage />} />
      </Route>
    </Routes>
  );
}

export default App;
