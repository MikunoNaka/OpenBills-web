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

import axios from "axios";

export class Address {
  constructor() {
    this.Text = "";
    this.City = "";
    this.State = "";
    this.PostalCode = "";
    this.Country = "";
  }
}

export class Contact {
  constructor() {
    this.Name = "";
    this.Phones = [];
    this.Emails = [];
    this.Website = "";
  }
}

export class Client {
  constructor() {
    this.Id = null;
    this.Name = "";
    this.Contact = new Contact();
    this.GSTIN = "";
    this.BillingAddress = new Address();
    this.ShippingAddresses = [];
  }
}

export const saveClient = (item, ok, fail) => {
  axios.post("/client/new", item)
    .then(res => ok(res))
    .catch(err => fail(err))
}

export const deleteClient = (id, ok, fail) => {
  axios.delete(`/client/${id}`)
    .then(res => ok(res))
    .catch(err => fail(err))
}

export const getAllClients = (ok, fail) => {
  axios.get("/client/all")
    .then(res => ok(res.data))
    .catch(err => fail(err))
}

export const editClient = (client, ok, fail) => {
  axios.put(`/client/${client.Id}`, client)
    .then(res => ok(res))
    .catch(err => fail(err))
}
