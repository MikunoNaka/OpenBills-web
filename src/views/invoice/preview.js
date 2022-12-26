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

import "./scss/invoice.scss";

import { notificationConfig } from "./../../classes/notifications";
import { Invoice, getInvoice } from "../../classes/invoice";
import RenderInvoice from "../../components/invoice/render";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Store } from "react-notifications-component";

const PreviewInvoice= () => {
  const [urlParams] = useSearchParams();
  const invoiceId = urlParams.get("invoice_id");
  const [invoice, setInvoice] = useState(new Invoice());


  const handleSuccess = res => {
    setInvoice(res.data);
  }

  const handleFail = err => {
    Store.addNotification({
      title: "Error while getting Invoice.",
      message: err.message,
      ...notificationConfig("danger")
    });
    console.log(err);
  }

  const getData = () =>
    getInvoice(invoiceId, handleSuccess, handleFail);

  useState(() => getData(), [invoiceId]);

  //useEffect(_ => {
  //  const user = urlParams.get("user");
  //  if (user && user !== "") setUser(prev => ({...prev, UserName: user}));
  //}, [urlParams]);

  return (
    <>
      <RenderInvoice
        invoice={invoice} />
    </>
  );
}

export default PreviewInvoice;
