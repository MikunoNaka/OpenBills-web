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

import { getDiscountValue, getGSTValue, getAmount, currency, calcSum } from './../../classes/item';

const PrintTable = ({ items, isInterstate }) => {
  const sum = calcSum(items);
  return (
    <>
      <table className={"print-table"}>
        <thead>
          <tr>
            <th>NO</th>
            <th>NAME</th>
            <th>BRAND</th>
            <th>QTY</th>
            <th>UNIT PRICE</th>
            <th>DISCOUNT</th>
            {isInterstate
              ? <th>IGST</th>
              : <>
                <th>SGST</th>
                <th>CGST</th>
              </>
            }
            <th>HSN</th>
            <th>AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {items && items.map((i, id) => (
            <tr key={id}>
              <td>{id+1}</td>
              <td>
                <span className={"leveled-td"}>
                  <span>{i.Name}</span>
                  <span className={"subscript"}>{i.Description}</span>
                </span>
              </td>
              <td>{i.Brand.Name}</td>
              <td>
                <span className={"leveled-td"}>
                  <span>{i.Quantity}</span>
                  <span className={"subscript"}>{i.UnitOfMeasure}</span>
                </span>
              </td>
              <td>{currency(i.UnitPrice).format()}</td>
              <td>
                <span className={"leveled-td"}>
                  <span>{getDiscountValue(i).format()}</span>
                  <span className={"subscript"}>({i.DiscountPercentage}%)</span>
                </span>
              </td>
              {isInterstate
                ? <td>{getGSTValue(i).format()}</td>
                : <>
                      {getGSTValue(i).distribute(2).map((j, id) =>
                        <td key={`g-${id}`}>
                          <span className={"leveled-td"}>
                            <span>{j.format()}</span>
                            <span className={"subscript"}>({currency(i.GSTPercentage).divide(2).value}%)</span>
                          </span>
                        </td>
                      )}
                </>
              }
              <td>{i.HSN}</td>
              <td>{getAmount(i).format()}</td>
            </tr>
          ))}
          <tr className={"total"}>
            <td>Total</td>
            <td></td>
            <td></td>
            <td>{sum.Quantity.value}</td>
            <td>{sum.UnitPrice.format()}</td>
            <td>{sum.Discount.format()}</td>
            {isInterstate
              ? <td>{sum.GST.format()}</td>
              : <>
                    {sum.GST.distribute(2).map((i, id) =>
                      <td key={`g-${id}`}>{i.format()}</td>
                    )}
              </>
            }
            <td></td>
            <td>{sum.Amount.format()}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default PrintTable;
