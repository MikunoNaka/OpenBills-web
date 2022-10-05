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

import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.scss';
import Navbar from './components/navbar/navbar';
import HomePage from './views/homepage';
import NewInvoicePage from './views/invoice/new';
import ManagementPage from './views/manage/manage';
import ManageItemsPage from './views/manage/items';
import ManageClientsPage from './views/manage/clients';
import ManageBrandsPage from './views/manage/brands';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <main>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/invoice/new" element={<NewInvoicePage/>}/>
          <Route exact path="/manage/items" element={<ManageItemsPage/>}/>
          <Route exact path="/manage/clients" element={<ManageClientsPage/>}/>
          <Route exact path="/manage/brands" element={<ManageBrandsPage/>}/>
          <Route exact path="/manage" element={<ManagementPage/>}/>
          <Route path="*" element={<h1>404</h1>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
