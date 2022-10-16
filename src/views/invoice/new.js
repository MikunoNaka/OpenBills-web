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

import ClientPicker from '../../components/pickers/client-picker';
import ItemPicker from '../../components/pickers/item-picker';
import ItemTable from '../../components/tables/invoice-item-table';
import InvoiceSummary from '../../components/tables/invoice-summary';

import { InvoiceClient } from '../../classes/client';
import { calcSum, currency } from '../../classes/item';

import { useState, useEffect } from 'react';

const NewInvoicePage = () => {
  const [client, setClient] = useState(new InvoiceClient());
  const [shippingAddressId, setShippingAddressId] = useState(-1);
  const [items, setItems] = useState([]);
  //const [isInterstate, setIsInterstate] = useState(false);
  const isInterstate = false; // temporary
  const [sum, setSum] = useState({
    GST: currency(0),
    Discount: currency(0),
    UnitPrice: currency(0),
    Amount: currency(0),
    Quantity: currency(0)
  });

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
      <InvoiceSummary sum={sum} />
    </>
  );
}

export default NewInvoicePage;
