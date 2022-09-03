import {useState} from 'react'
import  {Link} from 'react-router-dom'
import  {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {toast} from 'react-toastify'

import { ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')

  const onChange = e => setEmail(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    try {
      const auth = getAuth()
      sendPasswordResetEmail(auth, email)
      toast.success('Email was sent')
    } catch (error) {
      toast.error('could not sent reset email')
    }
  }


  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forget Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="text" 
            className="emailInput" 
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
          <Link className="forgotPasswordLink" to='/sign-in' >Sign In</Link>

          <div className="signInBar">
            <div className="signInText">
              Send Reset Link
            </div>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width={34} height={34} />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
