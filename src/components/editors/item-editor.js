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

import { Item, saveItem } from './../../classes/item'
import { Brand, getAllBrands } from './../../classes/brand'
import './scss/item-editor.scss'

import { useState, useEffect } from 'react';

const ItemEditor = (props) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [HSN, setHSN]  = useState("");
  const [unit, setUnit] = useState("");
  const [unitPrice, setUnitPrice] = useState(0.00);
  const [gstP, setGSTP] = useState(0.00);
  const [minQty, setMinQty] = useState(0.00);
  const [maxQty, setMaxQty] = useState(0.00);
  const [brand, setBrand] = useState(new Brand());
  const [savedBrands, setSavedBrands] = useState([]);

  // get saved brands from API
  // needed by the brands dropdown menu
  useEffect(() => {
    // TODO: handle error
    getAllBrands(setSavedBrands, () => {});
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const item = new Item();
    item.Name = name;
    item.Description = desc;
    item.HSN = HSN;
    item.UnitOfMeasure = unit;
    item.UnitPrice = unitPrice;
    item.GSTPercentage = gstP;
    item.MinQuantity = minQty;
    item.MaxQuantity = maxQty;
    item.Brand = brand;

    // TODO: Save is for new items. implement modification too
    saveItem(item, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    clearAll();
    props.callback();
  }

  const handleFail = () => {
    alert("fail");
  }

  const handleBrandSelect = (e) => {
    const b = savedBrands.filter(i => i.Id === e.target.value )[0];
    setBrand(b ? b : new Brand());
  }

  const clearAll = () => {
    setName("");
    setDesc("");
    setHSN("");
    setUnit("");
    setUnitPrice(0.00);
    setGSTP(0.00);
    setMinQty(0.00);
    setMaxQty(0.00);
    setBrand(new Brand())
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
      <form onSubmit={handleSubmit} className={"editor"}>
        <label>
          Product/Service:
          <input
            type="text" name="name"
            value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Description:
          <input
            type="text" name="desc"
            value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>

        <label>
          HSN:
          <input
            type="text" name="hsn"
            value={HSN} onChange={(e) => setHSN(e.target.value)} />
        </label>

        <label>
          Unit of Measurement:
          <input
            type="text" name="unit"
            value={unit} onChange={(e) => setUnit(e.target.value)} />
        </label>

        <label>
          Unit Price:
          <input
            type="number" name="unitprice"
            value={unitPrice} onChange={(e) => validateFloatInput(e, setUnitPrice)} />
        </label>

        <label>
          GST %:
          <input
            type="number" name="gstp"
            value={gstP} onChange={(e) => validateFloatInput(e, setGSTP)} />
        </label>

        <label>
          Minimum Quantity:
          <input
            type="number" name="minqty"
            value={minQty} onChange={(e) => validateFloatInput(e, setMinQty)} />
        </label>

        <label>
          Maximum Quantity:
          <input
            type="number" name="maxqty"
            value={maxQty} onChange={(e) => validateFloatInput(e, setMaxQty)} />
        </label>

        <label>
          Brand:
          <select value={brand.Id ? brand.Id : ""} onChange={handleBrandSelect}>
            <option key="placeholder" value={""}>
              {brand.Id == null ? "Select a Brand (optional)" : "None"}
            </option>
            {savedBrands.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
          </select>
        </label>

        <span className={"buttons"}>
          <input type="button" value="Clear" onClick={clearAll}/>
          <input type="button" value="Cancel" onClick={handleCancel}/>
          <input type="submit" value="Save" />
        </span>
      </form>
    </div>
  );
}

export default ItemEditor;
