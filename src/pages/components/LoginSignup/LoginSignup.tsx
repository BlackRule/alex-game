import styles from './LoginSignup.module.scss'

import React, {useRef, useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../../firebase.ts'
import {NavLink, useNavigate} from 'react-router-dom'
import {Alert, Button, TextField} from '@mui/material'
import {useStore} from '../../../store.ts'
import {translation} from '../../../translation.ts'
import {createUserWithEmailAndPassword} from '../../../service.ts'
import { sendPasswordResetEmail } from 'firebase/auth'

const LoginSignup = (props:{type:'signIn'|'signUp'}) => {
  const navigate = useNavigate()
  const emailField=useRef<HTMLInputElement|null>(null)
  const [password, setPassword] = useState('')
  const language = useStore((state) => state.language)
  const [error, setError] = useState<null|string>(null)
  const onSubmit = async (e) => {
    e.preventDefault()
    const email=emailField.current?.value??''
    let r
    switch(props.type) {
    case 'signIn':
      r=signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user
          navigate('/')
        })
      break
    case 'signUp':
      r=createUserWithEmailAndPassword(email, password).then(() => {
        navigate('/login')
      })
    }
    r.catch((error_) => {
      switch (error_.code) {
      case 'auth/invalid-login-credentials':
        setError(translation[language]['auth/invalid-login-credentials'])
        break
      case 'auth/email-already-in-use':
        setError(translation[language]['auth/email-already-in-use'])
        break
      default:
        setError(error_.message)
        break
      }
    })

  }
  const sendEmail = async (e) => {
    const email = emailField.current?.value ?? ''
    auth.languageCode = language
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert(translation[language]['password_reset_email_sent'])
      })
      .catch((error) => {
        setError(translation[language]['auth/invalid-login-credentials'])
      })
  }
  return (
    <>
      <main>
        <form className={styles.form}>
          <TextField
            id="email-address"
            label={translation[language].email}
            name="email"
            required
            type="email"
            inputRef={emailField
              /*aria-describedby="my-helper-text"*/}
          />
          {/* helperText="Incorrect entry." todo */ }
          {/* error todo */}
          <TextField
            id="password"
            label={translation[language].password}
            name="password"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {error!==null?<Alert severity="error">{error}</Alert>:null}
          <Button variant={'contained'}
            onClick={onSubmit}
          >
            {translation[language][props.type==='signUp'?'signUp':'login']}
          </Button>
        </form>
        {props.type==='signIn'?<><p>
          {translation[language].noAcc}
          {' '}
          <NavLink to="/signup">
            {translation[language].signUp}
          </NavLink>
        </p><p>
          {translation[language].forgot_password}
          {' '}
          <Button variant={'contained'}
            onClick={sendEmail}
          >
            {translation[language].send_password_reset_email}
          </Button>
        </p></>:
          <p>
            {translation[language].haveAcc}
            {' '}
            <NavLink to="/login">
              {translation[language].login}
            </NavLink>
          </p>
        }
      </main>
    </>
  )
}

export default LoginSignup