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

import './scss/table.scss';
import { deleteItem } from './../../classes/item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const ItemTable = ({items, setItems}) => {
  const handleEdit = (i) => {
    alert("coming soon; please delete and add item again");
  }

  const handleDelete = (item) => {
    setItems(items.filter(i => i.Id !== item.Id));
  }

  /* TODO: all the math should be done here
   * i.e CGST, IGST, total price (i.e price x quantity)
   * discount/gst value (i.e number instead of percentage)
   *
   * the total cost and the like may be handled by
   * parent component since they are needed
   * by other things (probably)
   *
   * all the values will be calculated on runtime.
   * the database will only store the unit price
   * and gst/discount *percentages* and everything else
   * will be calculated on runtime. i.e the
   * database only store info required to re-produce
   * those same values shown to the user while creating the invoice
   */
  return (
    <table>
      <thead>
        <tr>
          <th>S. No</th>
          <th>Name</th>
          <th>Description</th>
          <th>Brand Name</th>
          <th>UOM</th>
          <th>HSN</th>
          <th>Unit Price</th>
          <th>GST %</th>
          {/* TODO: CGST, IGST, etc */}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items && items.map((i, id=id+1) => (
          <tr key={id}>
            <td>{id+1}</td>
            <td className={i.Name === "" ? "empty" : ""}>{i.Name}</td>
            <td className={i.Description === "" ? "empty" : ""}>{i.Description}</td>
            <td className={i.Brand.Name === "" ? "empty" : ""}>{i.Brand.Name}</td>
            <td className={i.UnitOfMeasure === "" ? "empty" : ""}>{i.UnitOfMeasure}</td>
            <td className={i.HSN === "" ? "empty" : ""}>{i.HSN}</td>
            <td className={i.UnitPrice === 0.0 ? "empty" : ""}>{i.UnitPrice}</td>
            <td className={i.GSTPercentage === 0.0 ? "empty" : ""}>{i.GSTPercentage}</td>
            <td className={"buttons"}>
              <FontAwesomeIcon icon={faPencil} onClick={() => handleEdit(i)}/>
              <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(i)}/>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemTable;
