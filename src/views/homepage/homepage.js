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

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faDatabase, faFileInvoice } from '@fortawesome/free-solid-svg-icons'
import "./scss/homepage.scss";

const HomePage = () => {
  return (
    <>
      <h1>Welcome To OpenBills!</h1>
      <div className={"homepage-menu"}>
        <Link to="/invoice/new" className={"tile create-invoice-link"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faFileInvoice}/></span>
            <span className={"text"}>Create Invoice</span>
          </span>
        </Link>
        <Link to="/manage" className={"tile"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faDatabase}/></span>
            <span className={"text"}>Manage Database</span>
          </span>
        </Link>
        <Link to="/settings" className={"tile"}>
          <span className={"content"}>
            <span className={"icon"}><FontAwesomeIcon icon={faGear}/></span>
            <span className={"text"}>Settings</span>
          </span>
        </Link>
      </div>
    </>
  );
}

export default HomePage;
