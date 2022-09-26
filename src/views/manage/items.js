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

/* This page shows a list of all the items
 * with options to add/modify/delete items
 */

import { useState, useEffect } from 'react';

import { getAllItems } from '../../classes/item';
import ItemEditor from './../../components/editors/item-editor';
import ItemTable from './../../components/tables/item-table';

const ManageItemsPage = () => {
  const [allItems, setAllItems] = useState([]);
  // TODO: handle error
  const updateList = () =>
    getAllItems(setAllItems, () => {});

  useEffect(() => {
    updateList();
  }, []);

  return (
    <>
      <ItemEditor callback={updateList}/>
      <ItemTable refresh={updateList} items={allItems}/>
    </>
  );
}

export default ManageItemsPage;
