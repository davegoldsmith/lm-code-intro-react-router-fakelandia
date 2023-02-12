// import Footer from "../footer/footer";
import Header from "../header/header";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => (
  <>
    <Header />
    <main className="main">
      <Outlet />
    </main>
    {/* <Footer /> */}
  </>
);

export default MainLayout;
