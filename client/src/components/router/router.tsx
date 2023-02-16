import { Route, Routes } from "react-router-dom";
import Confessions from "../confessions/Confessions";
import Home from "../home/home";
import MainLayout from "../layouts/mainLayout";
import Misdemeanours from "../misdemeanours/misdemeanours";
import NotFound from "../not_found/notFound";

const Router: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route path="/" element={<Home/>} /> 
        <Route path="/misdemeanours" element={<Misdemeanours/>} /> 
        <Route path="/confessions" element={<Confessions/>} />  
        <Route path="*" element={<NotFound/>} /> 
      </Route>
    </Routes>
    </>
  );
};

export default Router;
