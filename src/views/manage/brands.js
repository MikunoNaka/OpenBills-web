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

import { useState, useEffect } from 'react';

import './scss/management-page.scss'
import { Brand, getAllBrands } from '../../classes/brand';
import BrandEditor from './../../components/editors/brand-editor';
import BrandTable from './../../components/tables/brand-table';

const ManageBrandsPage = () => {
  const [brandToEdit, setBrandToEdit] = useState(new Brand());
  const [allBrands, setAllBrands] = useState([]);
  // TODO: handle error
  const updateList = () =>
    getAllBrands(setAllBrands, () => {});

  useEffect(() => {
    updateList();
  }, []);

  return (
    <>
      <BrandEditor
        heading={"Add New Brand"}
        brand={new Brand()}
        callback={updateList}/>
      <hr/>
      <BrandTable
        refresh={updateList}
        brands={allBrands}
        setBrandToEdit={setBrandToEdit}/>

      {JSON.stringify(brandToEdit) !== JSON.stringify(new Brand()) &&
        <div className={"floating-wrapper"}>
          <BrandEditor
            className={"floating-window"}
            heading={`Edit ${brandToEdit.Name ? brandToEdit.Name : 'Brand'}:`}
            brand={brandToEdit}
            hide={() => setBrandToEdit(new Brand())}
            editing={true}
            callback={updateList}/>
        </div>
      }
    </>
  );
}

export default ManageBrandsPage;
