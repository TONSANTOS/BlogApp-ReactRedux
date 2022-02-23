import React from 'react'
import GoogleLogin from 'react-google-login'
import { useSelector, useDispatch } from 'react-redux'

import { selectSignedIn, setSignedIn, setUserData } from '../features/userSlice'

import './../styles/home.css'

export function Homepage() {
    const dispatch = useDispatch();

    const login = (response) => {
        console.log(response)
        dispatch(setSignedIn(true))
        dispatch(setUserData(response.profileObj))
    }

    const isSignedIn = useSelector(selectSignedIn)

    return (
        <div className="home__page" style={{ display: isSignedIn ? "none" : "" }}>
            {!isSignedIn && (
                <div className="login__message">
                    <h2>📗</h2>
                    <h1>Um lugar favorito dos leitores!</h1>
                    <p>
                        Oferecemos recursos online de alta qualidade para a leitura de blogs. Apenas assine
                        e comece a ler alguns blogs de qualidade.
                    </p>
                    <GoogleLogin
                        clientId="616581084183-7vrqr9njukn90d6uk12afekaubm03cep.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                className="login__button">
                                Faça login com o google
                            </button>
                        )}
                        onSuccess={login}
                        onFailure={login}
                        isSignedIn={true}
                        cookiePolicy={"single_host_origin"}
                    />
                </div>
            )}
        </div>
    )
}
