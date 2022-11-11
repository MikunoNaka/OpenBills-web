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
import { deleteInvoice } from './../../classes/invoice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const InvoiceTable = (props) => {
  const handleEdit = (i) => {
    props.setInvoiceToEdit(i)
  }

  const handleDelete = (i) => {
    // TODO: add confirmation prompt
    deleteInvoice(i.Id, handleDelSuccess, handleDelFail);
  }

  const handleDelSuccess = () => {
    props.refresh();
  }

  const handleDelFail = () => {
    alert("fail")
  }

  return (
    <table className={"item-table"}>
      <thead>
        <tr>
          <th>S. No</th>
          <th>Invoice Number</th>
          <th>Recipient Name</th>
          <th>Date Created</th>
          <th>Date Last Updated</th>
          <th>Total Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.items && props.items.map((i, id) => (
          <tr key={id}>
            <td>{id+1}</td>
            <td>{i.InvoiceNumber}</td>
            <td>{i.Recipient.Name}</td>
            <td>{i.CreatedAt}</td>
            <td>{i.UpdatedAt}</td>
            <td>{i.TotalAmount}</td>
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

export default InvoiceTable;
