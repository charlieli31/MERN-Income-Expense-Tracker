import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/forms/login";
import HomePage from "./components/homePage/homePage";
import Register from "./components/forms/Register";
import Navbar from "./components/navBar/navBar";
import AddTransaction from "./components/forms/addTransaction";
import AccountDashboard from "./components/dashboard/accountDashBoard";
import AccountDetails from "./components/dashboard/accountDetails";
import AddAccount from "./components/forms/addAccount";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/add-transaction/:id" element={<AddTransaction />}></Route>
        <Route path="/dashboard" element={<AccountDashboard />}></Route>
        <Route
          path="/account-details/:accountID"
          element={<AccountDetails />}
        ></Route>
        <Route
          path="/dashboard/accounts/create"
          element={<AddAccount />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
