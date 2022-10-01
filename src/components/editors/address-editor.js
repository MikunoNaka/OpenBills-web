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

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AddressEditor = ({ heading, address, setAddress, isBillingAddress, billingAddressIsShipping, setShipToBillingAddress, deleteAddress}) => {
  return (
    <div className={"address-editor"}>
      <p className={"heading"}>{heading}</p>
      {isBillingAddress || // cross button
        <FontAwesomeIcon
          icon={faXmark}
          className={"remove-button"}
          onClick={deleteAddress}/>
      }

      <div className={"labels-wrapper"}>
        <div>
          <label>
            Country:
            <input
              type="text" name="name"
              value={address.Country}
              onChange={(e) => setAddress({Country: e.target.value})} />
          </label>

          <label>
            State:
            <input
              type="text" name="name"
              value={address.State}
              onChange={(e) => setAddress({State: e.target.value})} />
          </label>

          <label>
            City:
            <input
              type="text" name="name"
              value={address.City}
              onChange={(e) => setAddress({City: e.target.value})} />
          </label>
        </div>

        <div>
          <label>
            Address:
            <textarea
              type="text" name="name"
              value={address.Text}
              onChange={(e) => setAddress({Text: e.target.value})} />
          </label>

          <label>
            Postal Code:
            <input
              type="text" name="name"
              value={address.PostalCode}
              onChange={(e) => setAddress({PostalCode: e.target.value})} />
          </label>
        </div>
      </div>
      {isBillingAddress &&
        <label className={"checkbox-label"}>
          <input
            type="checkbox"
            checked={billingAddressIsShipping}
            onChange={() => setShipToBillingAddress(!billingAddressIsShipping)} />
          Shipping address same as billing address
        </label>
      }
    </div>
  );
}

export default AddressEditor;
