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

import { Client, saveClient } from './../../classes/client';
import AddressEditor from './address-editor';
import ContactEditor from './contact-editor';
import './scss/client-editor.scss';

import { useState } from 'react';

const ClientEditor = (props) => {
  const [name, setName] = useState("");
  const [GSTIN, setGSTIN] = useState([]);
  const [shipToBillingAddress, setShipToBillingAddress] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const client = new Client();
    client.Name = name;
    client.GSTIN = GSTIN;

    // TODO: Save is for new items. implement modification too
    saveClient(client, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    clearAll();
    props.callback();
  }

  const handleFail = () => {
    alert("fail");
  }

  const clearAll = () => {
    setName("");
    setGSTIN("")
  }

  const handleCancel = () => {
    // TODO: hide this component or something
    clearAll();
  }

  return (
    <div className={"editor-wrapper"}>
      <p>{props.heading}</p>
      <form onSubmit={handleSubmit} className={"editor client-editor"}>
        <div className={"top"}>
          <label>
            Client Name:
            <input
              type="text" name="name"
              value={name} onChange={(e) => setName(e.target.value)} />
          </label>

          <label>
            GSTIN:
            <input
              type="text" name="GSTIN"
              value={GSTIN} onChange={(e) => setGSTIN(e.target.value)} />
          </label>
        </div>

        <ContactEditor heading={"Contact Details"}/>
        <AddressEditor
          heading={"Billing Address"}
          isBillingAddress={true}
          billingAddressIsShipping={shipToBillingAddress}
          callback={setShipToBillingAddress} />

        <span className={"buttons"}>
          <input type="button" value="Clear" onClick={clearAll}/>
          <input type="button" value="Cancel" onClick={handleCancel}/>
          <input type="submit" value="Save" />
        </span>
      </form>
    </div>
  );
}

export default ClientEditor;
