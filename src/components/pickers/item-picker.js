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

import { Item, InvoiceItem, getAllItems } from '../../classes/item';
import './scss/item-picker.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'

const ItemPicker = ({invoiceItems, addInvoiceItem}) => {
  const [items, setItems] = useState([new Item()]);
  const [item, setItem] = useState(new InvoiceItem());

  useEffect(() => refreshItems, []);

  const refreshItems = () =>
    getAllItems(setItems, () => {});

  const handleItemSelect = e => {
    const i = items.find(i => i.Id === e.target.value);
    setItem(prevItem => i ? ({...prevItem, ...i}) : new InvoiceItem());
  }

  const handleInput = e => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value
    }));
  }

  // add item to the invoice items list
  const addItem = (e) => {
    e.preventDefault();
    addInvoiceItem(item);
    setItem(new InvoiceItem());
  }

  // input elements are sorted on the basis of
  // how likely they are going to be edited
  return (
    <div className={"picker-wrapper"}>
      <p className={"heading"}>Add an Item</p>
      <form className={"item-picker"} onSubmit={addItem}>
        {items.length > 0 ?
          <>
            <label>
              Product/Service:
              <select value={item.Id ? item.Id : ""} onChange={handleItemSelect}>
                <option key="placeholder" value={""} disabled>Select an Item</option>
                {items.map(i =>
                  <option key={i.Id} value={i.Id} disabled={invoiceItems.some(j => j.Id === i.Id)}>
                    {i.Name}{i.Brand.Id === null ? "" : " - " + i.Brand.Name}
                  </option>
                )}
              </select>
            </label>
            <label className={"narrow"}>
              Quantity:
                <input
                  type="number"
                  value={item.Quantity}
                  name="Quantity"
                  min={item.MinQuantity}
                  max={item.MaxQuantity}
                  onChange={handleInput} />
            </label>
            <label className={"narrow"}>
              Price:
                <input
                  type="number"
                  value={item.UnitPrice}
                  name="UnitPrice"
                  onChange={handleInput} />
            </label>
            <label className={"narrow"}>
              Discount %:
                <input
                  type="number"
                  value={item.DiscountPercentage}
                  name="DiscountPercentage"
                  onChange={handleInput} />
            </label>
            <label>
              Description:
                <input
                  type="text"
                  value={item.Description}
                  name="Description"
                  onChange={handleInput} />
            </label>
            <label className={"narrow"}>
              HSN:
                <input
                  type="text"
                  value={item.HSN}
                  name="HSN"
                  onChange={handleInput} />
            </label>
            <label className={"narrow"}>
              GST %:
                <input
                  type="number"
                  value={item.GSTPercentage}
                  name="GSTPercentage"
                  onChange={handleInput} />
            </label>
            <input type="submit" value="Add"/>
          </> :
          <Link to="/manage/items">
            <input type="button" value="Add Items"/>
          </Link>
        }
      </form>
      <hr/>
    </div>
  );
}

export default ItemPicker;
