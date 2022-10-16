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
import { getDiscountValue, getGSTValue, getAmount, currency } from './../../classes/item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const ItemTable = ({items, setItems, isInterstate, sum}) => {
  const handleEdit = (i) => {
    alert("coming soon; please delete and add item again");
  }

  const handleDelete = (item) => {
    setItems(items.filter(i => i.Id !== item.Id));
  }

  /* all the values will be calculated on runtime.
   * the database will only store the unit price
   * and gst/discount *percentages* and everything else
   * will be calculated on runtime. i.e the
   * database only store info required to re-produce
   * those same values shown to the user while creating the invoice
   */
  return (
    <>
      <table className={"item-table"}>
        <thead>
          <tr>
            <th>S. No</th>
            <th>Name</th>
            <th>Description</th>
            <th>Brand Name</th>
            <th>Quantity</th>
            <th>UOM</th>
            <th>Unit Price</th>
            <th>Discount (%)</th>
            {isInterstate
              ? <th>IGST (%)</th>
              : <>
                <th>SGST (%)</th>
                <th>CGST (%)</th>
              </>
            }
            <th>HSN</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((i, id) => (
            <tr key={id}>
              <td>{id+1}</td>
              <td className={i.Name === "" ? "empty" : ""}>{i.Name}</td>
              <td className={i.Description === "" ? "empty" : ""}>{i.Description}</td>
              <td className={i.Brand.Name === "" ? "empty" : ""}>{i.Brand.Name}</td>
              <td>{i.Quantity}</td>
              <td className={i.UnitOfMeasure === "" ? "empty" : ""}>{i.UnitOfMeasure}</td>
              <td className={i.UnitPrice > 0 ? "" : "empty"}>{currency(i.UnitPrice).format()}</td>
              <td className={i.DiscountPercentage > 0 ? "" : "empty"}>{getDiscountValue(i).format()} ({i.DiscountPercentage}%)</td>
              {isInterstate
                ? <td className={i.GSTPercentage > 0 ? "" : "empty"}>{getGSTValue(i).format()}</td>
                : <>
                      {getGSTValue(i).distribute(2).map((j, id) =>
                        <td key={`g-${id}`} className={i.GSTPercentage > 0 ? "" : "empty"}>{j.format()} ({currency(i.GSTPercentage).divide(2).value}%)</td>
                      )}
                </>
              }
              <td className={i.HSN === "" ? "empty" : ""}>{i.HSN}</td>
              <td>{getAmount(i).format()}</td>
              <td className={"buttons"}>
                <FontAwesomeIcon icon={faPencil} onClick={() => handleEdit(i)}/>
                <FontAwesomeIcon icon={faTrashCan} onClick={() => handleDelete(i)}/>
              </td>
            </tr>
          ))}
          <tr className={"total"}>
            <td>Total</td>
            <td className={"empty"}></td>
            <td className={"empty"}></td>
            <td className={"empty"}></td>
            <td className={sum.Quantity.value > 0 ? "" : "empty"}>{sum.Quantity.value}</td>
            <td className={"empty"}></td>
            <td className={sum.UnitPrice.value > 0 ? "" : "empty"}>{sum.UnitPrice.format()}</td>
            <td className={sum.Discount.value > 0 ? "" : "empty"}>{sum.Discount.format()}</td>
            {isInterstate
              ? <td className={sum.GST.value > 0 ? "" : "empty"}>{sum.GST.format()}</td>
              : <>
                    {sum.GST.distribute(2).map((i, id) =>
                      <td key={`g-${id}`} className={i.value > 0 ? "" : "empty"}>{i.format()}</td>
                    )}
              </>
            }
            <td className={"empty"}></td>
            <td className={sum.Amount.value > 0 ? "" : "empty"}>{sum.Amount.format()}</td>
            <td className={"buttons"}>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ItemTable;
