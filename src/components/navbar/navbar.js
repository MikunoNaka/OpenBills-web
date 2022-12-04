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

import './navbar.scss';
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [status, setStatus] = useState("");
  const location = useLocation().pathname;

  useEffect(() => {
    if (location.includes("/manage")) {
      switch (location) {
        case "/manage/items":
          setStatus("Manage Saved Items")
          break;
        case "/manage/clients":
          setStatus("Manage Saved Clients")
          break;
        case "/manage/brands":
          setStatus("Manage Saved Brands")
          break;
        default:
          setStatus("Manage Data")
          break;
      }
    } else {
      if (location === "/") {
        setStatus("Welcome To OpenBills")
      }
    }

  }, [location])

  // TODO: add manage invoices page
  const manageLinks = [
    {text: "Edit Items", to: "/manage/items"},
    {text: "Edit Clients", to: "/manage/clients"},
    {text: "Edit Brands", to: "/manage/brands"}
  ];

  return (
    <div className={"navbar"}>
      <span className={"logo"}>
        <Link to="/">
          <img src="/waifu_logo.png" alt="App Logo"/>
        </Link>
      </span>

      <p className={"status"}>
        {status}
      </p>

      <span className={"buttons"}>
        {location.includes("/manage") &&
          manageLinks.map((i, id) =>
            <Link key={`link-${id}`} to={i.to} className={i.to === location ? "current" : ""}>
              {i.text}
            </Link>
        )}
        {location !== "/" &&
          <Link to="/" className={location === "/" ? "current" : ""}>
            Home
          </Link>
        }
      </span>
    </div>
  );
}

export default Navbar;
