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

import { Address } from './../../classes/client';
import './scss/address-editor.scss';

import { useState } from 'react';

const AddressEditor = (props) => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");

  return (
    <div className={"address-editor"}>
      <p className={"heading"}>{props.heading}</p>

      <div className={"labels-wrapper"}>
        <div>
          <label>
            Country:
            <input
              type="text" name="name"
              value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>

          <label>
            State:
            <input
              type="text" name="name"
              value={state} onChange={(e) => setState(e.target.value)} />
          </label>

          <label>
            City:
            <input
              type="text" name="name"
              value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
        </div>

        <div>
          <label>
            Address:
            <textarea
              type="text" name="name"
              value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>

          <label>
            Postal Code:
            <input
              type="text" name="name"
              value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
          </label>
        </div>
      </div>
      {props.isBillingAddress &&
        <label className={"checkbox-label"}>
          <input
            type="checkbox"
            checked={props.billingAddressIsShipping}
            onChange={props.callback()} />
          Shipping address same as billing address
        </label>
      }
    </div>
  );
}

export default AddressEditor;
