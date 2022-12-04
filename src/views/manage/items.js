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
import { Store } from "react-notifications-component";

import './scss/management-page.scss'
import { Item, getAllItems } from '../../classes/item';
import ItemEditor from './../../components/editors/item-editor';
import ItemTable from './../../components/tables/item-table';
import { notificationConfig } from "./../../classes/notifications";

const ManageItemsPage = () => {
  const [itemToEdit, setItemToEdit] = useState(new Item());
  const [allItems, setAllItems] = useState([]);

  const updateList = () =>
    getAllItems(setAllItems, err => {
      Store.addNotification({
        title: "Error while getting Items list.",
        message: err.message,
        ...notificationConfig("danger")
      });
    });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <>
      <ItemEditor
        heading={"Add New Item"}
        item={new Item()}
        callback={updateList}/>
      <hr/>
      <ItemTable
        refresh={updateList}
        items={allItems}
        setItemToEdit={setItemToEdit}/>

      {JSON.stringify(itemToEdit) !== JSON.stringify(new Item()) &&
        <div className={"floating-wrapper"}>
          <ItemEditor
            className={"floating-window"}
            heading={`Edit ${itemToEdit.Name ? itemToEdit.Name : 'Item'}:`}
            item={itemToEdit}
            hide={() => setItemToEdit(new Item())}
            editing={true}
            callback={updateList}/>
        </div>
      }
    </>
  );
}

export default ManageItemsPage;
