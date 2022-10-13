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

const InvoiceSummary = ({sum}) => {
  const totalRoundedOff = Math.round(sum.Amount);
  const roundedOffDiff = sum.Amount - totalRoundedOff;

  const formatter = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 2,
  })

  return (
    <>
      <h1>Summary:</h1>
      <table>
        <tbody>
          <tr>
            <td>Base Total</td>
            <td>{formatter.format(sum.UnitPrice)}</td>
          </tr>
          {sum.Discount > 0 &&
            <tr>
              <td>Total After Discount</td>
              <td>{formatter.format(sum.UnitPrice - sum.Discount)} (-{formatter.format(sum.Discount)})</td>
            </tr>
          }
          {sum.GST > 0 &&
            <tr>
              <td>Total After Tax</td>
              <td>{formatter.format(sum.UnitPrice - (sum.Discount > 0 ? sum.Discount : 0) + sum.GST)} (+{formatter.format(sum.GST)})</td>
            </tr>
          }
          {(isNaN(roundedOffDiff) || roundedOffDiff !== 0) &&
            <tr>
              <td>Rounded Off</td>
              <td>{`${roundedOffDiff > 0 ? `(-) ${formatter.format(roundedOffDiff)}` : `(+) ${formatter.format(roundedOffDiff * -1)}`}`}</td>
            </tr>
          }
          <tr>
            <td>Grand Total</td>
            <td>{formatter.format(sum.Amount - (isNaN(roundedOffDiff) ? 0 : roundedOffDiff))}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default InvoiceSummary;
