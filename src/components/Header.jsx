import React, { useState } from 'react'
import Modal from './Modal'
import { useCookies } from 'react-cookie';

const Header = ({ name, getData }) => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const [showForm, setShowForm] = useState(false);

  const signOut = () => {
    console.log('Logged Out')
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  }

  return (
    <div className='app_header'>
      <h1>{name}</h1>
      <div className='commands_container'>
        <button className='create' onClick={() => setShowForm(true)}>+</button>
        <button className='text_button' onClick={signOut}>LOG OUT</button>
      </div>
      {showForm && <Modal mode={'create'} setShowForm={setShowForm} getData={getData}/>}
    </div>
  )
}

export default Header