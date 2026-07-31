import { Route, Routes } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import RoomsPage from "@/features/rooms/RoomsPage";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="odalar" element={<RoomsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
