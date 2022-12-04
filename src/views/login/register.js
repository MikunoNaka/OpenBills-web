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

import './scss/login.scss';
import { User, validateEmail, validateUsername, validatePassword, saveUser } from '../../classes/user';
import { notificationConfig } from "./../../classes/notifications";

import { Store } from "react-notifications-component";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'


const RegisterPage = () => {
  const [user, setUser] = useState(new User());
  const [showPassword, setShowPassword] = useState(false);

  const validate = () =>
    validateUsername(user.UserName.trim()) &&
    validateEmail(user.Email) &&
    validatePassword(user.Password);

  const handleInput = ({target: {name, value}}) =>
    setUser(prev => ({...prev, [name]: value}));

  const handleSubmit = (e) => {
    e.preventDefault();
    saveUser(user, handleSuccess, handleError);
  }

  const handleSuccess = () => {
    Store.addNotification({
      title: "Created new account",
      message: `Welcome to OpenBills, ${user.UserName}!`,
      ...notificationConfig("default")
    });
  }

  const handleError = err => {
    Store.addNotification({
      title: "An error occoured",
      message: `Failed to create new account. ${err.message}`,
      ...notificationConfig("danger")
    });
  }

  return (
    <div className={"register-page-wrapper"}>
      <div className={"register-page"}>
        <h1>Sign Up To OpenBills</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              className={"wider"}
              name="UserName"
              type="text"
              value={user.UserName}
              onChange={handleInput}/>
          </label>
          <label>
            E-mail:
            <input
              className={"wider"}
              name="Email"
              type="text"
              value={user.Email}
              onChange={handleInput}/>
          </label>
          <label>
            Password:
            <span className={"input-with-icon"}>
              <input
                name="Password"
                type={showPassword ? "text" : "password"}
                value={user.Password}
                onChange={handleInput} />
              <FontAwesomeIcon
                icon={faEye}
                className={`icon ${showPassword ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(i => !i);
                }}/>
            </span>
          </label>
          <hr/>
          <div className={"buttons"}>
            <Link to="/login">
              <button>Log In Instead</button>
            </Link>
            <input type="submit" value="Sign Up" disabled={!validate()}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
