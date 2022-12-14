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

import './scss/contact-editor.scss';

const ContactEditor = ({ heading, contact, setContact }) => {
  const splitMultiline = (value) => value.split("\n")
    .filter((i, id, arr) => id + 1 === arr.length || i !== "");

  const handleInput = (data) =>
    setContact(prev => ({...prev, ...data}));

  return (
    <div className={"contact-editor"}>
      <p className={"heading"}>{heading}</p>

      <div className={"labels-wrapper"}>
        <label>
          Contact Name:
          <input
            type="text" name="name"
            value={contact.Name} onChange={(e) => handleInput({Name: e.target.value})} />
        </label>

        <label>
          Website:
          <input
            type="text" name="name"
            value={contact.Website} onChange={(e) => handleInput({Website: e.target.value})} />
        </label>

        <label>
          Phone:
          <textarea
            type="text" name="name"
            value={contact.Phones.join('\n')}
            onChange={(e) => handleInput({Phones: splitMultiline(e.target.value)})} />
        </label>

        <label>
          E-mail:
          <textarea
            type="text" name="name"
            value={contact.Emails.join('\n')}
            onChange={(e) => handleInput({Emails: splitMultiline(e.target.value)})} />
        </label>
      </div>
    </div>
  );
}

export default ContactEditor;
