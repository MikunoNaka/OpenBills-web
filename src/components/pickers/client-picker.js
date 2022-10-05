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

import { Client, InvoiceClient, getAllClients, Address } from '../../classes/client';
import './scss/client-picker.scss';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'

const ClientPicker = ({ client, setClient, shippingAddressId, setShippingAddressId }) => {
  const [clients, setClients] = useState([new Client()]);

  useEffect(() => refreshClients, []);

  const refreshClients = () =>
    getAllClients(setClients, () => {});

  const handleClientSelect = (e) => {
    const c = clients.filter(i => i.Id === e.target.value )[0];
    setClient(c ? c : new InvoiceClient());
  }

  const shouldShowAddressPicker = () => {
    if (client.Id !== null) {
      if (client.ShippingAddresses.length > 0) {
        // if the only address is same as billing address, dont show
        if (client.ShippingAddresses.length === 1) {
          return JSON.stringify(client.ShippingAddresses[0]) !==
            JSON.stringify(client.BillingAddress);
        }
        return true;
      }
    }
    return false;
  }

  const formatAddress = (addr) =>
    `${addr.Text.length > 30 ? addr.Text.substring(0, 30) + "..." : addr.Text} | ${addr.City}`;

  const formatClientName = (client) =>
    `${client.Name.length > 30 ? client.Name.substring(0, 30) + "..." : client.Name} | ${client.BillingAddress.City}`;

  return (
    <div className={"picker-wrapper"}>
      <p className={"heading"}>Invoice Recipient</p>
      <div className={"client-picker"}>
        <div className={"options"}>
          {clients && clients.length > 0 &&
            <>
              <label>
                Client Name:
                <select value={client.Id ? client.Id : ""} onChange={handleClientSelect}>
                  <option key="placeholder" value={""} disabled>Select A Client</option>
                  {clients.map(i => <option key={i.Id} value={i.Id}>{formatClientName(i)}</option>)}
                </select>
              </label>

              {shouldShowAddressPicker() &&
                <label>
                  Ship To:
                  <select value={shippingAddressId} onChange={(e) => setShippingAddressId(parseInt(e.target.value))} >
                    <option key="placeholder" value={-1} disabled>Select A Shipping Address</option>
                    {client.ShippingAddresses.map((i, id) => <option key={i.Text} value={id}>{formatAddress(i)}</option>)}
                  </select>
                </label>
              }
              <p>GSTIN: {client.GSTIN === "" ? "URP" : client.GSTIN}</p>
            </>
          }
        </div>

        <div className={"contact-info"}>
          <p>
            Name: {client.Contact.Name}<br/>
            {client.Contact.Phones.length > 0 &&
              <>
                <FontAwesomeIcon icon={faPhone} className={"icon"}/>
                {client.Contact.Phones.map((i, id) => <a key={`${i}-${id}`} href={`tel:${i}`}>{` ${i}${id + 1 === client.Contact.Phones.length ? '' : ','}`}</a>)}
                <br/>
              </>
            }
            {client.Contact.Emails.length > 0 &&
              <>
                <FontAwesomeIcon icon={faEnvelope} className={"icon"}/>
                {client.Contact.Emails.map((i, id) => <a key={`${i}-${id}`} href={`mailto:${i}`}>{` ${i}${id + 1 === client.Contact.Emails.length ? '' : ','}`}</a>)}
                <br/>
              </>
            }
            {client.Contact.Website.length > 0 &&
              <>
                <FontAwesomeIcon icon={faGlobe} className={"icon"}/> <a
                  href={`${(client.Contact.Website.startsWith("https://")
                    || client.Contact.Website.startsWith("http://"))
                      ? client.Contact.Website : 'https://' + client.Contact.Website}`}
                  target="noreferrer noopener"
                >
                  {client.Contact.Website}
                </a>
              </>
            }
          </p>
        </div>

        {client.Id !== null && // if client is selected
          <>
            <div className={"billing-address"}>
              <p className={"multiline"}>
                <strong>Billing Address: </strong><br/>
                {client.BillingAddress.Text} <br/>
                {client.BillingAddress.City}, {client.BillingAddress.State} - {client.BillingAddress.PostalCode} ({client.BillingAddress.Country})
              </p>
            </div>
            {shouldShowAddressPicker() && shippingAddressId >= 0 &&
              <div className={"shipping-address"}>
                <p className={"multiline"}>
                  <strong>Shipping Address: </strong><br/>
                  {client.ShippingAddresses[shippingAddressId].Text}<br/>
                  {client.ShippingAddresses[shippingAddressId].City}, {client.ShippingAddresses[shippingAddressId].State} - {client.ShippingAddresses[shippingAddressId].PostalCode} ({client.ShippingAddresses[shippingAddressId].Country})
                </p>
              </div>
            }
          </>
        }
      </div>
      <hr/>
    </div>
  );
}

export default ClientPicker;
