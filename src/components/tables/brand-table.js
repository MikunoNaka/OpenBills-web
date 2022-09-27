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

import './scss/brand-table.scss';
import { deleteBrand } from './../../classes/brand';

const BrandTable = (props) => {
  const handleEdit = (i) => {
    alert("editing coming soon")
  }

  const handleDelete = (b) => {
    // TODO: add confirmation prompt
    deleteBrand(b.Id, handleDelSuccess, handleDelFail);
  }

  const handleDelSuccess = () => {
    props.refresh();
  }

  const handleDelFail = () => {
    alert("fail")
  }

  return (
    <div className={"brand-table"}>
      {props.brands && props.brands.map(i =>
        <div className={"brand"}>
          <p className={"brand-name"}>{i.Name}</p>
          <div className={"buttons"}>
            <input type="button" value="Edit" onClick={() => handleEdit(i)}/>
            <input type="button" value="Delete" onClick={() => handleDelete(i)}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default BrandTable;
