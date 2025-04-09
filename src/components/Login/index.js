import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', anyerror: false, errorMsg: ''}

  onchangename = e => {
    this.setState({username: e.target.value})
  }

  onchangepassword = e => {
    this.setState({password: e.target.value})
  }

  onSuccessfullApi = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailureApi = msg => {
    this.setState({anyerror: true, errorMsg: msg})
  }

  onClicksubmit = async e => {
    e.preventDefault()
    const apiurl = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const details = {username, password}
    const options = {
      method: 'POST',

      body: JSON.stringify(details),
    }
    const response = await fetch(apiurl, options)
    // console.log(response.json())

    if (response.ok === true) {
      const data = await response.json()
      this.onSuccessfullApi(data.jwt_token)
    } else {
      const data = await response.json()
      this.onFailureApi(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, errorMsg, anyerror} = this.state
    return (
      <div>
        <form onSubmit={this.onClicksubmit}>
          <h1>Login Page</h1>
          <label>
            USERNAME
            <br />
            <input
              type="text"
              value={username}
              placeholder="Enter your name"
              onChange={this.onchangename}
            />
            <br />
          </label>
          <label>
            PASSWORD
            <br />
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={this.onchangepassword}
            />
            <br />
          </label>
          {anyerror && <p>{errorMsg}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }
}

export default Login
