import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import OAuth from "../components/OAuth"

function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData
  const navigate = useNavigate()

  const guestLoginClick = () => {
    setFormData({
      email: "helloguest@gmail.com",
      password: "helloguest",
    })
  }
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      // console.log(userCredential)

      if (userCredential.user) {
        navigate("/")
      }
    } catch (error) {
      toast.error("Wrong User Credentials")
    }
  }

  return (
    <div className="pageContainer pageContainer1">
      <header>
        <div style={{ paddingBottom: "2rem" }} className="pageHeader">
          Welcome
        </div>
      </header>

      <form onSubmit={onSubmit} className="inputForms">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="emailInput"
          value={email}
          onChange={onChange}
        />

        <div className="passwordInputDiv">
          <input
            type={showPassword ? "text" : "password"}
            className="passwordInput"
            placeholder="Password"
            id="password"
            value={password}
            onChange={onChange}
          />

          <img
            src={visibilityIcon}
            alt="show password"
            className="showPassword"
            onClick={() => {
              setShowPassword((prevState) => !prevState)
            }}
          />
        </div>
        <Link to="/forgot-password" className="forgotPasswordLink">
          Forgot Password
        </Link>

        <div className="signInBar">
          <p className="signInText">Sign In</p>
          <button className="signInButton">
            <ArrowRightIcon fill="#fff" width={34} height={34} />
          </button>
        </div>
      </form>
      <p onClick={guestLoginClick} className="testLogin">
        Guest Login
      </p>

      <OAuth />

      <Link to="/sign-up" className="registerLink">
        Sign Up Instead
      </Link>
    </div>
  )
}

export default SignIn
