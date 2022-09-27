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

import { Brand, saveBrand } from './../../classes/brand'
import './scss/brand-editor.scss'

import { useState, useEffect } from 'react';

const BrandEditor = (props) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const brand = new Brand();
    brand.Name = name;

    // TODO: Save is for new brands. implement modification too
    saveBrand(brand, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    clearAll();
    props.callback();
  }

  const handleFail = () => {
    alert("fail");
  }

  const clearAll = () => {
    setName("");
  }

  const handleCancel = () => {
    // TODO: hide this component or something
    clearAll();
  }

  const validateFloatInput = (e, callback) => {
    const f = parseFloat(e.target.value);
    f && callback(f)
  }

  return (
    <div className={"editor-wrapper"}>
      <p>{props.heading}</p>
      <form onSubmit={handleSubmit} className={"editor brand-editor"}>
        <label>
          Brand Name:
          <input
            type="text" name="name"
            value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <span className={"buttons"}>
          <input type="button" value="Clear" onClick={clearAll}/>
          <input type="submit" value="Save" />
        </span>
      </form>
    </div>
  );
}

export default BrandEditor;
