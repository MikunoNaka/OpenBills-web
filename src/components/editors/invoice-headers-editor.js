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

import './scss/invoice-headers.scss';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const InvoiceHeadersEditor = ({roundOff, setRoundOff, transport, setTransport, invoiceNumber, setInvoiceNumber, date, setDate}) => {
  // show transport details menu
  const [showTPMenu, setShowTPMenu] = useState(false);
  const [showAdditionalMenu, setShowAdditionalMenu] = useState(false);

  const handleInput = e => {
    const { name, value } = e.target;

    if (name.includes("Transporter.")) {
      const n = name.split(".")[1];
      const transporter = transport.Transporter;
      transporter[n] = value;

      setTransport(prev => ({
        ...prev,
        Transporter: transporter,
      }));
    } else {
      setTransport(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }

  return (
    <div className={"invoice-headers-editor"}>
      <h1>Invoice Options:</h1>
      <div className={"wrapper"}>
        <div>
          <label className={"checkbox-label"}>
            <input
              type="checkbox"
              onChange={() => setRoundOff(prev => !prev)}
              checked={roundOff}/>
            Round off the Total
          </label>

          <label>
            Apply Discount On All Items:
            <input
              className={"small"}
              type="number"
              min="0"
              max="100"
              step="0.1" />
          </label>

          <p onClick={() => setShowTPMenu(i => !i)}>
            <strong>
              Transport Details <FontAwesomeIcon
                icon={faChevronDown}
                className={`dropdown-icon ${showTPMenu ? "open" : "closed"}`} />
            </strong>
          </p>
          <hr/>
          {showTPMenu &&
            <div className={"dropdown-div"}>
              <label>
                Vehicle Number:
                <input
                  name="VehicleNum"
                  value={transport.VehicleNum}
                  onChange={handleInput}
                  type="text"/>
              </label>

              <label>
                Transport Method:
                <input
                  name="TransportMethod"
                  value={transport.TransportMethod}
                  onChange={handleInput}
                  type="text"/>
              </label>

              <label>
                Transporter Name:
                <input
                  name="Transporter.Name"
                  value={transport.Transporter.Name}
                  onChange={handleInput}
                  type="text"/>
              </label>

              <label>
                Transporter GSTIN:
                <input
                  name="Transporter.GSTIN"
                  value={transport.Transporter.GSTIN}
                  onChange={handleInput}
                  type="text"/>
              </label>

              <label>
                Transporter ID:
                <input
                  name="Transporter.TransporterId"
                  value={transport.Transporter.TransporterId}
                  onChange={handleInput}
                  type="text"/>
              </label>

              <label>
                Delivery Note:
                <textarea
                  name="Note"
                  value={transport.Note}
                  onChange={handleInput} />
              </label>
            </div>
          }
          <p onClick={() => setShowAdditionalMenu(i => !i)}>
            <strong>
              Additional Details <FontAwesomeIcon
                icon={faChevronDown}
                className={`dropdown-icon ${showAdditionalMenu ? "open" : "closed"}`} />
            </strong>
          </p>
          <hr/>
          {showAdditionalMenu &&
            <div className={"dropdown-div"}>
              <label>
                Placeholder:
                <input
                  //name="VehicleNum"
                  //value={transport.VehicleNum}
                  //onChange={handleInput}
                  type="text"/>
              </label>
            </div>
          }
        </div>
        <div>
          <label>
            Invoice Number:
            <input
              type="text"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)} />
          </label>
          <label>
            Invoice Date:
          </label>
        </div>
      </div>
    </div>
  )
}

export default InvoiceHeadersEditor;
