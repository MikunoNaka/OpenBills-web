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
import { Brand } from "./brand"

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
    .catch(err => fail())
}

export const getDiscountValue = (item) => item.DiscountPercentage > 0
  ? ((item.UnitPrice * item.Quantity)/100) * item.DiscountPercentage : 0.00;

export const getGSTValue = (item) => item.GSTPercentage > 0
  ? (((item.UnitPrice * item.Quantity) - getDiscountValue(item))/100) * item.GSTPercentage : 0.00;

export const getAmount = (item) =>
  (item.UnitPrice * item.Quantity) - getDiscountValue(item) + getGSTValue(item)

export const calcSum = (items) => items.reduce((prev, current, id, arr) => ({
  GST: prev.GST + getGSTValue(current),
  Discount: prev.Discount + getDiscountValue(current),
  UnitPrice: prev.UnitPrice + current.UnitPrice,
  Amount: prev.Amount + getAmount(current),
  Quantity: prev.Quantity + current.Quantity
}), {GST: 0, Discount: 0, UnitPrice: 0, Amount: 0, Quantity: 0});
