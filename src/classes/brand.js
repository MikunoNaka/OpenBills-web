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

/* TODO: implement a better way to handle
 * API responses/errors
 *
 * maybe I can send a notification when a brand
 * is successfully added, or when some error occours
 */

export class Brand {
  constructor() {
    this.Id = null;
    this.Name = "";
  }
}

export const deleteBrand = (id, ok, fail) => {
  axios.delete(`/brand/${id}`)
    .then(res => ok())
    .catch(err => fail())
}

export const getAllBrands = (ok, fail) => {
  axios.get("/brand/all")
    .then(res => ok(res.data))
    .catch(err => fail())
}

export const editBrand = (brand, ok, fail) => {
  axios.put(`/brand/${brand.Id}`, brand)
    .then(res => ok())
    .catch(err => fail())
}

export const saveBrand = (brand, ok, fail) => {
  axios.post("/brand/new", brand)
    .then(res => ok())
    .catch(err => fail())
}
