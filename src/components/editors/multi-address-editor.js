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

import AddressEditor from './address-editor';

const MultiAddressEditor = ({addresses, setAddresses, setShipToBillingAddress}) => {
  console.log(addresses)
  const handleChange = (id, data) => {
    const newAddresses = [...addresses];
    newAddresses[id] = {
      ...newAddresses[id], ...data
    }
    setAddresses(newAddresses)
  }

  const handleDelete = (id) => {
    // deleting the last address sets
    // shipToBillingAddress to true
    if (addresses.length === 1) {
      setShipToBillingAddress(true);
    } else {
      setAddresses([
        ...addresses.slice(0, id),
        ...addresses.slice(id+1)
      ]);
    }
  }

  return (
    <>
      {addresses.map((i, id) =>
        <AddressEditor
          key={id}
          heading={`Shipping Address ${addresses.length === 1 ? '' : id + 1}`}
          address={i}
          deleteAddress={() => handleDelete(id)}
          setAddress={(data) => {handleChange(id, data)}} />
      )}
    </>
  );
}

export default MultiAddressEditor;
