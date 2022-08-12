import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './login.module.scss'

export function Login() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/contacts')
    }
  }, [navigate])

  function handleAuth() {
    if (userName === '' || password === '') {
      return
    }
    navigate('/contacts')
    localStorage.setItem(
      'user',
      JSON.stringify({
        password: password,
        username: userName,
      })
    )
  }

  return (
    <form>
      <div className={styles.inputDiv}>
        <label>Ввести данные для входа</label>
        <input
          className={styles.inputLogin}
          name="name"
          value={userName}
          onChange={(event) => {
            setUserName(event.target.value)
          }}
          placeholder="Введите логин"
        ></input>

        <input
          className={styles.inputPassword}
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          placeholder="Введите пароль"
        ></input>
        <button
          className={styles.enterButton}
          type="button"
          onClick={handleAuth}
        >
          Авторизация
        </button>
      </div>
    </form>
  )
}
