import React from 'react'
import "./Business.css"
import { useNavigate } from 'react-router-dom'

const Business1 = () => {
  const navigate = useNavigate()
  return (
    <div className='business-container'>
        <h1>“Ready to get started?”</h1>
        <p>We exist to give businesses back the valuable time and money they need to grow and succeed, and improve the lives of the people that run them.</p>
        <button onClick={()=>{navigate('/signup')}}>Start a free trial</button>
    </div>
  )
}

export default Business1