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

import { Contact } from './../../classes/client';
import './scss/contact-editor.scss';

const ContactEditor = (props) => {
  const handleInput = (field, event) => {
    const c = new Contact();
    const val = event.target.value;
    c.Name = field === "name" ? val : props.contact.Name;
    c.Website = field === "website" ? val : props.contact.Website;
    c.Phones = field === "phones"
      ? (val.length === 0 ? [] : val.split("\n"))
      : props.contact.Phones;
    c.Emails = field === "emails"
      ? (val.length === 0 ? [] : val.split("\n"))
      : props.contact.Emails;
    props.setContact(c);
  }

  return (
    <div className={"contact-editor"}>
      <p className={"heading"}>{props.heading}</p>

      <div className={"labels-wrapper"}>
        <label>
          Contact Name:
          <input
            type="text" name="name"
            value={props.contact.Name} onChange={(e) => handleInput("name", e)} />
        </label>

        <label>
          Website:
          <input
            type="text" name="name"
            value={props.contact.Website} onChange={(e) => handleInput("website", e)} />
        </label>

        <label>
          Phone:
          <textarea
            type="text" name="name"
            value={props.contact.Phones.length > 0
              ? props.contact.Phones.forEach(i => i)
              : ""
            }
            onChange={(e) => handleInput("phones", e)} />
        </label>

        <label>
          E-mail:
          <textarea
            type="text" name="name"
            value={props.contact.Emails.length > 0
              ? props.contact.Emails.forEach(i => i)
              : ""
            }
            onChange={(e) => handleInput("emails", e)} />
        </label>
      </div>
    </div>
  );
}

export default ContactEditor;
