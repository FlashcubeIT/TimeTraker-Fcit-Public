import React  from 'react'
import "./Business.css"
import { useNavigate } from 'react-router-dom'

const Business = () => {
  const navigate = useNavigate()
  return (
    <div className='business-container'>
        <h1>“Get paid faster. <br /> Run your business smarter.”</h1>
        <p>Experience quicker payments and elevate your business efficiency. Optimize financial processes and boost your success. Get paid faster, work smarter.</p>
        <button onClick={()=>{navigate('/signup')}} >Start a free trial</button>
    </div>
  )
}

export default Business