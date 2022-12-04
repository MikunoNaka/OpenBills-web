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

export class User {
  constructor() {
    this.Id = null;
    this.UserName = "";
    this.Email = "";
    this.Password = "";
  }
}

export const validateUsername = username => {
  if (username.length < 2) return false;
  // username can't have spaces
  if (username.includes(" ")) return false;
  return true
}

export const validatePassword = password => {
  if (password.length < 12) return false;
  // TODO: add other validation

  return true;
}

export const validateEmail = email => String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ) ? true : false;

export const login = (data, ok, fail) => {
  axios.post("/auth/login", data)
    .then(res => ok(res))
    .catch(err => fail(err));
}

export const saveUser = (user, ok, fail) => {
  axios.post("/user/new", user)
    .then(res => ok(res))
    .catch(err => fail(err));
}

export const deleteUser = (id, ok, fail) => {
  axios.delete(`/user/${id}`)
    .then(res => ok(res))
    .catch(err => fail(err));
}

export const editUser = (user, ok, fail) => {
  axios.put(`/user/${user.Id}`, user)
    .then(res => ok(res))
    .catch(err => fail(err));
}
