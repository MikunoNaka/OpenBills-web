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
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faPhone, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'

const ItemPicker = () => {
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

  return (
    <div className={"picker-wrapper"}>
      <p className={"heading"}>Add an Item</p>
      <div className={"item-picker"}>
        {items && items.length > 0 &&
          <>
            <label>
              Product/Service:
              <select value={item.Id ? item.Id : ""} onChange={handleItemSelect}>
                <option key="placeholder" value={""} disabled>Select an Item</option>
                {items.map(i =>
                  <option key={i.Id} value={i.Id}>{i.Name}{i.Brand.Id === null ? "" : " - " + i.Brand.Name}</option>
                )}
              </select>
            </label>
            <label>
              Description:
                <input
                  type="text"
                  value={item.Description}
                  name="Description"
                  onChange={handleInput} />
            </label>
            <label>
              Quantity:
                <input
                  type="number"
                  value={item.Quantity}
                  name="Quantity"
                  min={item.MinQuantity}
                  max={item.MaxQuantity}
                  onChange={handleInput} />
            </label>
            <label>
              Price:
                <input
                  type="number"
                  value={item.UnitPrice}
                  name="UnitPrice"
                  onChange={handleInput} />
            </label>
            <label>
              Discount %:
                <input
                  type="number"
                  value={item.DiscountPercentage}
                  name="DiscountPercentage"
                  onChange={handleInput} />
            </label>
            <label>
              HSN:
                <input
                  className={"narrow"}
                  type="text"
                  value={item.HSN}
                  name="HSN"
                  onChange={handleInput} />
            </label>
            <label>
              GST %:
                <input
                  type="number"
                  value={item.GSTPercentage}
                  name="GSTPercentage"
                  onChange={handleInput} />
            </label>
          </>
        }
      </div>
      <hr/>
    </div>
  );
}

export default ItemPicker;
