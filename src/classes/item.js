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
import c from "currency.js";
import { Brand } from "./brand";

// TODO: load from config or something
export const currency = value => c(value, {
  decimal: '.',
  seperator: ',',
  precision: 2,
  symbol: '₹ ',
});

export class Item {
  constructor() {
    this.Id = null;
    this.Brand = new Brand();
    this.UnitOfMeasure = "";
    this.Name = "";
    this.Description = "";
    this.HSN = "";
    this.UnitPrice = 0.00;
    this.GSTPercentage = 0.00;
    this.MinQuantity = 0.00;
    this.MaxQuantity = 0.00;
    this.HasDecimalQuantity = false;
  }
}

export class InvoiceItem extends Item {
  constructor() {
    super();
    this.Quantity = 0.00;
    this.DiscountPercentage = 0.00;
  }
}

export const saveItem = (item, ok, fail) => {
  axios.post("/item/new", item)
    .then(res => ok())
    .catch((err) => fail())
}

export const deleteItem = (id, ok, fail) => {
  axios.delete(`/item/${id}`)
    .then(res => ok())
    .catch((err) => fail())
}

export const getAllItems = (ok, fail) => {
  axios.get("/item/all")
    .then(res => ok(res.data))
    .catch(err => fail())
}

export const editItem = (item, ok, fail) => {
  axios.put(`/item/${item.Id}`, item)
    .then(res => ok())
    .catch(err => fail());
}

export const getDiscountValue = (item) =>
  currency(item.UnitPrice).multiply(item.Quantity).divide(100).multiply(item.DiscountPercentage)

export const getGSTValue = (item) => item.GSTPercentage > 0
  ? currency(item.UnitPrice).multiply(item.Quantity).subtract(getDiscountValue).divide(100).multiply(item.GSTPercentage) : currency(0.00)

export const getAmount = (item) =>
  currency(item.UnitPrice).multiply(item.Quantity).add(getDiscountValue(item)).add(getGSTValue(item))

export const calcSum = (items) => items.reduce((prev, current, id, arr) => ({
  GST: prev.GST.add(getGSTValue(current)),
  Discount: prev.Discount.add(getDiscountValue(current)),
  UnitPrice: prev.UnitPrice.add(currency(current.UnitPrice).multiply(current.Quantity)),
  Amount: prev.Amount.add(getAmount(current)),
  Quantity: prev.Quantity.add(current.Quantity) // stored as a currency because it can be float
}), {GST: currency(0), Discount: currency(0), UnitPrice: currency(0), Amount: currency(0), Quantity: currency(0)});
