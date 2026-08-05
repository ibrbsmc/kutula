import { Route, Routes } from "react-router";
import AppLayout from "@/components/layout/AppLayout";
import DashboardPage from "@/features/dashboard/DashboardPage";
import RoomsPage from "@/features/rooms/RoomsPage";
import BoxesPage from "@/features/boxes/BoxesPage";
import ItemsPage from "@/features/items/ItemsPage";
import AboutPage from "@/features/about/AboutPage";
import ContactPage from "@/features/contact/ContactPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="odalar" element={<RoomsPage />} />
          <Route path="kutular" element={<BoxesPage />} />
          <Route path="esyalar" element={<ItemsPage />} />
          <Route path="hakkinda" element={<AboutPage />} />
          <Route path="iletisim" element={<ContactPage />} />
        </Route>
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
