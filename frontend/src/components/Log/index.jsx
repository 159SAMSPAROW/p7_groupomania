import React, { useState } from 'react'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

const Log = (props) => {
  //hooks : permet de gérer l' état des composant modal
  const [signUpModal, setSignUpModal] = useState(props.signup)//useState permet de changer la valeur de la fonction setSign..modal
  const [signInModal, setSignInModal] = useState(props.signin)

  //fonction pour gérer les modals
  const handleModals = (e) => {
    if (e.target.id === 'signin') {
      setSignUpModal(false)
      setSignInModal(true)
    } else if (e.target.id === 'signup') {
      setSignUpModal(true)
      setSignInModal(false)
    }
  }
  return (
    <div className="connection_form">
      <div className="connection_form_container">
        <h1 className="connection_form_title">🖐️ BIENVENUE </h1>
        <div className="connection_form_btn">
          <button
            id="signin"
            onClick={handleModals}
            className={signInModal ? 'connection_form_btn_signin' : null}
          >
            Connexion
          </button>
          <br />
          <button
            id="signup"
            onClick={handleModals}
            className={signUpModal ? 'connection_form_btn_signup' : null}
          >
            Inscription
          </button>
        </div>

        <div>
          <img
            src="./img/icon.png"
            alt="logo"
            className="connection_form_logo"
          />
        </div>
      </div>
      {signUpModal && <SignUpForm />}
      {signInModal && <SignInForm />}
    </div>
  )//si signup = true affiche signUp modal
  //si signin = true affiche signIn modal
}

export default Log
