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

  // when an item is selected, set its quantity to item.MinQuantity
  useEffect(() => {
    if (item.Id != null) {
      setItem(prevItem => ({...prevItem, Quantity: prevItem.MinQuantity}))
    }
  }, [item.Id])

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
      [name]: `${value}`
    }));
  }

  const validate = () => {
    if (!isNumeric(item.Quantity) || !isNumeric(item.DiscountPercentage)
        || !isNumeric(item.GSTPercentage) || !isNumeric(item.UnitPrice)) {
      return false;
    }
    if (item.Id === null) {
      return false;
    }
    if (!item.UnitPrice > 0) {
      return false;
    }
    if (!item.Quantity > 0) {
      return false;
    }
    if (item.Quantity < item.MinQuantity) {
      return false;
    }
    if (item.MaxQuantity > 0 && item.Quantity > item.MaxQuantity) {
      return false;
    }
    if (item.DiscountPercentage > 100 || item.DiscountPercentage < 0
        || item.GSTPercentage > 100 || item.GSTPercentage < 0) {
      return false;
    }
    return true;
  }

  // add item to the invoice items list
  const addItem = (e) => {
    e.preventDefault();
    if (validate()) {
      addInvoiceItem(item);
      setItem(new InvoiceItem());
    }
  }

  const isNumeric = (i) => !isNaN(i) && !isNaN(parseFloat(i));

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
                    {i.Name}{i.Brand.Id === undefined ? "" : " - " + i.Brand.Name}
                  </option>
                )}
              </select>
            </label>
            <label className={"narrow"}>
              Quantity:
                <input
                  type="number"
                  className={((!isNumeric(item.Quantity) || (item.MaxQuantity > 0 && item.Quantity > item.MaxQuantity) || (item.Quantity < item.MinQuantity))) ? "warning" : ""}
                  step="0.01"
                  value={item.Quantity}
                  name="Quantity"
                  max={item.MaxQuantity > 0 ? item.MaxQuantity : null}
                  onChange={handleInput} />
            </label>
            <label className={"narrow"}>
              Price:
                <input
                  type="number"
                  className={(!isNumeric(item.UnitPrice) || item.UnitPrice < 0) ? "warning" : ""}
                  step="0.01"
                  value={item.UnitPrice}
                  name="UnitPrice"
                  onChange={handleInput} />
            </label>
            <label className={"narrow"}>
              Discount %:
                <input
                  type="number"
                  className={(!isNumeric(item.DiscountPercentage) || item.DiscountPercentage < 0 || item.DiscountPercentage > 100) ? "warning" : ""}
                  max="100"
                  min="0"
                  step="0.1"
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
                  step="0.01"
                  className={(!isNumeric(item.GSTPercentage) || item.GSTPercentage < 0 || item.GSTPercentage > 100) ? "warning" : ""}
                  max="100"
                  min="0"
                  value={item.GSTPercentage}
                  name="GSTPercentage"
                  onChange={handleInput} />
            </label>
            <input
              type="submit"
              value="Add"
              disabled={!validate()} />
          </> :
          <Link to="/manage/items">
            <input type="button" value="Add Items" />
          </Link>
        }
      </form>
      <hr/>
    </div>
  );
}

export default ItemPicker;
