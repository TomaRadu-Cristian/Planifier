import React from 'react'
import ProgressBar from './ProgressBar';
import Completeicon from './Completeicon';
import Modal from './Modal';
import { useState } from 'react';

const PlanCard = ({plan, getData}) => {
  const [showForm, setShowForm] = useState(false);

  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:8000/plans/${plan.id}`, {
        method: 'DELETE'
      })
      if (response.status === 200) {
        getData()
      }
    } catch(err) {
      console.error(err)
    }
  }

  return (
    <div className='plan_card'>
      <div className='card_info'>
        <Completeicon />
        <p>{plan.title}</p>
      </div>
      <div className='commands_container'>
        <button className='edit' onClick={() => setShowForm(true)}>Edit</button>
        <button className='delete' onClick={deleteItem}>Delete</button>
      </div>
      {showForm && <Modal mode={'edit'} setShowForm={setShowForm} plan={plan} getData={getData}/>}
    </div>
  )
}

export default PlanCard