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

import './scss/management-page.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFileInvoice, faCartShopping, faIndustry } from '@fortawesome/free-solid-svg-icons'

const ManagementPage = () => {
  return (
    <>
      <h1>Manage OpenBills Data</h1>
      <p>
        Here you can add/modify/delete OpenBills data (clients, invoices, etc)
      </p>
      <div className={"manage-links"}>
        <Link to="/manage/items" className={"tile"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faCartShopping}/></span>
            <span className={"text"}>Edit Items</span>
          </span>
        </Link>
        <Link to="/manage/clients" className={"tile"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faUser}/></span>
            <span className={"text"}>Edit Clients</span>
          </span>
        </Link>
        <Link to="/manage/brands" className={"tile"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faIndustry}/></span>
            <span className={"text"}>Edit Brands</span>
          </span>
        </Link>
        <Link to="/manage/invoices" className={"tile"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faFileInvoice}/></span>
            <span className={"text"}>Edit Invoices</span>
          </span>
        </Link>
      </div>
    </>
  );
}

export default ManagementPage;
