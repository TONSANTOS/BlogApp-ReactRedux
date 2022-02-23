import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar } from '@material-ui/core'
import { GoogleLogout } from 'react-google-login'

import { selectSignedIn, selectUserData, setInput, setSignedIn, setUserData } from '../features/userSlice'

import './../styles/navbar.css'

export function Navbar() {
    const [inputValue, setInputValue] = useState("tech")

    const isSignedIn = useSelector(selectSignedIn)
    const userDate = useSelector(selectUserData)

    const dispatch = useDispatch()

    const logout = (response) => {
        dispatch(setSignedIn(false))
        dispatch(setUserData(null))
    }

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setInput(inputValue))
    }

    function handleKeyPress(e) {
        var key = e.keyCode || e.which;
        if (key == 13) {
            dispatch(setInput(inputValue))
        }
    }

    return (
        <div className="navbar">
            <h1 className="navbar__header">BlogMania 💬</h1>
            {isSignedIn && (
                <div className="blog__search">
                    <input
                        onKeyPress={(e) => handleKeyPress(e)}
                        id="keywords"
                        name="keywords"
                        className="search"
                        placeholder="Procure um blog"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        type="text"
                    />
                    <button className="submit" onClick={handleSearch}>Procurar</button>
                </div>
            )}

            {isSignedIn ? (
                <div className="navbar__user__data">
                    <Avatar className="user" src={userDate?.imageUrl} alt={userDate?.name} />
                    <h1 className="signedIn">{userDate?.givenName}</h1>
                    <GoogleLogout
                        clientId="616581084183-7vrqr9njukn90d6uk12afekaubm03cep.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="logout__button"
                            >
                                Logout 😦
                            </button>
                        )}
                        onLogoutSuccess={logout}
                    />
                </div>
            ) : <h1 className="notSignedIn">Usuário não disponível 😞</h1>}
        </div>
    )
}
