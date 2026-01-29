// export default MainLayout;

import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"; // adjust path

const MainLayout = () => {
  return (
    <div className="main-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
