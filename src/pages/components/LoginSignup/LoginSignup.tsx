import styles from './LoginSignup.module.scss'

import React, {useState} from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../../firebase.ts'
import {NavLink, useNavigate} from 'react-router-dom'
import {Alert, Button, TextField} from '@mui/material'
import {useStore} from '../../../store.ts'
import {translation} from '../../../translation.ts'
import {createUserWithEmailAndPassword} from '../../../service.ts'

const LoginSignup = (props:{type:'signIn'|'signUp'}) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const language = useStore((state) => state.language)
  const [error, setError] = useState<null|string>(null)
  const onSubmit = async (e) => {
    e.preventDefault()
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
            onChange={(e) => setEmail(e.target.value)
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
        {props.type==='signIn'?<p>
          {translation[language].noAcc}
          {' '}
          <NavLink to="/signup">
            {translation[language].signUp}
          </NavLink>
        </p>:
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