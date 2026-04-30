import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar";
import ProtectedRoute from "./components/protectedRote";
import PublicRoute from "./components/publicRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SelectRole from "./pages/SelectRole";
import Account from "./pages/Account";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
};
