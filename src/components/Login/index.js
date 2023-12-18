import {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

export default function Login() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [userId, setUserId] = useState('')
  const [pin, setPin] = useState('')
  const history = useHistory()
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) return <Redirect to="/" />

  const onSubmitSuccess = token => {
    console.log('Success')
    Cookies.set('jwt_token', token, {expires: 30})
    history.replace('/')
  }

  const onEnterLogin = async e => {
    e.preventDefault()
    const userDetails = {
      user_id: userId,
      pin,
    }
    const baseUrl = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(baseUrl, options)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error_msg)
      onSubmitSuccess(data.jwt_token)
      if (errorMsg) setErrorMsg(null)
    } catch (error) {
      console.log(error.message)
      setErrorMsg(error.message)
    }
  }

  return (
    <div className="login-page-container">
      <div className="login-main-container">
        {/* <div className="login-img-container"> */}
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
          alt="website login"
        />
        {/* </div> */}
        <div className="login-form-container">
          <form className="form" onSubmit={onEnterLogin}>
            <h1>Welcome back</h1>
            <label htmlFor="user-id">User ID</label>
            <input
              type="text"
              id="user-id"
              placeholder="Enter User ID"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <label htmlFor="pin">PIN</label>
            <input
              type="password"
              id="pin"
              placeholder="Enter PIN"
              value={pin}
              onChange={e => setPin(e.target.value)}
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {errorMsg && <p className="error-msg">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
