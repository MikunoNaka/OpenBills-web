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

import { Brand, saveBrand, editBrand } from './../../classes/brand'
import { notificationConfig } from "./../../classes/notifications";
import './scss/brand-editor.scss'

import { Store } from "react-notifications-component";
import { useState } from 'react';

const BrandEditor = (props) => {
  const [name, setName] = useState(props.brand.Name);

  const handleSubmit = (e) => {
    e.preventDefault();

    const brand = new Brand();
    brand.Id = props.brand.Id;
    brand.Name = name;

    props.editing
      ? editBrand(brand, handleSuccess, handleFail)
      : saveBrand(brand, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    Store.addNotification({
      title: `Successfully ${props.editing ? "edited" : "added"} brand!`,
      message: `${name} has successfully been ${props.editing ? "edited" : "saved"}.`,
      ...notificationConfig("success")
    });
    clearAll();
    props.callback();
    props.editing && props.hide();
  }

  const handleFail = err => {
    Store.addNotification({
      title: "An error occoured",
      message: `Failed to ${props.editing ? "edit" : "add"} brand '${name}'. ${err.message}`,
      ...notificationConfig("danger")
    });
  }

  const clearAll = () => {
    setName("");
  }

  const handleCancel = () => {
    clearAll();
    props.editing && props.hide();
  }

  return (
    <div className={`editor-wrapper ${props.className ? props.className : ''}`}>
      <p>{props.heading}</p>
      <form onSubmit={handleSubmit} className={"editor brand-editor"}>
        <label>
          Brand Name:
          <input
            type="text" name="name"
            value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <span className={`buttons ${props.editing ? '' : 'narrow'}`}>
          <input type="button" value="Clear" onClick={clearAll}/>
          {props.editing &&
            <input type="button" value="Cancel" onClick={handleCancel}/>
          }
          <input type="submit" value="Save" />
        </span>
      </form>
    </div>
  );
}

export default BrandEditor;
