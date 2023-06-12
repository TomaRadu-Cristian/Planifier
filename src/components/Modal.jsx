import React, { useState } from 'react'
import useCookies from 'react-cookie/cjs/useCookies'



const Modal = ({ mode, setShowForm, plan, getData }) => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const editMode = mode === 'edit' ? true : false

  const [planEdit, setPlanEdit] = useState({
    user_email: editMode ? plan.user_email : cookie.email,
    title: editMode ? plan.title : null,
    progress: editMode ? plan.progress : 25,
    date: editMode ? plan.date : new Date()
  })

  const sendData = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8000/plans', {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(planEdit)
      }) 
      if (response.status === 200) {
        setShowForm(false)
        getData()
      } 
    } catch(err) {
      console.error(err);
    }
  }

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/plans/${plan.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(planEdit)
      })
      if (response.status === 200) {
        setShowForm(false)
        getData()
      }
    } catch(err) {
      cansole.error(err)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPlanEdit(plan => ({
      ...plan, [name]: value
    }))
  }

  return (
    <div className='overlay'>
      <div className='modal'>
        <div className='form-header'>
          <h3>{mode} your plan:</h3>
          <button onClick={() => setShowForm(false)}>X</button>
        </div>
        <form>
          <input type="text" required maxLength={20} placeholder='Title' name='title' value={planEdit.title} onChange={handleChange} />
          <label for="range">Progress: </label>
          <input id='range' type="range" required min="0" max="100" name="progress" value={planEdit.progress} onChange={handleChange} />
          <input type="submit" className='submit-button' onClick={editMode ? editData : sendData}/>
        </form>
      </div>
    </div>
  )
}

export default Modal