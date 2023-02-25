import { Route, Routes } from "react-router-dom";
import LoginForm from "../login/LoginForm";
import Confession from "../confessions/confessions";
import Home from "../home/Home";
import MainLayout from "../layouts/MainLayout";
import Misdemeanours from "../misdemeanours/Misdemeanours";
import NotFound from "../not_found/NotFound";

const Router: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<Home/>} /> 
        <Route path="misdemeanours" element={<Misdemeanours/>} /> 
        <Route path="confessions" element={<Confession/>} />  
        <Route path="*" element={<NotFound/>} /> 
      </Route>
    </Routes>
    </>
  );
};

export default Router;
