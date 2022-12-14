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

import './scss/client-table.scss';
import { deleteClient } from './../../classes/client';
import { notificationConfig } from "./../../classes/notifications";

import { Store } from "react-notifications-component";

const ClientTable = (props) => {
  const handleEdit = c => {
    props.setClientToEdit(c)
  }

  const handleDelete = c => {
    // TODO: add confirmation prompt
    deleteClient(c.Id, () => handleDelSuccess(c), err => handleDelFail(c, err));
  }

  const handleDelSuccess = c => {
    Store.addNotification({
      title: "Successfully deleted client!",
      message: `Client '${c.Name}' has successfully been deleted.`,
      ...notificationConfig("success")
    });
    props.refresh();
  }

  const handleDelFail = (c, err) => {
    Store.addNotification({
      title: "An error occoured",
      message: `Failed to delete client '${c.Name}'. ${err.message}`,
      ...notificationConfig("danger")
    });
  }

  return (
    <div className={"client-table"}>
      {props.clients && props.clients.map((i, id) => (
        <div key={id} className={"client"}>
          <p className={"client-title"}>
            <span className={"client-name"}>{i.Name}</span>
            <span className={"client-gstin"}> {i.GSTIN}</span>
          </p>

          <div className={"paragraph-wrapper"}>
            <div className={"contact-details"}>
              <p className={"heading"}><strong>Contact: </strong>{i.Contact.Name}</p>
              <p>
                Phone Number{i.Contact.Phones.length === 1 ? '' : 's'}:
                {i.Contact.Phones.map((j, id) => <a key={`${j}-${id}`} href={`tel:${j}`}>{` ${j}${id + 1 === i.Contact.Phones.length ? '' : ','}`}</a>)}
                <br/>
                Email Address{i.Contact.Emails.length === 1 ? '' : 'es'}:
                {i.Contact.Emails.map((j, id) => <a key={`${j}-${id}`} href={`mailto:${j}`}>{` ${j}${id + 1 === i.Contact.Emails.length ? '' : ','}`}</a>)}
                <br/>
                {i.Contact.Website.length > 0 &&
                 <a
                   href={`${(i.Contact.Website.startsWith("https://")
                     || i.Contact.Website.startsWith("http://"))
                       ? i.Contact.Website : 'https://' + i.Contact.Website}`}
                   target="noreferrer noopener"
                 >
                   {i.Contact.Website}
                 </a>
                }
              </p>

            </div>

            <div className={"billing-address"}>
              <p><strong>Billing Address: </strong></p>
              <p className={"multiline"}>{i.BillingAddress.Text}</p>
              <p>{i.BillingAddress.City}, {i.BillingAddress.State} - {i.BillingAddress.PostalCode} ({i.BillingAddress.Country})</p>
            </div>
            {i.ShippingAddresses.length > 0 && // if billing address != shipping address
              JSON.stringify(i.ShippingAddresses[0]) !== JSON.stringify(i.BillingAddress) &&
              <div className={"shipping-addresses"}>
                {i.ShippingAddresses.map((j, id) =>
                  <div key={id} className={"shipping-address"}>
                    <p><strong>{`Shipping Address ${i.ShippingAddresses.length === 1 ? '' : id + 1}:`}</strong></p>
                    <p className={"multiline"}>{j.Text}</p>
                    <p>{j.City}, {j.State} - {j.PostalCode} ({j.Country})</p>
                  </div>
                )}
              </div>
            }
          </div>

          <div className={"buttons"}>
            <input type="button" value="Edit" onClick={() => handleEdit(i)}/>
            <input type="button" value="Delete" onClick={() => handleDelete(i)}/>
          </div>

          <hr/>
        </div>
      ))}
    </div>
  );
}

export default ClientTable;
