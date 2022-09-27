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

import { Client, saveClient, Contact, Address } from './../../classes/client';
import AddressEditor from './address-editor';
import ContactEditor from './contact-editor';
import './scss/client-editor.scss';

import { useState, useEffect } from 'react';

const ClientEditor = (props) => {
  const [name, setName] = useState("");
  const [GSTIN, setGSTIN] = useState([]);
  const [contact, setContact] = useState(new Contact());
  const [billingAddress, setBillingAddress] = useState(new Address());
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [shipToBillingAddress, setShipToBillingAddress] = useState(true);

  useEffect(() => {
    // will delete existing shipping addresses if false
    setShippingAddresses(shipToBillingAddress ? [] : [new Address()])
  }, [shipToBillingAddress]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const client = new Client();
    client.Name = name;
    client.GSTIN = GSTIN;
    client.Contact = contact;
    client.BillingAddress = billingAddress;
    client.ShippingAddresses = shipToBillingAddress
      ? [billingAddress]
      : shippingAddresses

    // TODO: Save is for new items. implement modification too
    saveClient(client, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    clearAll();
    props.successCallback();
  }

  const handleFail = (err) => {
    alert("fail");
    console.log(err);
  }

  const clearAll = () => {
    setName("");
    setGSTIN("")
    setContact(new Contact());
    setBillingAddress(new Address());
    setShippingAddresses([]);
    setShipToBillingAddress(true);
  }

  const handleCancel = () => {
    // TODO: hide this component or something
    clearAll();
  }

  const handleShippingAddressUpdate = (id, data) => {
    setShippingAddresses([
      ...shippingAddresses.slice(0, id),
      data,
      ...shippingAddresses.slice(id+1)
    ]);
  }

  const handleShippingAddressDelete = (id) => {
    // deleting the last address sets
    // shipToBillingAddress to true
    if (shippingAddresses.length === 1) {
      setShipToBillingAddress(true);
    } else {
      setShippingAddresses([
        ...shippingAddresses.slice(0, id),
        ...shippingAddresses.slice(id+1)
      ]);
    }
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

        <ContactEditor
          heading={"Contact Details"}
          contact={contact}
          setContact={setContact} />
        <AddressEditor
          heading={"Billing Address"}
          isBillingAddress={true}
          billingAddressIsShipping={shipToBillingAddress}
          setShipToBillingAddress={setShipToBillingAddress}
          address={billingAddress}
          setAddress={setBillingAddress} />

        {shippingAddresses.length > 0 && shippingAddresses.map((i, id) =>
          <AddressEditor
            key={id}
            heading={`Shipping Address ${shippingAddresses.length === 1 ? '' : id + 1}`}
            address={i}
            deleteAddress={() => handleShippingAddressDelete(id)}
            setAddress={(data) => handleShippingAddressUpdate(id, data)} />
        )}

        <span className={`buttons ${shippingAddresses.length > 0 ? 'wide' : ''}`}>
          {shippingAddresses.length > 0 &&
            <input
            className={"wide-button"}
            type="button"
            value="Add Shipping Address"
            onClick={()=> setShippingAddresses([...shippingAddresses, new Address()])}/>
          }
          <input type="button" value="Clear" onClick={clearAll}/>
          <input type="button" value="Cancel" onClick={handleCancel}/>
          <input type="submit" value="Save" />
        </span>
      </form>
    </div>
  );
}

export default ClientEditor;
