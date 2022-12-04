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

import { Client, Address } from "./client";

import axios from "axios";

export class Transporter {
  constructor() {
    this.Id = null;
    this.Name = "";
    this.GSTIN = "";
    this.TransporterId = "";
  }
}

export class Transport {
  constructor() {
    this.Id = null;
    this.Transporter = new Transporter();
    this.VehicleNum = "";
    this.Note = "";
    this.TransportMethod = "";
  }
}

export class Invoice {
  constructor() {
    this.Id = null;
    this.InvoiceNumber = 0;
    this.TotalAmount = 0.00;
    this.CreatedAt = new Date();
    this.LastUpdated = null;
    this.Recipient = new Client();
    this.Paid = false;
    this.TransactionId = "";
    this.Transport = new Transport();
    this.DiscountPercentage = 0;
    this.BillingAddress = new Address();
    this.ShippingAddress = new Address();
    this.Items = [];
    this.Note = "";
    this.Draft = true;
  }
}

export const getAllInvoices = (ok, fail) => {
  axios.get("/invoice/all")
    .then(res => ok(res.data))
    .catch(err => fail())
}

export const saveInvoice = (invoice, ok, fail) => {
  axios.post("/invoice/new", invoice)
    .then(res => ok(res))
    .catch(err => fail(err))
}

export const deleteInvoice = (id, ok, fail) => {
  axios.delete(`/invoice/${id}`)
    .then(res => ok())
    .catch((err) => fail())
}

export const editInvoice = (item, ok, fail) => {
  axios.put(`/invoice/${item.Id}`, item)
    .then(res => ok())
    .catch(err => fail());
}
