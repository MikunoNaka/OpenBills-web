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

import ClientPicker from '../../components/pickers/client-picker';
import ItemPicker from '../../components/pickers/item-picker';
import ItemTable from '../../components/tables/invoice-item-table';
import InvoiceSummary from '../../components/tables/invoice-summary';
import HeadersEditor from '../../components/editors/invoice-headers-editor';

import { InvoiceClient, Client } from '../../classes/client';
import { Transport, Invoice, saveInvoice } from '../../classes/invoice';
import { calcSum, currency } from '../../classes/item';

import { useState, useEffect } from 'react';

const NewInvoicePage = () => {
  const [client, setClient] = useState(new InvoiceClient());
  const [shippingAddressId, setShippingAddressId] = useState(-1);
  const [items, setItems] = useState([]);
  const [roundOffTotal, setRoundOffTotal] = useState(true); //TODO: load from config
  //const [isInterstate, setIsInterstate] = useState(false);
  const [transport, setTransport] = useState(new Transport());
  const [invoiceNumber, setInvoiceNumber] = useState("0"); // TODO: auto increment
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const isInterstate = false; // temporary
  const [sum, setSum] = useState({
    GST: currency(0),
    Discount: currency(0),
    UnitPrice: currency(0),
    Amount: currency(0),
    Quantity: currency(0)
  });

  const submitInvoice = () => {
    const invoice = new Invoice();
    invoice.InvoiceNumber = invoiceNumber;
    invoice.CreatedAt = invoiceDate;
    invoice.TotalAmount = sum.Amount;

    const recipient = new Client();
    recipient.Name = client.Name;
    recipient.Contact = client.Contact;
    recipient.GSTIN = client.GSTIN;
    recipient.BillingAddress = client.BillingAddress;
    invoice.Recipient = recipient;

    invoice.Paid = false; // TODO: set accordingly
    invoice.TransactionId = "" // TODO: set accordingly
    invoice.DiscountPercentage = 0;
    invoice.BillingAddress = client.BillingAddress;
    invoice.ShippingAddress = client.ShipTo;
    invoice.Items = items;
    invoice.Note = ""; // TODO: set accordingly
    invoice.Draft = false; // TODO: set accordingly

    saveInvoice(invoice, handleSuccess, handleFail);
  }

  const handleSuccess = () => {
    alert("yay");
  }

  const handleFail = () => {
    alert("fail");
  }

  useEffect(() => setShippingAddressId(-1), [client]);

  useEffect(() => setSum(calcSum(items)), [items]);

  return (
    <>
      <ClientPicker
        client={client}
        setClient={setClient}
        shippingAddressId={shippingAddressId}
        setShippingAddressId={setShippingAddressId}/>
      <ItemPicker
        invoiceItems={items}
        addInvoiceItem={(item) => setItems(prev => [...prev, item])} />
      <ItemTable
        items={items}
        setItems={setItems}
        isInterstate={isInterstate}
        sum={sum} />
      <div className={"two-col"}>
        <HeadersEditor
          roundOff={roundOffTotal}
          setRoundOff={setRoundOffTotal}
          transport={transport}
          setTransport={setTransport}
          invoiceNumber={invoiceNumber}
          setInvoiceNumber={setInvoiceNumber}
          date={invoiceDate}
          setDate={setInvoiceDate} />
        <div>
          <InvoiceSummary
            sum={sum}
            submit={submitInvoice}
            roundOff={roundOffTotal} />
        </div>
      </div>
    </>
  );
}

export default NewInvoicePage;
