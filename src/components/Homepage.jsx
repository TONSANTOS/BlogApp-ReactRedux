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
        dispatch(setUserData(response.profileObj)) // Definindo dados do usuário e obetendo objeto de perfil
    }

    const isSignedIn = useSelector(selectSignedIn) // Verificar se se o usuário não está conectado

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
                        clientId="616581084183-7vrqr9njukn90d6uk12afekaubm03cep.apps.googleusercontent.com" // Gerado pelo google cloud
                        render={(renderProps) => (
                            <button onClick={renderProps.onClick}
                                disabled={renderProps.disabled} // Assim que o login for feito o botão será desabilitado
                                className="login__button">
                                Faça login com o google
                            </button>
                        )}
                        onSuccess={login} // Em caso de sucesso o google permite o login
                        onFailure={login} // Em caso de falha o login não fará nada
                        isSignedIn={true} // Se está conectado igual a true, isso fará com que o usuário faça login mesmo se ele estiver cortado a página inicial
                        cookiePolicy={"single_host_origin"} // Armazenando como cookie, irá armazenar no armazenamento local
                    />
                </div>
            )}
        </div>
    )
}
