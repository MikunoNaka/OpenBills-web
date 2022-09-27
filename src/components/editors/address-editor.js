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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const AddressEditor = (props) => {
  const handleInput = (field, event) => {
    const a = new Address();
    const val = event.target.value;
    a.Country = field === "country" ? val : props.address.Country;
    a.State = field === "state" ? val : props.address.State;
    a.City = field === "city" ? val : props.address.City;
    a.Text = field === "address" ? val : props.address.Text;
    a.PostalCode = field === "postal" ? val : props.address.PostalCode;
    props.setAddress(a);
  }

  return (
    <div className={"address-editor"}>
      <p className={"heading"}>{props.heading}</p>
      {props.isBillingAddress || // cross button
        <FontAwesomeIcon
          icon={faXmark}
          className={"remove-button"}
          onClick={props.deleteAddress}/>
      }

      <div className={"labels-wrapper"}>
        <div>
          <label>
            Country:
            <input
              type="text" name="name"
              value={props.address.Country} onChange={(e) => handleInput("country", e)} />
          </label>

          <label>
            State:
            <input
              type="text" name="name"
              value={props.address.State} onChange={(e) => handleInput("state", e)} />
          </label>

          <label>
            City:
            <input
              type="text" name="name"
              value={props.address.City} onChange={(e) => handleInput("city", e)} />
          </label>
        </div>

        <div>
          <label>
            Address:
            <textarea
              type="text" name="name"
              value={props.address.Text} onChange={(e) => handleInput("address", e)} />
          </label>

          <label>
            Postal Code:
            <input
              type="text" name="name"
              value={props.address.PostalCode} onChange={(e) => handleInput("postal", e)} />
          </label>
        </div>
      </div>
      {props.isBillingAddress &&
        <label className={"checkbox-label"}>
          <input
            type="checkbox"
            checked={props.billingAddressIsShipping}
            onChange={() => props.setShipToBillingAddress(!props.billingAddressIsShipping)} />
          Shipping address same as billing address
        </label>
      }
    </div>
  );
}

export default AddressEditor;
