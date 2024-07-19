import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { AuthContext } from "./context/AuthContext";
import NewEmployeeForm from "./components/NewEmployeeForm";

const App = () => {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/new-employee" element={<NewEmployeeForm />} />
          <Route
            path="login/dashboard"
            element={auth.isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
