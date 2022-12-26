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

import PrintTable from "./table";
import "./scss/render.scss";

const RenderInvoice = ({ invoice }) => {
  return (
    <div className={"print-area"}>
      <div className={"invoice-headers"}>
        <div className={"issuer-details"}>
        </div>
        <div className={"recipient-details"}>
          <span>{invoice.Recipient.Name}</span>
          <span>{invoice.BillingAddress.Text}</span>
        </div>
      </div>

      <div>
        <PrintTable items={invoice.Items} isInterstate={false}/>
      </div>
    </div>
  );
}

export default RenderInvoice;
