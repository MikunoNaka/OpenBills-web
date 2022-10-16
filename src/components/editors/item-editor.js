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

import { Item, saveItem, editItem } from './../../classes/item';
import { Brand, getAllBrands } from './../../classes/brand';
import './scss/item-editor.scss';

import { useState, useEffect } from 'react';

const ItemEditor = (props) => {
  const [name, setName] = useState(props.item.Name);
  const [desc, setDesc] = useState(props.item.Description);
  const [HSN, setHSN]  = useState(props.item.HSN);
  const [unit, setUnit] = useState(props.item.UnitOfMeasure);
  const [unitPrice, setUnitPrice] = useState(props.item.UnitPrice);
  const [gstP, setGSTP] = useState(props.item.GSTPercentage);
  const [minQty, setMinQty] = useState(props.item.MinQuantity > 0 ? props.item.MinQuantity : 1);
  const [maxQty, setMaxQty] = useState(props.item.MaxQuantity);
  const [brand, setBrand] = useState(props.item.Brand);
  const [savedBrands, setSavedBrands] = useState([]);
  const [hasDecimalQty, setHasDecimalQty] = useState(props.item.HasDecimalQuantity);

  // get saved brands from API
  // needed by the brands dropdown menu
  useEffect(() => {
    // TODO: handle error
    getAllBrands(setSavedBrands, () => {});
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();

    const minQuantity = parseFloat(minQty)
    const maxQuantity = parseFloat(maxQty)

    // show error if minQty > maxQty
    if (maxQuantity > 0) {
      if (minQuantity > maxQuantity) {
        // TODO: handle error
        console.log("shiat")
        return
      }
    }

    const item = new Item();
    item.Id = props.item.Id;
    item.Name = name;
    item.Description = desc;
    item.HSN = HSN;
    item.UnitOfMeasure = unit;
    item.UnitPrice = parseFloat(unitPrice);
    item.GSTPercentage = parseFloat(gstP);
    item.MinQuantity = minQuantity;
    item.MaxQuantity = maxQuantity;
    item.Brand = brand;
    item.HasDecimalQuantity = hasDecimalQty;

    // TODO: Save is for new items. implement modification too
    props.editing
      ? editItem(item, handleSuccess, handleFail)
      : saveItem(item, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    clearAll();
    props.callback();
    props.editing && props.hide();
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
    clearAll();
    props.editing && props.hide();
  }

  return (
    <div className={`editor-wrapper ${props.className ? props.className : ''}`}>
      <p>{props.heading}</p>
      <form onSubmit={handleSubmit} className={"editor"}>
        <label>
          Product/Service:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </label>

        <label>
          Description:
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)} />
        </label>

        <label>
          HSN:
          <input
            type="text"
            value={HSN}
            onChange={(e) => setHSN(e.target.value)} />
        </label>

        <label>
          Unit of Measurement:
          <input
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)} />
        </label>

        <label>
          Unit Price:
          <input
            type="number"
            value={unitPrice}
            min="0"
            onChange={(e) => setUnitPrice(e.target.value)} />
        </label>

        <label>
          GST %:
          <input
            type="number"
            value={gstP}
            min="0"
            onChange={(e) => setGSTP(e.target.value)} />
        </label>

        <label>
          Minimum Quantity:
          <input
            type="number"
            value={minQty === 0 ? "" : minQty}
            min="0"
            onChange={(e) => setMinQty(e.target.value)} />
        </label>

        <label>
          Maximum Quantity:
          <input
            type="number"
            value={maxQty === 0 ? "" : maxQty}
            min="0"
            onChange={(e) => setMaxQty(e.target.value)} />
        </label>

        {savedBrands && savedBrands.length > 0 &&
        <label>
          Brand:
          <select value={brand.Id ? brand.Id : ""} onChange={handleBrandSelect}>
            <option key="placeholder" value={""}>
              {brand.Id == null ? "Select a Brand (optional)" : "None"}
            </option>
            {savedBrands.map(i => <option key={i.Id} value={i.Id}>{i.Name}</option>)}
          </select>
        </label>
        }

        <label className={"checkbox-label"}>
          <input
            type="checkbox"
            checked={hasDecimalQty}
            onChange={() => setHasDecimalQty(i => !i)} />
          Quantity may contain decimal places
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
