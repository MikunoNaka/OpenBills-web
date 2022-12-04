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

import './scss/management-page.scss';
import { Client, getAllClients } from '../../classes/client';
import ClientEditor from './../../components/editors/client-editor';
import ClientTable from './../../components/tables/client-table';
import { notificationConfig } from "./../../classes/notifications";

const ManageClientsPage = () => {
  const [clientToEdit, setClientToEdit] = useState(new Client());
  const [allClients, setAllClients] = useState([]);
  // TODO: handle error
  const updateList = () =>
    getAllClients(setAllClients, err => {
      Store.addNotification({
        title: "Error while getting Clients list.",
        message: err.message,
        ...notificationConfig("danger")
      });
    });

  useEffect(() => {
    updateList();
  }, []);

  return (
    <>
      <ClientEditor
        heading={"Add New Client"}
        client={new Client()}
        successCallback={updateList}/>
      <hr/>
      <ClientTable
        refresh={updateList}
        clients={allClients}
        setClientToEdit={setClientToEdit}/>

      {JSON.stringify(clientToEdit) !== JSON.stringify(new Client()) &&
        <div className={"floating-wrapper"}>
          <ClientEditor
            className={"floating-window"}
            heading={`Edit ${clientToEdit.Name ? clientToEdit.Name : 'Client'}:`}
            client={clientToEdit}
            hide={() => setClientToEdit(new Client())}
            editing={true}
            callback={updateList}/>
        </div>
      }
    </>
  );
}

export default ManageClientsPage;
