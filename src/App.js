/* OpenBills-web - Web based libre billing software
 * Copyright (C) 2022  Vidhu Kant Sharma <vidhukant@vidhukant.xyz>

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ReactNotifications } from "react-notifications-component";
import axios from "axios";
import "./notifications_styles/notification.scss";

import Navbar from './components/navbar/navbar';
import HomePage from './views/homepage';
import RegisterPage from './views/login/register';
import LoginPage from './views/login/login';
import NewInvoicePage from './views/invoice/new';
import ManagementPage from './views/manage/manage';
import ManageItemsPage from './views/manage/items';
import ManageClientsPage from './views/manage/clients';
import ManageBrandsPage from './views/manage/brands';
import ManageInvoicesPage from './views/manage/invoices';
import './App.scss';

const App = () => {
  // when location changes, ping server to check if logged in
  // and don't ping if location is /login or /register
  const location = useLocation();
  useEffect(_ => {
    if (!["/login", "/register"].includes(location.pathname)) {
      axios.post("/ping")
    }
  }, [location]);

  return (
    <>
      <Navbar/>
      <ReactNotifications />
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/register" element={<RegisterPage/>}/>
          <Route exact path="/invoice/new" element={<NewInvoicePage/>}/>
          <Route exact path="/manage/items" element={<ManageItemsPage/>}/>
          <Route exact path="/manage/clients" element={<ManageClientsPage/>}/>
          <Route exact path="/manage/brands" element={<ManageBrandsPage/>}/>
          <Route exact path="/manage/invoices" element={<ManageInvoicesPage/>}/>
          <Route exact path="/manage" element={<ManagementPage/>}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
