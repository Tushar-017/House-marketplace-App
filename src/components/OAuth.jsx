import  { useLocation, useNavigate} from 'react-router-dom'
import {getAuth, signInWithPopup, GoogleAuthProvider} from 
'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {toast} from 'react-toastify'

import {db} from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'

function OAuth() {
  const navigate = useNavigate()
  const location = useLocation()

  const onGooglClick = async () => {
    try {
      const auth = getAuth()
      const provider = new GoogleAuthProvider()

      const result = await signInWithPopup(auth,provider)
      const user = result.user

      // Check for user
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      // If user, doesn't exist, create user
      if(!docSnap.exists()){
        await setDoc(doc(db, 'users', user.uid),{
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        })
      }
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Could not authorized with Google')
    }
  }

  return <div className="socialLogin">
    <p>Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} with</p>
    <button className="socialIconDiv" onClick={onGooglClick}>
      <img className='socialIconImg' src={googleIcon} alt="google icon" />
    </button>
  </div>
}

export default OAuth
