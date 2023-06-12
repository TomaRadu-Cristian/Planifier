import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import PlanCard from './components/PlanCard';
import Login from './components/Login';
import useCookies from 'react-cookie/cjs/useCookies';

const App = () => {
  const [cookie, setCookie, removeCookie] = useCookies(null)
  const authToken = cookie.AuthToken
  const userEmail = cookie.email
  const [plans, setPlans] = useState(null);


  const getData = async () => {
    

    try {
      const response = await fetch(`http://localhost:8000/plans/${userEmail}`)
      const json = await response.json()
      setPlans(json)
      console.log(json)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  const orderedPlans = plans?.sort((a, b) => a - b)

  return (
    <div className='app'>
      {!authToken && <Login />}
      {authToken && <><Header name={'Weekly Planner'} getData={getData}/>
      <div className='plans_container'>
        {orderedPlans?.map((plan) => <PlanCard key={plan.id} plan={plan} getData={getData} />)}
      </div></>}
    </div>
  )
}

export default App

