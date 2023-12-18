import Cookies from 'js-cookie'
import {useHistory} from 'react-router-dom'
import './index.css'

export default function Home() {
  const history = useHistory()

  const onLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="home-page-container">
      <div className="header">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
      <div className="home-content-container">
        <div className="card-container">
          <h1>Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
          />
        </div>
      </div>
    </div>
  )
}
