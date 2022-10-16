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

import './scss/summary.scss';
import { currency } from '../../classes/item';

const InvoiceSummary = ({sum, roundOff}) => {
  const totalRoundedOff = currency(sum.Amount !== undefined ? Math.round(sum.Amount.value) : 0.00);
  const roundedOffDiff = sum.Amount !== undefined && roundOff ? sum.Amount.subtract(totalRoundedOff) : currency(0.00);

  return (
    <>
      <h1>Summary:</h1>
      <table className={"summary-table"}>
        <tbody>
          {sum.UnitPrice !== undefined &&
            <tr>
              <td>Base Total</td>
              <td>{sum.UnitPrice.format()}</td>
            </tr>
          }
          {sum.Discount !== undefined && sum.Discount.value > 0 &&
            <tr>
              <td>Total After Discount</td>
              <td>{sum.UnitPrice.subtract(sum.Discount).format()} (-{sum.Discount.format()})</td>
            </tr>
          }
          {sum.GST !== undefined && sum.GST.value > 0 &&
            <tr>
              <td>Total After Tax</td>
              <td>{sum.UnitPrice.subtract(sum.Discount.value > 0 ? sum.Discount : currency(0)).add(sum.GST).format()} (+{sum.GST.format()})</td>
            </tr>
          }
          {roundedOffDiff.intValue !== 0 &&
            <tr>
              <td>Rounded Off</td>
              <td>{`${roundedOffDiff.value > 0 ? `(-) ${roundedOffDiff.format()}` : `(+) ${roundedOffDiff.multiply(-1).format()}`}`}</td>
            </tr>
          }
          {sum.Amount !== undefined &&
            <tr>
              <td>Grand Total</td>
              <td>{sum.Amount.subtract(roundedOffDiff).format()}</td>
            </tr>
          }
        </tbody>
      </table>
    </>
  );
}

export default InvoiceSummary;
