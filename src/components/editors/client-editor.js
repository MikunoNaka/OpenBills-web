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

import { Client, saveClient, editClient, Contact, Address } from './../../classes/client';
import MultiAddressEditor from './multi-address-editor';
import AddressEditor from './address-editor';
import ContactEditor from './contact-editor';
import './scss/client-editor.scss';

import { useState, useEffect } from 'react';

const ClientEditor = (props) => {
  const [name, setName] = useState(props.client.Name);
  const [GSTIN, setGSTIN] = useState(props.client.GSTIN);
  const [contact, setContact] = useState(props.client.Contact);
  const [billingAddress, setBillingAddress] = useState(props.client.BillingAddress);
  const [shippingAddresses, setShippingAddresses] = useState(props.client.ShippingAddresses);
  const [shipToBillingAddress, setShipToBillingAddress] = useState(
    props.client.ShippingAddresses.length === 1
      ? JSON.stringify(props.client.ShippingAddresses[0]) === JSON.stringify(props.client.BillingAddress)
      : props.client.ShippingAddresses.length === 0
  );

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

    // remove blank phone numbers/email addresses
    client.Contact.Phones = client.Contact.Phones.filter(i => i !== "");
    client.Contact.Emails = client.Contact.Emails.filter(i => i !== "");

    props.editing
      ? editClient(client, handleSuccess, handleFail)
      : saveClient(client, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    clearAll();
    props.successCallback();
    props.editing && props.hide();
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
    clearAll();
    props.editing && props.hide();
  }

  return (
    <div className={`editor-wrapper ${props.className ? props.className : ''}`}>
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
          address={billingAddress}
          setAddress={(data) => setBillingAddress(prev => ({...prev, ...data}))}
          isBillingAddress={true}
          billingAddressIsShipping={shipToBillingAddress}
          setShipToBillingAddress={setShipToBillingAddress} />

        {shipToBillingAddress ||
          <MultiAddressEditor
            addresses={shippingAddresses}
            setAddresses={setShippingAddresses}
            setShipToBillingAddress={setShipToBillingAddress} />
        }

        <span className={`buttons ${shipToBillingAddress  ? '' : 'wide'}`}>
          {shipToBillingAddress ||
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
