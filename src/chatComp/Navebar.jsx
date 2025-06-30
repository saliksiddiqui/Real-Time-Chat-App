import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebas'
import { AuthContext } from '../context/AuthContext'

const Navebar = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <>
    <div className="navebar">
      <div className='naveAppName'>SChat App</div>
      <div className="user">
        <img className='userImg' src={currentUser.photoURL} alt="userImg" />
        <span className="userName">{currentUser.displayName}</span>
      <button className='logout' onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
    </>
  )
}

export default Navebar