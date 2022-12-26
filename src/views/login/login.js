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
import { User, login } from '../../classes/user';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'

const LoginPage = () => {
  const [user, setUser] = useState(new User());
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // read username from params and populate input box
  const [urlParams] = useSearchParams();
  useEffect(_ => {
    const user = urlParams.get("user");
    if (user && user !== "") setUser(prev => ({...prev, UserName: user}));
  }, [urlParams]);

  const validate = () => {
    if (user.UserName.trim() === "") return false;
    if (user.Password.length < 8) return false;
    return true;
  }

  const handleInput = ({target: {name, value}}) =>
    setUser(prev => ({...prev, [name]: value}));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) login(user, handleSuccess, handleError);
  }

  // for some reason pressing enter on the from clicks the /register link
  const handleEnter = e => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleSubmit(e);
    }
  }

  const handleSuccess = (res) => {
    localStorage.setItem("accessToken", res.data.accessToken)
    navigate("/")
  }

  const handleError = (err) => {
    console.log(err)
    alert("fail")
  }

  return (
    <div className={"login-page-wrapper"}>
      <div className={"login-page"}>
        <h1>Welcome To OpenBills!</h1>
        <p>You are not logged in.</p>
        <form onSubmit={handleSubmit} onKeyDown={handleEnter}>
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
            <button onClick={_ => navigate("/register")}>Create Account</button>
            <input type="submit" value="Log In" disabled={!validate()}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
